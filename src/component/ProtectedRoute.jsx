// src/components/ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      toast.error('Please login/signup first to continue on this page', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
