import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const ProtectedChild = ({ children }) => {
  const [isValidSession, setIsValidSession] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
        console.log("Enter ")
      const selectedChildId = localStorage.getItem('selectedChildId');
      
      if (!selectedChildId) {
        setIsValidSession(false);
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verifyChildSession`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ childId: selectedChildId }),
        });

        const data = await response.json();
        
        if (!data.isValid) {
          setIsValidSession(false);
          localStorage.removeItem('selectedChildId');
          navigate('/login'); 
        }
      } catch (error) {
        console.error('Session check failed:', error);
        setIsValidSession(false);
        navigate('/login');
      }
    };

    checkSession();

    const interval = setInterval(checkSession, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  if (!isValidSession) {
    return <div>Session expired. Redirecting to login...</div>;
  }

  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default ProtectedChild;