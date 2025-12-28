import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../styles/globals.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navegación con rutas React Router
  const navItems = [
    { path: '/', name: 'Inicio' },
    { path: '/productos', name: 'Productos' },
    { path: '/mayorista', name: 'Mayorista' },
    { path: '/minorista', name: 'Minorista' },
    { path: '/nosotros', name: 'Nosotros' },
    { path: '/contacto', name: 'Contacto' },
  ];

  // Rutas para los botones de acción
  const actionItems = [
    { path: '/contacto', name: 'Contactar', icon: 'email', variant: 'accent' },
    { path: '/mayorista', name: 'Mayorista', icon: 'shopping', variant: 'outline' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 to-cyan-800 backdrop-blur-xl border-b border-white/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo COMPACTO con Link de React Router */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
              <span className="text-xl lg:text-2xl">🐟</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-bold text-white tracking-tight">
                Pesca<span className="text-cyan-300">Atlantico</span>
              </h1>
              <p className="text-xs text-cyan-100/80 font-medium">
                Pesca Caribeña
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-white">
                P<span className="text-cyan-300">A</span>
              </h1>
            </div>
          </Link>

          {/* Navegación Desktop - COMPACTA */}
          <nav className="hidden lg:flex items-center space-x-0">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 mx-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`
                }
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Botón Menú Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Acciones del Header - Desktop COMPACTAS */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* Botones de acción con Link */}
            {actionItems.map((action) => (
              <Link
                key={action.path}
                to={action.path}
                className={`btn btn-${action.variant} flex items-center px-4 py-2 text-sm`}
              >
                {action.icon === 'email' ? (
                  <svg
                    className="w-4 h-4 mr-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 mr-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                )}
                <span className="font-semibold">{action.name}</span>
              </Link>
            ))}

            {/* Teléfono - Versión mejorada */}
            <a
              href="tel:+5359994783"
              className="flex items-center px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-200 cursor-pointer group active:scale-95"
            >
              <div className="shrink-0 p-1 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded">
                <svg
                  className="w-4 h-4 text-green-300 group-hover:text-green-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div className="ml-2 min-w-0">
                <span className="text-white font-bold text-sm hover:text-green-300 transition-colors whitespace-nowrap overflow-hidden text-ellipsis block">
                  +53 5999 4783
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Menú Mobile COMPACTO */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-blue-900 to-cyan-900 backdrop-blur-xl border-t border-white/20 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Navegación Mobile COMPACTA */}
            <div className="flex flex-wrap gap-2 mb-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex-1 min-w-[45%] p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white font-medium text-center text-sm"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Acciones Mobile */}
            <div className="space-y-2">
              {actionItems.map((action) => (
                <Link
                  key={action.path}
                  to={action.path}
                  className={`btn btn-${action.variant} w-full justify-center py-3 text-sm`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {action.icon === 'email' ? (
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  )}
                  {action.name}
                </Link>
              ))}

              {/* Teléfono Mobile */}
              <div className="flex items-center justify-center p-3 bg-white/10 rounded-lg">
                <div className="text-center">
                  <a
                    href="tel:+5359994783"
                    className="text-white font-bold text-sm hover:text-green-300 transition-colors flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +53 5999 4783
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;