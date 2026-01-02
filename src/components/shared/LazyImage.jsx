import { useState } from 'react';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23e0f2fe"/%3E%3Ctext x="50%" y="50%" font-family="Arial" font-size="20" fill="%230284c7" text-anchor="middle" dy=".3em"%3ELa Nube de Jehová%3C/text%3E%3C/svg%3E'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-celestial-100 to-celestial-50 animate-pulse rounded-lg"></div>
      )}
      
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`
          w-full h-full object-cover transition-all duration-700
          ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
        `}
      />
    </div>
  );
};

export default LazyImage;