import React from 'react';
import { Fish, Anchor, Shield, Truck } from 'lucide-react';

function About() {
  const features = [
    {
      icon: <Fish className="w-8 h-8" />,
      title: "Calidad Garantizada",
      description: "Pescado fresco certificado con los más altos estándares"
    },
    {
      icon: <Anchor className="w-8 h-8" />,
      title: "Tradición Pesquera",
      description: "Más de 5 años en el sector pesquero caribeño"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sostenibilidad",
      description: "Pesca responsable y prácticas ecológicas"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Entrega Rápida",
      description: "Distribución en 48h en la península"
    }
  ];

  return (
    <section id="nosotros" className="py-16 bg-white">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Sobre PescaAtlantico
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Expertos en pesca caribeña desde 2000
            </h3>
            <p className="text-gray-600 mb-6">
              PescaAtlantico es una empresa familiar con más de 5 años de 
              experiencia en la comercialización de productos pesqueros del Caribe.
            </p>
            <p className="text-gray-600 mb-6">
              Nos especializamos en especies medianas y grandes, garantizando 
              frescura, calidad y trazabilidad desde el mar hasta tu mesa.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">5+</div>
                <div className="text-sm text-gray-600">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Especies diferentes</div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="p-6 bg-blue-50 rounded-xl">
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h4 className="font-bold mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;