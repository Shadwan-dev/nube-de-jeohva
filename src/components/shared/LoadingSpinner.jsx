const LoadingSpinner = ({ size = 'md', text = 'Cargando...' }) => {
    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <div className={`${sizes[size]} border-4 border-celestial-200 
          border-t-celestial-600 rounded-full animate-spin mb-4`}>
        </div>
        {text && <p className="text-celestial-600 dark:text-celestial-400">{text}</p>}
      </div>
    );
  };
  
  export default LoadingSpinner;