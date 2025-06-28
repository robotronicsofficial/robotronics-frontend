import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const ProtectedChild = ({ children }) => {
  const [isValidSession, setIsValidSession] = useState(true);
  const [showSessionPopup, setShowSessionPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      console.log("Enter");
      const selectedChildId = localStorage.getItem('selectedChildId');
      
      if (!selectedChildId) {
        setIsValidSession(false);
        setShowSessionPopup(true);
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
          setShowSessionPopup(true);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        setIsValidSession(false);
        setShowSessionPopup(true);
      }
    };

    checkSession();

    const interval = setInterval(checkSession, 3000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handlePopupClose = () => {
    setShowSessionPopup(false);
    navigate('/Dashboard/userInfo');
  };

  if (!isValidSession) {
    return (
      <>
        <Dialog
          open={showSessionPopup}
          onClose={handlePopupClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Session Alert</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are logged in to another PC. Please log in again to continue.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePopupClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <div>Session expired. Redirecting to login...</div>
      </>
    );
  }

  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default ProtectedChild;