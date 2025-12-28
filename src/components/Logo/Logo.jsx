import React from 'react';
import '../../styles/globals.css';

const Logo = () => {
  return (
    <div className="logo-container flex items-center gap-3">
      <div className="logo-icon w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <div className="logo-text">
        <h1 className="text-2xl font-bold text-white">
          Pesca<span className="text-cyan-300">Atlantico</span>
        </h1>
        <p className="text-xs text-cyan-100 opacity-80">Pesca Caribeña Sostenible</p>
      </div>
    </div>
  );
};

export default Logo;