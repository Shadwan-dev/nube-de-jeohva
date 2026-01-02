import { useState, useEffect } from 'react';
import { Users, Prayer, Calendar, MessageSquare, TrendingUp, Download } from 'lucide-react';
import ProtectedRoute from '../shared/ProtectedRoute';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPrayers: 0,
    pendingPrayers: 0,
    upcomingEvents: 0,
    testimonies: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Cargar datos del dashboard
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Aquí cargarías datos reales de Firebase
    // Por ahora, datos de ejemplo
    setStats({
      totalUsers: 156,
      totalPrayers: 289,
      pendingPrayers: 42,
      upcomingEvents: 8,
      testimonies: 23
    });

    setRecentActivity([
      { id: 1, type: 'prayer', user: 'María González', action: 'envió una solicitud de oración', time: 'Hace 10 minutos' },
      { id: 2, type: 'user', user: 'Juan Pérez', action: 'se registró en la aplicación', time: 'Hace 1 hora' },
      { id: 3, type: 'event', user: 'Pastor David', action: 'creó un nuevo evento', time: 'Hace 2 horas' },
      { id: 4, type: 'testimony', user: 'Ana Rodríguez', action: 'compartió un testimonio', time: 'Hace 5 horas' },
    ]);
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="section-padding">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif text-celestial-800 dark:text-celestial-200 mb-2">
                  Panel de Administración
                </h1>
                <p className="text-celestial-600 dark:text-celestial-400">
                  Bienvenido al centro de control de la iglesia
                </p>
              </div>
              
              <button className="px-6 py-3 bg-celestial-600 text-white rounded-xl 
                hover:bg-celestial-700 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar Reporte
              </button>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <StatCard
              icon={<Users className="w-6 h-6" />}
              title="Miembros"
              value={stats.totalUsers}
              change="+12 este mes"
              color="blue"
            />
            
            <StatCard
              icon={<Prayer className="w-6 h-6" />}
              title="Oraciones"
              value={stats.totalPrayers}
              change={`${stats.pendingPrayers} pendientes`}
              color="green"
            />
            
            <StatCard
              icon={<Calendar className="w-6 h-6" />}
              title="Eventos"
              value={stats.upcomingEvents}
              change="Próximo: Mañana"
              color="purple"
            />
            
            <StatCard
              icon={<MessageSquare className="w-6 h-6" />}
              title="Testimonios"
              value={stats.testimonies}
              change="3 nuevos"
              color="amber"
            />
            
            <StatCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Crecimiento"
              value="24%"
              change="vs mes pasado"
              color="emerald"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl 
                border border-celestial-100 dark:border-celestial-800 p-6">
                
                <h2 className="text-xl font-bold text-celestial-800 dark:text-celestial-200 mb-6">
                  Actividad Reciente
                </h2>
                
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 
                      bg-celestial-50 dark:bg-celestial-900/30 rounded-xl">
                      
                      <div className={`p-3 rounded-xl ${
                        activity.type === 'prayer' ? 'bg-green-100 dark:bg-green-900/30' :
                        activity.type === 'user' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        activity.type === 'event' ? 'bg-purple-100 dark:bg-purple-900/30' :
                        'bg-amber-100 dark:bg-amber-900/30'
                      }`}>
                        {activity.type === 'prayer' && <Prayer className="w-5 h-5 text-green-600" />}
                        {activity.type === 'user' && <Users className="w-5 h-5 text-blue-600" />}
                        {activity.type === 'event' && <Calendar className="w-5 h-5 text-purple-600" />}
                        {activity.type === 'testimony' && <MessageSquare className="w-5 h-5 text-amber-600" />}
                      </div>
                      
                      <div className="flex-grow">
                        <p className="font-medium text-celestial-800 dark:text-celestial-200">
                          {activity.user} <span className="font-normal text-gray-600 dark:text-gray-400">
                            {activity.action}
                          </span>
                        </p>
                        <p className="text-sm text-celestial-500 dark:text-celestial-500">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div>
              <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl 
                border border-celestial-100 dark:border-celestial-800 p-6">
                
                <h2 className="text-xl font-bold text-celestial-800 dark:text-celestial-200 mb-6">
                  Acciones Rápidas
                </h2>
                
                <div className="space-y-3">
                  <button className="w-full p-4 text-left bg-celestial-50 
                    dark:bg-celestial-900/30 hover:bg-celestial-100 
                    dark:hover:bg-celestial-900/50 rounded-xl transition-colors">
                    <span className="font-medium text-celestial-800 dark:text-celestial-200">
                      Crear Nuevo Evento
                    </span>
                    <p className="text-sm text-celestial-600 dark:text-celestial-400 mt-1">
                      Agendar reunión o actividad
                    </p>
                  </button>
                  
                  <button className="w-full p-4 text-left bg-celestial-50 
                    dark:bg-celestial-900/30 hover:bg-celestial-100 
                    dark:hover:bg-celestial-900/50 rounded-xl transition-colors">
                    <span className="font-medium text-celestial-800 dark:text-celestial-200">
                      Enviar Notificación
                    </span>
                    <p className="text-sm text-celestial-600 dark:text-celestial-400 mt-1">
                      A todos los miembros
                    </p>
                  </button>
                  
                  <button className="w-full p-4 text-left bg-celestial-50 
                    dark:bg-celestial-900/30 hover:bg-celestial-100 
                    dark:hover:bg-celestial-900/50 rounded-xl transition-colors">
                    <span className="font-medium text-celestial-800 dark:text-celestial-200">
                      Revisar Testimonios
                    </span>
                    <p className="text-sm text-celestial-600 dark:text-celestial-400 mt-1">
                      Moderar contenido compartido
                    </p>
                  </button>
                  
                  <button className="w-full p-4 text-left bg-celestial-50 
                    dark:bg-celestial-900/30 hover:bg-celestial-100 
                    dark:hover:bg-celestial-900/50 rounded-xl transition-colors">
                    <span className="font-medium text-celestial-800 dark:text-celestial-200">
                      Generar Reporte
                    </span>
                    <p className="text-sm text-celestial-600 dark:text-celestial-400 mt-1">
                      Estadísticas del mes
                    </p>
                  </button>
                </div>
              </div>
              
              {/* Stats Summary */}
              <div className="mt-6 bg-gradient-to-br from-celestial-600 to-celestial-800 
                rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Resumen del Mes</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm opacity-80">Nuevos Miembros</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  
                  <div>
                    <p className="text-sm opacity-80">Oraciones Contestadas</p>
                    <p className="text-2xl font-bold">47</p>
                  </div>
                  
                  <div>
                    <p className="text-sm opacity-80">Asistencia Promedio</p>
                    <p className="text-2xl font-bold">89%</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm opacity-80 italic">
                    "Donde dos o tres se reúnen en mi nombre, allí estoy yo en medio de ellos."
                  </p>
                  <p className="text-sm mt-2 opacity-80">Mateo 18:20</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

const StatCard = ({ icon, title, value, change, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
    emerald: 'bg-emerald-500'
  };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 
      border border-celestial-100 dark:border-celestial-800">
      <div className="flex items-start justify-between">
        <div>
          <div className={`p-3 rounded-xl ${colorClasses[color]} bg-opacity-10 
            ${color === 'blue' ? 'text-blue-600' :
              color === 'green' ? 'text-green-600' :
              color === 'purple' ? 'text-purple-600' :
              color === 'amber' ? 'text-amber-600' :
              'text-emerald-600'}`}>
            {icon}
          </div>
          
          <h3 className="mt-4 text-2xl font-bold text-celestial-800 dark:text-celestial-200">
            {value}
          </h3>
          <p className="text-celestial-600 dark:text-celestial-400 text-sm mt-1">
            {title}
          </p>
        </div>
        
        <div className={`text-sm px-3 py-1 rounded-full ${
          change.includes('+') ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
          'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
        }`}>
          {change}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;