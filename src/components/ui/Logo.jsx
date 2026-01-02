const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        {/* Nube animada */}
        <div className="w-12 h-8 bg-gradient-to-r from-white to-celestial-100 rounded-full relative 
          before:content-[''] before:absolute before:w-10 before:h-10 
          before:bg-gradient-to-r before:from-white before:to-celestial-100 
          before:rounded-full before:-top-4 before:-left-2
          after:content-[''] after:absolute after:w-8 after:h-8 
          after:bg-gradient-to-r after:from-white after:to-celestial-100 
          after:rounded-full after:-top-3 after:right-0
          shadow-md animate-float">
          
          {/* Rayo de luz */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 
            -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-yellow-200 to-yellow-100 
            rounded-full animate-glow"></div>
        </div>
      </div>
      
      {/* Texto del logo */}
      <div className="flex flex-col">
        <span className="text-2xl font-script text-celestial-800 
          tracking-wider animate-fade-in">
          La Nube
        </span>
        <span className="text-lg font-serif text-celestial-900 
          font-semibold tracking-wide">
          de Jehová
        </span>
      </div>
    </div>
  );
};

export default Logo;