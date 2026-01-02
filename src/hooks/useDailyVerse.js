import { useState, useEffect } from 'react';
import { bibleService } from '../services/bibleService';

export const useDailyVerse = () => {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailyVerse = async () => {
      try {
        setLoading(true);
        
        // Obtener versículo del día (con cache en Firebase)
        const dailyVerse = await bibleService.getDailyVerse();
        
        setVerse(dailyVerse);
        setError(null);
      } catch (err) {
        console.error('Error fetching daily verse:', err);
        setError('No se pudo cargar el versículo del día');
        // Intentar con versículo local
        const localVerse = bibleService.getFallbackVerse('john+3:16');
        setVerse(localVerse);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyVerse();
    
    // Opcional: Refrescar cada hora
    const interval = setInterval(fetchDailyVerse, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { verse, loading, error, refresh: () => setLoading(true) };
};

// Hook para versículos por emoción
export const useEmotionVerses = (emotion) => {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerses = async () => {
      if (!emotion) {
        setVerses([]);
        return;
      }

      try {
        setLoading(true);
        const emotionVerses = await bibleService.getVersesByEmotion(emotion);
        setVerses(emotionVerses);
        setError(null);
      } catch (err) {
        console.error('Error fetching emotion verses:', err);
        setError('No se pudieron cargar los versículos');
        setVerses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, [emotion]);

  return { verses, loading, error };
};