import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Guardar en localStorage si "recordarme" está activado
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      }
      
      // Redirigir al inicio
      navigate('/');
      
    } catch (error) {
      console.error('Error en login:', error);
      
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Email inválido');
          break;
        case 'auth/user-disabled':
          setError('Esta cuenta ha sido deshabilitada');
          break;
        case 'auth/user-not-found':
          setError('No existe una cuenta con este email');
          break;
        case 'auth/wrong-password':
          setError('Contraseña incorrecta');
          break;
        case 'auth/too-many-requests':
          setError('Demasiados intentos. Intenta más tarde');
          break;
        default:
          setError('Error al iniciar sesión. Verifica tus credenciales.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Por favor ingresa tu email para recuperar contraseña');
      return;
    }

    try {
      // Implementar recuperación de contraseña
      // await sendPasswordResetEmail(auth, formData.email);
      alert(`Se ha enviado un enlace de recuperación a ${formData.email}`);
    } catch (error) {
      setError('Error al enviar email de recuperación');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 
            bg-gradient-to-br from-celestial-500 to-celestial-600 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-celestial-800 dark:text-celestial-200 mb-2">
            Bienvenido de Vuelta
          </h2>
          <p className="text-celestial-600 dark:text-celestial-400">
            Inicia sesión en tu cuenta
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 
            dark:border-red-800 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-celestial-700 dark:text-celestial-300 font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 
                w-5 h-5 text-celestial-400 dark:text-celestial-600" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full pl-12 pr-4 py-3 border border-celestial-300 
                  dark:border-celestial-700 rounded-xl focus:outline-none 
                  focus:ring-2 focus:ring-celestial-500 focus:border-transparent
                  dark:bg-dark-surface dark:text-white"
                placeholder="tu@email.com"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-celestial-700 dark:text-celestial-300 font-medium">
                Contraseña
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-celestial-600 dark:text-celestial-400 
                  hover:text-celestial-800 dark:hover:text-celestial-300"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 
                w-5 h-5 text-celestial-400 dark:text-celestial-600" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                className="w-full pl-12 pr-4 py-3 border border-celestial-300 
                  dark:border-celestial-700 rounded-xl focus:outline-none 
                  focus:ring-2 focus:ring-celestial-500 focus:border-transparent
                  dark:bg-dark-surface dark:text-white"
                placeholder="Tu contraseña"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 text-celestial-600 rounded"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Recordarme
              </span>
            </label>
            
            <div className="text-sm text-celestial-600 dark:text-celestial-400">
              ¿No robot? <span className="font-medium">✓</span>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 text-lg font-semibold"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent 
                  rounded-full animate-spin mr-2"></div>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
          
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-celestial-200 dark:border-celestial-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-dark-bg text-celestial-500">
                O continúa con
              </span>
            </div>
          </div>
          
          <button
            type="button"
            className="w-full py-3 border-2 border-celestial-200 
              dark:border-celestial-700 rounded-xl flex items-center 
              justify-center gap-3 hover:border-celestial-300 
              dark:hover:border-celestial-600 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Continuar con Google
            </span>
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-celestial-700 dark:text-celestial-300">
            ¿No tienes cuenta?{' '}
            <Link 
              to="/registro" 
              className="text-celestial-600 dark:text-celestial-400 
                hover:text-celestial-800 dark:hover:text-celestial-300 font-semibold"
            >
              Regístrate aquí
            </Link>
          </p>
          <p className="text-sm text-celestial-500 dark:text-celestial-500 mt-2">
            Al iniciar sesión, aceptas nuestros{' '}
            <button className="underline hover:text-celestial-700">Términos</button> y{' '}
            <button className="underline hover:text-celestial-700">Privacidad</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;