import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Ministries from './pages/Ministries';
import Events from './pages/Events';
import EmotionsSupport from './pages/EmotionsSupport';
import Contact from './pages/Contact';
import PrayerRequest from './pages/PrayerRequest';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import PrayerAdmin from './components/admin/PrayerAdmin';
import Dashboard from './components/admin/Dashboard';
import ProtectedRoute from './components/shared/ProtectedRoute';
import LoadingSpinner from './components/shared/LoadingSpinner';

// Componente wrapper con Layout
const Root = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

// Configuración del router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'ministerios',
        element: <Ministries />,
      },
      {
        path: 'eventos',
        element: <Events />,
      },
      {
        path: 'apoyo-emocional',
        element: <EmotionsSupport />,
      },
      {
        path: 'contacto',
        element: <Contact />,
      },
      {
        path: 'oracion',
        element: <PrayerRequest />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'registro',
        element: <Register />,
      },
      {
        path: 'perfil',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/oraciones',
        element: (
          <ProtectedRoute requireAdmin>
            <PrayerAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/dashboard',
        element: (
          <ProtectedRoute requireAdmin>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'oracion',
        element: <PrayerRequest />,
      },
      // Ruta de carga
      {
        path: 'loading',
        element: <LoadingSpinner text="Cargando aplicación..." />,
      },
      // Ruta 404
      {
        path: '*',
        element: (
          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-celestial-800 mb-4">
                404
              </h1>
              <p className="text-celestial-600 mb-8">Página no encontrada</p>
              <a href="/" className="btn-primary">
                Volver al inicio
              </a>
            </div>
          </div>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
