import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where, 
    orderBy, 
    limit,
    serverTimestamp 
  } from 'firebase/firestore';
  import { db } from '../firebase/config';
  
  const BIBLE_API_BASE = 'https://bible-api.com';
  
  export class BibleService {
    constructor() {
      this.baseUrl = BIBLE_API_BASE;
      this.cacheCollection = 'bibleCache';
    }
  
    // Obtener versículo de la API o cache
    async getVerse(reference, translation = 'rv1960') {
      // Primero verificar en Firestore cache
      const cachedVerse = await this.getFromCache(reference, translation);
      
      if (cachedVerse) {
        console.log('Usando versículo de cache');
        return cachedVerse;
      }
  
      // Si no hay cache, obtener de la API
      try {
        const response = await fetch(
          `${this.baseUrl}/${reference}?translation=${translation}`
        );
        
        if (!response.ok) {
          throw new Error('Error al obtener versículo');
        }
        
        const data = await response.json();
        
        const formattedVerse = {
          text: this.formatText(data.text),
          reference: data.reference,
          translation: this.getTranslationName(translation),
          copyright: data.copyright,
          verses: data.verses,
          rawText: data.text
        };
        
        // Guardar en cache de Firestore
        await this.saveToCache(reference, translation, formattedVerse);
        
        return formattedVerse;
        
      } catch (error) {
        console.error('Error fetching verse:', error);
        return this.getFallbackVerse(reference);
      }
    }
  
    // Versículo del día (usa fecha para consistencia)
    async getDailyVerse() {
      const today = new Date();
      const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD
      
      // Verificar si ya tenemos versículo para hoy
      const dailyVerse = await this.getDailyVerseFromDB(dateString);
      
      if (dailyVerse) {
        return dailyVerse;
      }
      
      // Si no, obtener uno nuevo
      const popularVerses = [
        'john+3:16',      // Juan 3:16
        'psalms+23:1',    // Salmos 23:1
        'philippians+4:13', // Filipenses 4:13
        'jeremiah+29:11', // Jeremías 29:11
        'romans+8:28',    // Romanos 8:28
        'proverbs+3:5-6', // Proverbios 3:5-6
        'matthew+11:28',  // Mateo 11:28
        'isaiah+41:10',   // Isaías 41:10
        'psalms+46:1',    // Salmos 46:1
        '1+corinthians+13:4-7' // 1 Corintios 13:4-7
      ];
      
      // Usar el día del año para selección determinística
      const start = new Date(today.getFullYear(), 0, 0);
      const diff = today - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);
      
      const verseIndex = dayOfYear % popularVerses.length;
      const verseData = await this.getVerse(popularVerses[verseIndex]);
      
      // Agregar reflexión y categoría
      const enhancedVerse = {
        ...verseData,
        date: dateString,
        reflection: this.getReflectionByReference(popularVerses[verseIndex]),
        category: this.getCategoryByReference(popularVerses[verseIndex]),
        theme: this.getThemeByReference(popularVerses[verseIndex])
      };
      
      // Guardar como versículo del día
      await this.saveDailyVerse(dateString, enhancedVerse);
      
      return enhancedVerse;
    }
  
    // Obtener versículos por emoción/tema
    async getVersesByEmotion(emotion) {
      const emotionMap = {
        ansiedad: ['philippians+4:6-7', '1+peter+5:7', 'matthew+6:25-34'],
        tristeza: ['psalms+34:18', 'psalms+147:3', 'revelation+21:4'],
        miedo: ['2+timothy+1:7', 'psalms+27:1', 'isaiah+41:10'],
        esperanza: ['romans+15:13', 'jeremiah+29:11', 'psalms+62:5'],
        paz: ['philippians+4:7', 'john+14:27', 'colossians+3:15'],
        amor: ['1+corinthians+13:4-7', 'john+3:16', 'romans+5:8'],
        fe: ['hebrews+11:1', '2+corinthians+5:7', 'mark+11:22-24']
      };
      
      const references = emotionMap[emotion] || emotionMap['esperanza'];
      const promises = references.map(ref => this.getVerse(ref));
      
      const verses = await Promise.all(promises);
      
      return verses.map((verse, index) => ({
        ...verse,
        promise: this.getPromiseForEmotion(emotion, index),
        prayer: this.getPrayerForEmotion(emotion, index)
      }));
    }
  
    // Firestore Cache Methods
    async getFromCache(reference, translation) {
      try {
        const q = query(
          collection(db, this.cacheCollection),
          where('reference', '==', reference),
          where('translation', '==', translation),
          orderBy('cachedAt', 'desc'),
          limit(1)
        );
        
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const data = doc.data();
          
          // Verificar si el cache es válido (24 horas)
          const cachedAt = data.cachedAt?.toDate();
          const now = new Date();
          const hoursDiff = (now - cachedAt) / (1000 * 60 * 60);
          
          if (hoursDiff < 24) {
            return data.verseData;
          }
        }
        
        return null;
      } catch (error) {
        console.error('Error getting from cache:', error);
        return null;
      }
    }
  
    async saveToCache(reference, translation, verseData) {
      try {
        await addDoc(collection(db, this.cacheCollection), {
          reference,
          translation,
          verseData,
          cachedAt: serverTimestamp()
        });
      } catch (error) {
        console.error('Error saving to cache:', error);
      }
    }
  
    async getDailyVerseFromDB(date) {
      try {
        const q = query(
          collection(db, 'dailyVerses'),
          where('date', '==', date),
          limit(1)
        );
        
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          return doc.data();
        }
        
        return null;
      } catch (error) {
        console.error('Error getting daily verse:', error);
        return null;
      }
    }
  
    async saveDailyVerse(date, verseData) {
      try {
        await addDoc(collection(db, 'dailyVerses'), {
          ...verseData,
          date,
          savedAt: serverTimestamp()
        });
      } catch (error) {
        console.error('Error saving daily verse:', error);
      }
    }
  
    // Helper Methods
    formatText(text) {
      return text
        .replace(/\d+/g, '')
        .replace(/\n/g, ' ')
        .trim();
    }
  
    getTranslationName(code) {
      const translations = {
        rv1960: 'Reina-Valera 1960',
        nvi: 'Nueva Versión Internacional',
        rvr1995: 'Reina-Valera 1995',
        rvc: 'Reina Valera Contemporánea',
        'bsb': 'Biblia del Seminario Bíblico',
        'kjv': 'King James Version'
      };
      
      return translations[code] || code;
    }
  
    getReflectionByReference(ref) {
      const reflections = {
        'john+3:16': 'El amor de Dios es tan grande que dio lo más preciado por nosotros. Esta verdad debe transformar cómo vivimos cada día.',
        'jeremiah+29:11': 'Dios tiene planes específicos para tu vida. Confía en Su tiempo perfecto incluso cuando no entiendas el proceso.',
        'philippians+4:13': 'Tu fuerza no viene de tus capacidades, sino de Cristo que vive en ti. En tu debilidad, Su poder se perfecciona.',
        'psalms+23:1': 'Cuando reconocemos a Dios como nuestro pastor, encontramos contentamiento en Su provisión y cuidado.',
        'romans+8:28': 'Dios trabaja todas las cosas para nuestro bien. Aún en el dolor, hay un propósito divino.',
        'proverbs+3:5-6': 'Confiar en Dios completamente nos libera de la ansiedad y nos guía por el camino correcto.',
        'matthew+11:28': 'Jesús nos invita a descansar en Él, no en nuestras propias fuerzas o entendimiento.',
        'isaiah+41:10': 'La presencia de Dios nos da fuerza y elimina el temor. Él está contigo en cada situación.',
        'psalms+46:1': 'Dios es nuestro refugio seguro en medio de cualquier tormenta de la vida.',
        '1+corinthians+13:4-7': 'El amor verdadero refleja el carácter de Cristo. Es paciente, bondadoso y perdura.'
      };
      
      return reflections[ref] || 'Medita en esta palabra hoy y permite que transforme tu corazón. Dios tiene un mensaje especial para ti.';
    }
  
    getCategoryByReference(ref) {
      const categories = {
        'john+3:16': 'Amor Divino',
        'psalms+23:1': 'Providencia',
        'philippians+4:13': 'Fortaleza',
        'jeremiah+29:11': 'Esperanza',
        'romans+8:28': 'Soberanía',
        'proverbs+3:5-6': 'Sabiduría',
        'matthew+11:28': 'Descanso',
        'isaiah+41:10': 'Protección',
        'psalms+46:1': 'Refugio',
        '1+corinthians+13:4-7': 'Amor'
      };
      
      return categories[ref] || 'Inspiración';
    }
  
    getThemeByReference(ref) {
      const themes = {
        'john+3:16': 'salvación',
        'psalms+23:1': 'cuidado',
        'philippians+4:13': 'poder',
        'jeremiah+29:11': 'futuro',
        'romans+8:28': 'propósito',
        'proverbs+3:5-6': 'confianza',
        'matthew+11:28': 'descanso',
        'isaiah+41:10': 'seguridad',
        'psalms+46:1': 'protección',
        '1+corinthians+13:4-7': 'amor'
      };
      
      return themes[ref] || 'fe';
    }
  
    getPromiseForEmotion(emotion, index) {
      const promises = {
        ansiedad: [
          "Dios quiere que le lleves todas tus preocupaciones.",
          "Dios se preocupa personalmente por ti.",
          "No te preocupes por el mañana, Dios ya lo tiene bajo control."
        ],
        tristeza: [
          "Dios está más cerca cuando más te duele el corazón.",
          "Dios sana los corazones quebrantados.",
          "Un día no habrá más dolor ni lágrimas."
        ],
        miedo: [
          "Dios nos da poder, amor y autocontrol, no miedo.",
          "Con Dios como tu fortaleza, no hay nada que temer.",
          "La presencia de Dios disipa todo temor."
        ]
        // Agregar más emociones
      };
      
      return promises[emotion]?.[index] || "Dios te ama y tiene cuidado de ti.";
    }
  
    getPrayerForEmotion(emotion, index) {
      const prayers = {
        ansiedad: [
          "Padre, en medio de mi ansiedad, confío en ti. Toma mi preocupación y dame tu paz.",
          "Señor, entrego mis cargas a tus pies. Ayúdame a descansar en tu cuidado.",
          "Dios de paz, calma mi corazón inquieto y lléname de tu tranquilidad."
        ]
        // Agregar más oraciones
      };
      
      return prayers[emotion]?.[index] || "Dios, ayúdame en este momento. Amén.";
    }
  
    getFallbackVerse(reference) {
      const fallbackVerses = {
        'john+3:16': {
          text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
          reference: "Juan 3:16",
          translation: "Reina-Valera 1960",
          reflection: "El amor de Dios es la base de nuestra fe y esperanza."
        }
        // Agregar más versículos de respaldo
      };
      
      return fallbackVerses[reference] || fallbackVerses['john+3:16'];
    }
  }
  
  // Exportar instancia singleton
  export const bibleService = new BibleService();