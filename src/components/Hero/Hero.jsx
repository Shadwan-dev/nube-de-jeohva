import React from 'react';
import '../../styles/globals.css';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      
      {/* Fondo optimizado */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-cyan-800 to-emerald-900">
        {/* Efectos de luz */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Olas más pequeñas */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg className="w-full h-24 md:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".2" className="fill-white" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-white" />
        </svg>
      </div>

      {/* Contenido Principal - COMPACTO */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Badge compacto */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-white font-semibold text-sm">PESCA SOSTENIBLE</span>
        </div>

        {/* Título - Más compacto */}
        <h1 className="mb-4 md:mb-6">
          <span className="block text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            SABOR AUTÉNTICO
          </span>
          <span className="block text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent mt-1 md:mt-2 leading-tight">
            DEL CARIBE
          </span>
        </h1>

        {/* Subtítulo compacto */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-10">
          <p className="text-lg md:text-xl text-white/90 font-medium mb-2">
            Especialistas en pescados caribeños medianos y grandes
          </p>
          <p className="text-lg md:text-xl text-cyan-200 font-semibold">
            🚚 Entrega en <span className="text-emerald-300 font-bold">48 horas</span>
          </p>
          <p className="text-base text-white/70 mt-2">
            • Mayorista • Minorista • Frescura garantizada
          </p>
        </div>

        {/* CTA Buttons - Más juntos */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-12 md:mb-16">
          <a 
            href="#productos" 
            className="btn btn-accent flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            VER PRODUCTOS
          </a>
          
          <a 
            href="#contacto" 
            className="btn btn-outline flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            COTIZAR AHORA
          </a>
        </div>

        {/* Estadísticas - Más compactas */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { 
                number: '5+', 
                label: 'Años Experiencia',
                icon: '📅',
                desc: 'Trayectoria'
              },
              { 
                number: '12', 
                label: 'Especies',
                icon: '🐟',
                desc: 'Caribeñas'
              },
              { 
                number: '48h', 
                label: 'Entrega',
                icon: '🚚',
                desc: 'Garantizada'
              },
              { 
                number: '50+', 
                label: 'Clientes',
                icon: '⭐',
                desc: 'Satisfechos'
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">{stat.icon}</div>
                  <div className="text-left">
                    <div className="text-2xl md:text-3xl font-black text-white leading-none">
                      {stat.number}
                    </div>
                    <div className="text-[10px] md:text-xs text-cyan-100/80 uppercase tracking-wider font-semibold">
                      {stat.label}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-white/60">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
          
          {/* Trust badges - PARA OCUPAR ESPACIO EXTRA */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
              <div className="text-green-400">✓</div>
              <span className="text-sm text-white/80">Certificado MSC</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
              <div className="text-green-400">✓</div>
              <span className="text-sm text-white/80">Pesca Sostenible</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
              <div className="text-green-400">✓</div>
              <span className="text-sm text-white/80">Trazabilidad Total</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
              <div className="text-green-400">✓</div>
              <span className="text-sm text-white/80">Calidad Premium</span>
            </div>
          </div>
        </div>

      </div>

      {/* Flecha scroll más pequeña */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <a 
          href="#productos" 
          className="flex flex-col items-center"
          aria-label="Ver productos"
        >
          <div className="w-8 h-12 rounded-full border border-white/30 flex items-start justify-center p-1">
            <svg 
              className="w-3 h-4 text-white/70 animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </a>
      </div>

      

    </section>
  );
};

export default Hero;