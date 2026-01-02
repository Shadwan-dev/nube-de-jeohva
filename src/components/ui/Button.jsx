const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    className = '',
    ...props 
  }) => {
    const baseStyles = 'rounded-xl font-medium transition-all duration-300 inline-flex items-center justify-center';
    
    const variants = {
      primary: 'bg-gradient-to-r from-celestial-500 to-celestial-600 text-white hover:from-celestial-600 hover:to-celestial-700 hover:shadow-lg hover:shadow-celestial-300/50',
      secondary: 'border-2 border-celestial-500 text-celestial-700 hover:bg-celestial-50 hover:border-celestial-600 hover:text-celestial-800',
      ghost: 'text-celestial-600 hover:text-celestial-800 hover:bg-celestial-50',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg',
    };
    
    return (
      <button
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;