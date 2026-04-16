import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const clearChildSession = () => {
  localStorage.removeItem('selectedChildId');
  localStorage.removeItem('childSession');
  localStorage.removeItem('childSessionExpires');
};

const ProtectedChild = ({ children }) => {
  const [isValidSession, setIsValidSession] = useState(true);
  const [showSessionPopup, setShowSessionPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const selectedChildId = localStorage.getItem('selectedChildId');
      const childSession = localStorage.getItem('childSession');
      const childSessionExpires = Number(localStorage.getItem('childSessionExpires') || 0);
      
      if (!selectedChildId) {
        clearChildSession();
        setIsValidSession(false);
        setShowSessionPopup(true);
        return;
      }

      if (!childSession || !childSessionExpires || childSessionExpires <= Date.now()) {
        clearChildSession();
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
          body: JSON.stringify({ childId: selectedChildId, sessionId: childSession }),
        });

        const data = await response.json();
        
        if (!response.ok || !data.isValid) {
          clearChildSession();
          setIsValidSession(false);
          setShowSessionPopup(true);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        clearChildSession();
        setIsValidSession(false);
        setShowSessionPopup(true);
      }
    };

    checkSession();

    const interval = setInterval(checkSession, 30000);
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
              This child session is no longer valid. Re-enter the PIN to continue.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePopupClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <div>Session expired. Redirecting to the child account page...</div>
      </>
    );
  }

  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default ProtectedChild;
