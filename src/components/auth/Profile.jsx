import { useState, useEffect } from 'react';
import { auth, userService } from '../../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { User, Mail, Phone, Calendar, Edit, LogOut, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    ministryInterest: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await loadUserData(currentUser.uid);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const loadUserData = async (uid) => {
    try {
      const data = await userService.getUser(uid);
      setUserData(data);
      setFormData({
        name: data?.name || '',
        phone: data?.phone || '',
        ministryInterest: data?.ministryInterest || '',
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await userService.updateUser(user.uid, formData);
      setUserData({ ...userData, ...formData });
      setEditMode(false);
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar perfil');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-celestial-200 border-t-celestial-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-celestial-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-celestial-800 dark:text-celestial-200">
              Mi Perfil
            </h1>
            <p className="text-celestial-600 dark:text-celestial-400">
              Gestiona tu información personal
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setEditMode(!editMode)}
              className="px-4 py-2 border-2 border-celestial-500 text-celestial-700 
                dark:text-celestial-300 rounded-xl hover:bg-celestial-50 
                dark:hover:bg-celestial-900/50 flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              {editMode ? 'Cancelar' : 'Editar'}
            </button>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 border-2 border-red-200 text-red-600 
                dark:text-red-400 rounded-xl hover:bg-red-50 
                dark:hover:bg-red-900/20 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-celestial-50 to-white 
              dark:from-celestial-900/30 dark:to-dark-surface 
              rounded-2xl p-6 border border-celestial-100 dark:border-celestial-800">
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 
                  bg-gradient-to-br from-celestial-500 to-celestial-600 
                  rounded-full mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-celestial-800 dark:text-celestial-200">
                  {userData?.name || 'Usuario'}
                </h3>
                <p className="text-celestial-600 dark:text-celestial-400 text-sm">
                  Miembro desde {new Date(userData?.createdAt?.toDate()).toLocaleDateString()}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-dark-surface rounded-xl">
                  <Shield className="w-5 h-5 text-celestial-600" />
                  <div>
                    <p className="font-medium text-celestial-700 dark:text-celestial-300">Rol</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {userData?.role === 'admin' ? 'Administrador' : 'Miembro'}
                    </p>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-celestial-50 to-transparent 
                  dark:from-celestial-900/50 rounded-xl">
                  <h4 className="font-bold text-celestial-700 dark:text-celestial-300 mb-2">
                    Estadísticas
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-celestial-800 dark:text-celestial-200">0</p>
                      <p className="text-xs text-celestial-600 dark:text-celestial-400">Eventos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-celestial-800 dark:text-celestial-200">0</p>
                      <p className="text-xs text-celestial-600 dark:text-celestial-400">Oraciones</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl 
              border border-celestial-100 dark:border-celestial-800 overflow-hidden">
              
              {/* Tabs */}
              <div className="border-b border-celestial-100 dark:border-celestial-800">
                <div className="flex">
                  <button className="px-6 py-4 border-b-2 border-celestial-500 
                    text-celestial-700 dark:text-celestial-300 font-semibold">
                    Información Personal
                  </button>
                  <button className="px-6 py-4 text-celestial-600 
                    dark:text-celestial-400 hover:text-celestial-700 
                    dark:hover:text-celestial-300">
                    Actividad
                  </button>
                  <button className="px-6 py-4 text-celestial-600 
                    dark:text-celestial-400 hover:text-celestial-700 
                    dark:hover:text-celestial-300">
                    Configuración
                  </button>
                </div>
              </div>
              
              {/* Form */}
              <div className="p-8">
                {editMode ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-celestial-700 dark:text-celestial-300 font-medium mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-celestial-300 
                          dark:border-celestial-700 rounded-xl"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-celestial-700 dark:text-celestial-300 font-medium mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-celestial-300 
                          dark:border-celestial-700 rounded-xl"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-celestial-700 dark:text-celestial-300 font-medium mb-2">
                        Ministerio de interés
                      </label>
                      <select
                        value={formData.ministryInterest}
                        onChange={(e) => setFormData({...formData, ministryInterest: e.target.value})}
                        className="w-full px-4 py-3 border border-celestial-300 
                          dark:border-celestial-700 rounded-xl"
                      >
                        <option value="">Selecciona un ministerio</option>
                        <option value="alabanza">Alabanza y Adoración</option>
                        <option value="ensenanza">Enseñanza Bíblica</option>
                        <option value="jovenes">Jóvenes en Fe</option>
                        <option value="misiones">Misiones y Evangelismo</option>
                        <option value="oracion">Grupos de Oración</option>
                      </select>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={handleSave}
                        className="btn-primary px-6 py-3"
                      >
                        Guardar cambios
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-6 py-3 border-2 border-celestial-300 
                          text-celestial-700 dark:text-celestial-300 rounded-xl"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Información */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-4 p-4 bg-celestial-50 
                        dark:bg-celestial-900/30 rounded-xl">
                        <div className="p-3 bg-celestial-100 dark:bg-celestial-800 rounded-xl">
                          <User className="w-6 h-6 text-celestial-600 dark:text-celestial-400" />
                        </div>
                        <div>
                          <p className="text-sm text-celestial-600 dark:text-celestial-400">Nombre</p>
                          <p className="font-semibold text-celestial-800 dark:text-celestial-200">
                            {userData?.name || 'No especificado'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-celestial-50 
                        dark:bg-celestial-900/30 rounded-xl">
                        <div className="p-3 bg-celestial-100 dark:bg-celestial-800 rounded-xl">
                          <Mail className="w-6 h-6 text-celestial-600 dark:text-celestial-400" />
                        </div>
                        <div>
                          <p className="text-sm text-celestial-600 dark:text-celestial-400">Email</p>
                          <p className="font-semibold text-celestial-800 dark:text-celestial-200">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-celestial-50 
                        dark:bg-celestial-900/30 rounded-xl">
                        <div className="p-3 bg-celestial-100 dark:bg-celestial-800 rounded-xl">
                          <Phone className="w-6 h-6 text-celestial-600 dark:text-celestial-400" />
                        </div>
                        <div>
                          <p className="text-sm text-celestial-600 dark:text-celestial-400">Teléfono</p>
                          <p className="font-semibold text-celestial-800 dark:text-celestial-200">
                            {userData?.phone || 'No especificado'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-celestial-50 
                        dark:bg-celestial-900/30 rounded-xl">
                        <div className="p-3 bg-celestial-100 dark:bg-celestial-800 rounded-xl">
                          <Calendar className="w-6 h-6 text-celestial-600 dark:text-celestial-400" />
                        </div>
                        <div>
                          <p className="text-sm text-celestial-600 dark:text-celestial-400">Miembro desde</p>
                          <p className="font-semibold text-celestial-800 dark:text-celestial-200">
                            {userData?.createdAt ? 
                              new Date(userData.createdAt.toDate()).toLocaleDateString() : 
                              'Fecha no disponible'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Ministerio */}
                    {userData?.ministryInterest && (
                      <div className="bg-gradient-to-r from-celestial-50 to-transparent 
                        dark:from-celestial-900/30 p-6 rounded-xl">
                        <h4 className="font-bold text-celestial-800 dark:text-celestial-200 mb-2">
                          Ministerio de interés
                        </h4>
                        <p className="text-celestial-700 dark:text-celestial-300">
                          {userData.ministryInterest}
                        </p>
                        <p className="text-sm text-celestial-600 dark:text-celestial-400 mt-2">
                          Te contactaremos pronto para integrarte al ministerio
                        </p>
                      </div>
                    )}
                    
                    {/* Email verification */}
                    {!user?.emailVerified && (
                      <div className="p-6 bg-amber-50 dark:bg-amber-900/30 
                        border border-amber-200 dark:border-amber-800 rounded-xl">
                        <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">
                          ⚠️ Email no verificado
                        </h4>
                        <p className="text-amber-700 dark:text-amber-400 mb-4">
                          Por favor verifica tu email para acceder a todas las funciones.
                        </p>
                        <button className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm">
                          Reenviar email de verificación
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;