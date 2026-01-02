import { ChevronDown, Calendar, Users } from 'lucide-react';
import LazyImage from '../shared/LazyImage';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Fondo con gradiente y nube decorativa */}
      <div className="absolute inset-0 bg-gradient-to-br from-celestial-50 via-white to-celestial-100 z-0"></div>
      
      {/* Elementos decorativos de nubes */}
      <div className="absolute top-20 left-10 w-64 h-32 bg-white/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-40 bg-celestial-100/30 rounded-full blur-3xl"></div>
      
      {/* Imagen de fondo (lazy loaded) */}
      <div className="absolute inset-0 z-10">
        <LazyImage 
          src="/hero-bg.jpg"
          fallbackSrc="https://images.unsplash.com/photo-1518834103328-4dbb0d8400de?q=80&w=2070"
          alt="Iglesia La Nube de Jehová"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      {/* Contenido principal */}
      <div className="container mx-auto px-6 relative z-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo grande animado */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-20 bg-gradient-to-r from-white to-celestial-100 rounded-full relative 
                before:content-[''] before:absolute before:w-28 before:h-28 
                before:bg-gradient-to-r before:from-white before:to-celestial-100 
                before:rounded-full before:-top-8 before:-left-4
                after:content-[''] after:absolute after:w-24 after:h-24 
                after:bg-gradient-to-r after:from-white after:to-celestial-100 
                after:rounded-full after:-top-6 after:right-2
                animate-float shadow-2xl">
                
                {/* Rayo de luz central */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 
                  -translate-y-1/2 w-2 h-12 bg-gradient-to-b from-yellow-300 to-yellow-100 animate-glow rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Títulos */}
          <h1 className="text-5xl md:text-7xl font-script text-celestial-800 mb-4 animate-fade-in">
            La Nube
          </h1>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-celestial-900 mb-6">
            de Jehová
          </h2>
          
          {/* Lema */}
          <p className="text-xl md:text-2xl text-celestial-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Un refugio de paz, un faro de esperanza, una familia en Cristo
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className="btn-primary inline-flex items-center justify-center gap-3 text-lg px-8 py-4">
              <Calendar className="w-6 h-6" />
              Próximos Eventos
            </button>
            <button className="px-8 py-4 border-2 border-celestial-500 text-celestial-700 
              rounded-full font-medium hover:bg-celestial-50 transition-all duration-300 
              inline-flex items-center justify-center gap-3 text-lg">
              <Users className="w-6 h-6" />
              Unirse a la Comunidad
            </button>
          </div>
          
          {/* Info rápida */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-celestial-100">
              <h3 className="text-2xl font-bold text-celestial-700 mb-2">Domingos</h3>
              <p className="text-celestial-600">9:00 AM - Culto Principal</p>
              <p className="text-sm text-celestial-500 mt-2">11:00 AM - Escuela Dominical</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-celestial-100">
              <h3 className="text-2xl font-bold text-celestial-700 mb-2">Miércoles</h3>
              <p className="text-celestial-600">7:00 PM - Estudio Bíblico</p>
              <p className="text-sm text-celestial-500 mt-2">Oración y Comunión</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-celestial-100">
              <h3 className="text-2xl font-bold text-celestial-700 mb-2">Ubicación</h3>
              <p className="text-celestial-600">Calle de la Fe #123</p>
              <p className="text-sm text-celestial-500 mt-2">Ciudad de la Esperanza</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="w-8 h-8 text-celestial-500" />
      </div>
    </section>
  );
};

export default Hero;