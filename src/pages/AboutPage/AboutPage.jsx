import React, { lazy, Suspense } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const About = lazy(() => import('../../components/About/About'));

function AboutPage() {
  return (
    <div className="py-8">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Sobre PescaAtlantico</h1>
          <p className="text-center text-gray-600 mb-12">
            Más de 5 años conectando el Caribe con el Oriente.
          </p>
          
          <div className="prose prose-lg mx-auto mb-12">
            <p>
              Fundada en el 2000, PescaAtlantico nació con la visión de llevar 
              la riqueza pesquera del Caribe a mercados nacionales. 
              Lo que empezó como una pequeña empresa familiar se ha convertido 
              en un referente del sector.
            </p>
            
            <h2>Nuestra Misión</h2>
            <p>
              Conectar pescadores locales del Oriente con mercados exigentes, 
              garantizando calidad, frescura y sostenibilidad en cada entrega.
            </p>
            
            <h2>Nuestra Visión</h2>
            <p>
              Ser la empresa líder en distribución de pescado caribeño, 
              reconocida por nuestra calidad y compromiso con las comunidades 
              pesqueras.
            </p>
          </div>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>
      </div>
    </div>
  );
}

export default AboutPage;