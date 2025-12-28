// src/components/LoadingSpinner/LoadingSpinner.jsx
import React from 'react';

function LoadingSpinner() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Spinner principal */}
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        
        {/* Logo o icono en el centro */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-blue-600 animate-pulse">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Cargando contenido...</p>
      <p className="text-sm text-gray-400 mt-2">PescaAtlantico Caribe</p>
    </div>
  );
}

export default LoadingSpinner;