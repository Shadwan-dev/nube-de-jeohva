import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Ministerios', path: '/ministerios' },
    { name: 'Eventos', path: '/eventos' },
    { name: 'Apoyo Emocional', path: '/apoyo-emocional' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-white/90 dark:bg-dark-surface/90 
      backdrop-blur-md shadow-lg border-b border-celestial-100 
      dark:border-celestial-800"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          <ThemeToggle />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium transition-all duration-300
                  ${
                    location.pathname === item.path
                      ? 'text-celestial-700 dark:text-celestial-300 font-semibold'
                      : 'text-celestial-800 dark:text-celestial-200 hover:text-celestial-600 dark:hover:text-celestial-400'
                  }`}
              >
                {item.name}
                <span
                  className={`
                  absolute -bottom-1 left-0 h-0.5 transition-all duration-300
                  ${
                    location.pathname === item.path
                      ? 'w-full bg-celestial-500'
                      : 'w-0 bg-celestial-500 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            ))}

            <Link to="/oracion" className="btn-primary">
              Pedir Oración
            </Link>

            <ThemeToggle />

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-celestial-50 
                    dark:hover:bg-celestial-900/50"
                >
                  <div
                    className="w-8 h-8 bg-gradient-to-br from-celestial-500 
                    to-celestial-600 rounded-full flex items-center justify-center"
                  >
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span
                    className="text-sm font-medium text-celestial-700 
                    dark:text-celestial-300"
                  >
                    {user.email?.split('@')[0]}
                  </span>
                </button>

                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-surface 
                    rounded-xl shadow-lg border border-celestial-100 dark:border-celestial-800 
                    py-2 z-50"
                  >
                    <Link
                      to="/perfil"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-celestial-50 
                        dark:hover:bg-celestial-900/50"
                    >
                      <User className="w-4 h-4" />
                      Mi Perfil
                    </Link>

                    {user.email === 'admin@lanube.com' && (
                      <Link
                        to="/admin/oraciones"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-celestial-50 
                          dark:hover:bg-celestial-900/50"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Administración
                      </Link>
                    )}

                    <hr className="my-2 border-celestial-100 dark:border-celestial-800" />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 w-full text-left 
                        hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 border-2 border-celestial-500 text-celestial-700 
                  dark:text-celestial-300 rounded-xl hover:bg-celestial-50 
                  dark:hover:bg-celestial-900/50"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-celestial-700 dark:text-celestial-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl transition-colors
                    ${
                      location.pathname === item.path
                        ? 'bg-celestial-50 dark:bg-celestial-900/50 text-celestial-700 dark:text-celestial-300 font-semibold'
                        : 'text-celestial-800 dark:text-celestial-200 hover:bg-celestial-50 dark:hover:bg-celestial-900/30'
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              <Link
                to="/oracion"
                onClick={() => setIsOpen(false)}
                className="btn-primary"
              >
                Pedir Oración
              </Link>

              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-celestial-700 dark:text-celestial-300">
                  Tema
                </span>
                <ThemeToggle />
              </div>

              {user ? (
                <>
                  <Link
                    to="/perfil"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 bg-celestial-50 
                      dark:bg-celestial-900/50 rounded-xl"
                  >
                    <User className="w-5 h-5" />
                    <span>Mi Perfil</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 
                      dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 
                      rounded-xl text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 border-2 border-celestial-500 text-celestial-700 
                      dark:text-celestial-300 rounded-xl text-center"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/registro"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary text-center"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
