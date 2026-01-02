import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';

// Datos de versículos (después podemos moverlo a un archivo separado)
const VERSES = [
  {
    verse: "Porque yo sé muy bien los planes que tengo para ustedes —afirma el Señor—, planes de bienestar y no de calamidad, a fin de darles un futuro y una esperanza.",
    reference: "Jeremías 29:11",
    reflection: "Dios tiene un propósito perfecto para tu vida. Confía en Él incluso cuando no entiendas el camino.",
    category: "Esperanza"
  },
  {
    verse: "El Señor es mi pastor, nada me falta.",
    reference: "Salmos 23:1",
    reflection: "Cuando Dios es nuestro guía, tenemos todo lo que necesitamos.",
    category: "Providencia"
  },
  {
    verse: "Echa sobre el Señor tu carga, y él te sustentará; no dejará caído jamás al justo.",
    reference: "Salmos 55:22",
    reflection: "No cargues solo tus preocupaciones. Dios quiere llevar tus cargas contigo.",
    category: "Alivio"
  },
  {
    verse: "Todo lo puedo en Cristo que me fortalece.",
    reference: "Filipenses 4:13",
    reflection: "Tu fuerza no viene de ti mismo, sino de Cristo que vive en ti.",
    category: "Fortaleza"
  },
];

const DailyVerse = () => {
  const [todayVerse, setTodayVerse] = useState(null);

  useEffect(() => {
    // Obtener un versículo basado en el día del año
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    const index = dayOfYear % VERSES.length;
    setTodayVerse(VERSES[index]);
  }, []);

  if (!todayVerse) {
    return (
      <div className="animate-pulse bg-celestial-100 rounded-2xl p-8">
        <div className="h-6 bg-celestial-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-celestial-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-celestial-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-celestial-600" />
            <h2 className="text-3xl md:text-4xl font-serif text-celestial-800">
              Palabra del Día
            </h2>
          </div>
          <p className="text-celestial-600">Reflexiona en este versículo hoy</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-celestial-200">
            <div className="p-8 md:p-12">
              {/* Categoría */}
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-celestial-100 text-celestial-700 rounded-full text-sm font-medium">
                  {todayVerse.category}
                </span>
              </div>
              
              {/* Versículo */}
              <blockquote className="text-2xl md:text-3xl font-serif text-celestial-900 mb-8 leading-relaxed">
                "{todayVerse.verse}"
              </blockquote>
              
              {/* Referencia */}
              <div className="text-right mb-8">
                <p className="text-lg font-medium text-celestial-700">
                  — {todayVerse.reference}
                </p>
              </div>
              
              {/* Separador decorativo */}
              <div className="flex items-center mb-8">
                <div className="flex-grow h-px bg-gradient-to-r from-celestial-200 to-transparent"></div>
                <div className="mx-4">
                  <div className="w-3 h-3 rotate-45 bg-celestial-400"></div>
                </div>
                <div className="flex-grow h-px bg-gradient-to-l from-celestial-200 to-transparent"></div>
              </div>
              
              {/* Reflexión */}
              <div>
                <h3 className="text-xl font-semibold text-celestial-800 mb-4">
                  Reflexión
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {todayVerse.reflection}
                </p>
              </div>
              
              {/* Acción */}
              <div className="mt-12 text-center">
                <button className="btn-primary inline-flex items-center gap-2 transform hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                  Guardar este versículo
                </button>
              </div>
            </div>
            
            {/* Pie decorativo */}
            <div className="bg-celestial-50 py-4 px-8 border-t border-celestial-100">
              <p className="text-center text-celestial-600 text-sm">
                Actualizado diariamente • Comparte la bendición
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyVerse;