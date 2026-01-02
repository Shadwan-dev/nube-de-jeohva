import { Suspense, lazy } from 'react';
import Hero from '../components/sections/Hero';
import DailyVerse from '../components/sections/DailyVerse';

// Lazy load para secciones pesadas
const LazyMinistries = lazy(() => import('../components/sections/Ministries'));
const LazyEventsNews = lazy(() => import('../components/sections/EventsNews'));
const LazyEmotionsSection = lazy(() => import('../components/sections/EmotionsSection'));

const Home = () => {
  return (
    <>
      <Hero />
      <DailyVerse />
      
      <Suspense fallback={<SectionLoading />}>
        <LazyMinistries />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <LazyEventsNews />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <LazyEmotionsSection />
      </Suspense>
    </>
  );
};

// Componente de carga
const SectionLoading = () => (
  <div className="section-padding">
    <div className="container mx-auto">
      <div className="animate-pulse">
        <div className="h-8 bg-celestial-200 rounded w-1/3 mb-8"></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-celestial-100 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Home;