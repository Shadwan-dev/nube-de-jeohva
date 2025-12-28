import React, { useState } from 'react';
import NavItem from './NavItem';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '#inicio', label: 'Inicio', icon: '🏠' },
    { href: '#productos', label: 'Productos', icon: '🐟' },
    { href: '#mayorista', label: 'Mayorista', icon: '🏢' },
    { href: '#minorista', label: 'Minorista', icon: '🛒' },
    { href: '#nosotros', label: 'Nosotros', icon: '👥' },
    { href: '#contacto', label: 'Contacto', icon: '📞' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="desktop-nav hidden lg:block">
        <ul className="flex items-center space-x-1">
          {navItems.map((item, index) => (
            <NavItem key={index} href={item.href} icon={item.icon}>
              {item.label}
            </NavItem>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-button lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-blue-900 to-cyan-900 shadow-2xl z-50">
          <ul className="py-4 px-6 space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.href} 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
            
            {/* Contacto móvil */}
            <div className="pt-4 mt-4 border-t border-white/20">
              <a 
                href="tel:+34900123456" 
                className="btn btn-accent w-full justify-center"
              >
                📞 Llamar ahora
              </a>
            </div>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navigation;