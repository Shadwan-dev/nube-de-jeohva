import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si requiere admin, verificar rol
  if (requireAdmin) {
    // Aquí deberías verificar si el usuario tiene rol de admin
    // Por ahora, solo redirige
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;