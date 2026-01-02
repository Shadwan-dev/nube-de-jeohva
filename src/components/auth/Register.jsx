import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { userService } from '../../services/firebaseService';
import { UserPlus, Mail, Lock, User, Phone } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    ministryInterest: '',
    receiveUpdates: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const { user } = userCredential;

      // 2. Guardar información adicional en Firestore
      await userService.createUser({
        uid: user.uid,
        email: user.email,
        name: formData.name,
        phone: formData.phone,
        ministryInterest: formData.ministryInterest,
        receiveUpdates: formData.receiveUpdates,
        emailVerified: false,
        joinDate: new Date().toISOString(),
      });

      setSuccess(true);

      // 3. Opcional: Enviar email de verificación
      // await sendEmailVerification(user);
    } catch (error) {
      console.error('Error en registro:', error);

      // Manejar errores específicos
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Este email ya está registrado');
          break;
        case 'auth/invalid-email':
          setError('Email inválido');
          break;
        case 'auth/weak-password':
          setError('La contraseña es demasiado débil');
          break;
        default:
          setError('Error en el registro. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div
          className="inline-flex items-center justify-center w-20 h-20 
          bg-green-100 rounded-full mb-6"
        >
          <UserPlus className="w-10 h-10 text-green-600" />
        </div>

        <h2 className="text-3xl font-bold text-celestial-800 mb-4">
          ¡Registro Exitoso!
        </h2>

        <p className="text-xl text-celestial-600 mb-8 max-w-md mx-auto">
          Bienvenido a la familia de "La Nube de Jehová". Te hemos enviado un
          email de confirmación.
        </p>

        <div className="bg-celestial-50 rounded-2xl p-8 max-w-md mx-auto">
          <h3 className="font-bold text-celestial-700 mb-4">Próximos pasos:</h3>
          <ul className="text-left space-y-3">
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-celestial-600" />
              <span>Verifica tu email</span>
            </li>
            <li className="flex items-center gap-3">
              <User className="w-5 h-5 text-celestial-600" />
              <span>Completa tu perfil</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-celestial-600" />
              <span>Asiste a nuestro próximo evento</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center justify-center w-16 h-16 
          bg-celestial-100 rounded-2xl mb-4"
        >
          <UserPlus className="w-8 h-8 text-celestial-600" />
        </div>

        <h2 className="text-3xl font-bold text-celestial-800 mb-2">
          Únete a Nuestra Comunidad
        </h2>
        <p className="text-celestial-600">
          Registrate para recibir actualizaciones y ser parte de la familia
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-celestial-700 font-medium mb-2">
            Nombre completo *
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-celestial-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full pl-12 pr-4 py-3 border border-celestial-300 rounded-xl"
              placeholder="Tu nombre"
            />
          </div>
        </div>

        <div>
          <label className="block text-celestial-700 font-medium mb-2">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-celestial-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full pl-12 pr-4 py-3 border border-celestial-300 rounded-xl"
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-celestial-700 font-medium mb-2">
            Teléfono
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-celestial-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 border border-celestial-300 rounded-xl"
              placeholder="+52 123 456 7890"
            />
          </div>
        </div>

        <div>
          <label className="block text-celestial-700 font-medium mb-2">
            Contraseña *
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-celestial-400" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full pl-12 pr-4 py-3 border border-celestial-300 rounded-xl"
              placeholder="Mínimo 6 caracteres"
            />
          </div>
        </div>

        <div>
          <label className="block text-celestial-700 font-medium mb-2">
            Confirmar Contraseña *
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-celestial-400" />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
              className="w-full pl-12 pr-4 py-3 border border-celestial-300 rounded-xl"
              placeholder="Repite tu contraseña"
            />
          </div>
        </div>

        <div>
          <label className="block text-celestial-700 font-medium mb-2">
            ¿Te interesa algún ministerio?
          </label>
          <select
            value={formData.ministryInterest}
            onChange={(e) =>
              setFormData({ ...formData, ministryInterest: e.target.value })
            }
            className="w-full px-4 py-3 border border-celestial-300 rounded-xl"
          >
            <option value="">Selecciona una opción</option>
            <option value="alabanza">Alabanza y Adoración</option>
            <option value="ensenanza">Enseñanza Bíblica</option>
            <option value="jovenes">Jóvenes en Fe</option>
            <option value="misiones">Misiones y Evangelismo</option>
            <option value="oracion">Grupos de Oración</option>
            <option value="ninios">Escuela Dominical</option>
          </select>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.receiveUpdates}
            onChange={(e) =>
              setFormData({ ...formData, receiveUpdates: e.target.checked })
            }
            className="w-5 h-5"
          />
          <span className="text-gray-700">
            Quiero recibir noticias, devocionales y actualizaciones
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-4 text-lg"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Registrando...
            </>
          ) : (
            'Crear Cuenta'
          )}
        </button>

        <p className="text-center text-celestial-600 text-sm">
          Al registrarte, aceptas nuestros términos y condiciones de uso.
        </p>
      </form>

      <div className="mt-8 pt-6 border-t border-celestial-200 text-center">
        <p className="text-celestial-700">
          ¿Ya tienes cuenta?{' '}
          <button className="text-celestial-600 hover:text-celestial-800 font-medium">
            Iniciar Sesión
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
