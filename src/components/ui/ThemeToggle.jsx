import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // Verificar localStorage primero
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;

      // Verificar preferencia del sistema
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }

    return 'light';
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Guardar preferencia
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Para evitar hidratación incorrecta en SSR
  if (!isMounted) {
    return (
      <div className="p-3 rounded-xl bg-celestial-100 dark:bg-celestial-900">
        <div className="w-6 h-6"></div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative p-3 rounded-xl bg-gradient-to-br from-celestial-100 to-celestial-50 
        dark:from-celestial-900 dark:to-celestial-800 shadow-sm hover:shadow-md
        text-celestial-700 dark:text-celestial-300 transition-all duration-300
        hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 
        focus:ring-celestial-500 focus:ring-offset-2 dark:focus:ring-offset-dark-surface"
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      title={`Cambiar tema (actual: ${theme === 'light' ? 'claro' : 'oscuro'})`}
    >
      {/* Fondo animado */}
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-celestial-500/10 
        to-celestial-600/10 dark:from-celestial-400/10 dark:to-celestial-500/10 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>

      {/* Contenedor de iconos con animación suave */}
      <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
        {/* Sol - modo claro */}
        <div
          className={`absolute transition-all duration-500 ease-out
          ${
            theme === 'light'
              ? 'translate-y-0 opacity-100 rotate-0'
              : 'translate-y-8 opacity-0 rotate-180'
          }`}
        >
          <Sun className="w-5 h-5" />
        </div>

        {/* Luna - modo oscuro */}
        <div
          className={`absolute transition-all duration-500 ease-out
          ${
            theme === 'dark'
              ? 'translate-y-0 opacity-100 rotate-0'
              : '-translate-y-8 opacity-0 -rotate-180'
          }`}
        >
          <Moon className="w-5 h-5" />
        </div>
      </div>

      {/* Efecto de brillo */}
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-200/20 
        to-amber-300/20 dark:from-blue-300/20 dark:to-purple-400/20 
        opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
      ></div>

      {/* Tooltip visual (opcional para desktop) */}
      <div
        className="absolute -top-10 left-1/2 transform -translate-x-1/2 
        px-2 py-1 bg-celestial-800 dark:bg-celestial-200 text-white dark:text-celestial-900 
        text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity 
        duration-300 pointer-events-none whitespace-nowrap"
      >
        {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
        <div
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
          w-2 h-2 bg-celestial-800 dark:bg-celestial-200 rotate-45"
        ></div>
      </div>
    </button>
  );
};

export default ThemeToggle;
