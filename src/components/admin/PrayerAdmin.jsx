import { useState, useEffect } from 'react';
import { prayerService } from '../../services/firebaseService';
import { Eye, EyeOff, CheckCircle, Clock, Filter, Search, MoreVertical, Trash2 } from 'lucide-react';
import ProtectedRoute from '../shared/ProtectedRoute';

const PrayerAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    loadRequests();
  }, [filter]);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (filter !== 'all') {
        filters.status = filter;
      }
      
      const data = await prayerService.getRequests(filters);
      setRequests(data);
    } catch (error) {
      console.error('Error loading prayer requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPrayed = async (requestId) => {
    try {
      await prayerService.markAsPrayed(requestId);
      setRequests(requests.map(req => 
        req.id === requestId ? { ...req, status: 'prayed', prayedAt: new Date() } : req
      ));
    } catch (error) {
      console.error('Error marking as prayed:', error);
    }
  };

  const filteredRequests = requests.filter(request => {
    if (!search) return true;
    
    const searchLower = search.toLowerCase();
    return (
      request.name?.toLowerCase().includes(searchLower) ||
      request.email?.toLowerCase().includes(searchLower) ||
      request.message?.toLowerCase().includes(searchLower) ||
      request.requestType?.toLowerCase().includes(searchLower)
    );
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    prayed: requests.filter(r => r.status === 'prayed').length,
    anonymous: requests.filter(r => r.isAnonymous).length,
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="section-padding">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif text-celestial-800 dark:text-celestial-200 mb-2">
              Administración de Oraciones
            </h1>
            <p className="text-celestial-600 dark:text-celestial-400">
              Gestiona las solicitudes de oración de la congregación
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total" value={stats.total} color="blue" />
            <StatCard title="Pendientes" value={stats.pending} color="amber" />
            <StatCard title="Oradas" value={stats.prayed} color="green" />
            <StatCard title="Anónimas" value={stats.anonymous} color="purple" />
          </div>
          
          {/* Controls */}
          <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 mb-8 
            border border-celestial-100 dark:border-celestial-800">
            
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 
                    w-5 h-5 text-celestial-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nombre, email o contenido..."
                    className="w-full pl-12 pr-4 py-3 border border-celestial-300 
                      dark:border-celestial-700 rounded-xl"
                  />
                </div>
                
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-3 border border-celestial-300 
                    dark:border-celestial-700 rounded-xl bg-white 
                    dark:bg-dark-surface"
                >
                  <option value="all">Todos los estados</option>
                  <option value="pending">Pendientes</option>
                  <option value="prayed">Oradas</option>
                </select>
              </div>
              
              <button
                onClick={loadRequests}
                className="btn-primary px-6 py-3 whitespace-nowrap"
              >
                Actualizar
              </button>
            </div>
          </div>
          
          {/* Requests List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-celestial-200 
                border-t-celestial-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-celestial-600">Cargando solicitudes...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-dark-surface 
              rounded-2xl border border-celestial-100 dark:border-celestial-800">
              <Clock className="w-12 h-12 text-celestial-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-celestial-800 dark:text-celestial-200 mb-2">
                No hay solicitudes
              </h3>
              <p className="text-celestial-600 dark:text-celestial-400">
                {search ? 'No se encontraron resultados para tu búsqueda' : 'No hay solicitudes de oración pendientes'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white dark:bg-dark-surface rounded-2xl 
                    border border-celestial-100 dark:border-celestial-800 
                    overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium
                            ${request.status === 'prayed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                            }`}>
                            {request.status === 'prayed' ? 'Orada' : 'Pendiente'}
                          </span>
                          
                          <span className={`px-3 py-1 rounded-full text-sm font-medium
                            ${request.requestType === 'personal' 
                              ? 'bg-blue-100 text-blue-800'
                              : request.requestType === 'health'
                              ? 'bg-red-100 text-red-800'
                              : request.requestType === 'financial'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-purple-100 text-purple-800'
                            }`}>
                            {getRequestTypeLabel(request.requestType)}
                          </span>
                          
                          {request.isAnonymous && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 
                              dark:bg-gray-800 dark:text-gray-300 rounded-full text-sm">
                              <EyeOff className="w-3 h-3 inline mr-1" />
                              Anónimo
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-semibold text-celestial-800 dark:text-celestial-200">
                          {request.isAnonymous ? 'Solicitud Anónima' : request.name}
                        </h3>
                        
                        {!request.isAnonymous && (
                          <p className="text-celestial-600 dark:text-celestial-400 text-sm">
                            {request.email} • {new Date(request.createdAt?.toDate()).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {request.status !== 'prayed' && (
                          <button
                            onClick={() => handleMarkAsPrayed(request.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-xl 
                              hover:bg-green-700 flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Marcar como orada
                          </button>
                        )}
                        
                        <button
                          onClick={() => setSelectedRequest(
                            selectedRequest?.id === request.id ? null : request
                          )}
                          className="p-2 text-celestial-600 hover:text-celestial-800"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {request.message}
                    </p>
                    
                    {selectedRequest?.id === request.id && (
                      <div className="mt-4 pt-4 border-t border-celestial-100 
                        dark:border-celestial-800">
                        <div className="flex gap-3">
                          <button className="px-4 py-2 border border-celestial-300 
                            text-celestial-700 rounded-xl hover:bg-celestial-50">
                            Responder
                          </button>
                          <button className="px-4 py-2 border border-red-300 
                            text-red-600 rounded-xl hover:bg-red-50 flex items-center gap-2">
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

// Componentes helper
const StatCard = ({ title, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 
      border border-celestial-100 dark:border-celestial-800">
      <p className="text-sm text-celestial-600 dark:text-celestial-400 mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-celestial-800 dark:text-celestial-200">{value}</p>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color]}`}>
          {value}
        </div>
      </div>
    </div>
  );
};

const getRequestTypeLabel = (type) => {
  const labels = {
    personal: 'Personal',
    family: 'Familiar',
    health: 'Salud',
    financial: 'Financiero',
    spiritual: 'Espiritual',
    other: 'Otro'
  };
  return labels[type] || type;
};

export default PrayerAdmin;