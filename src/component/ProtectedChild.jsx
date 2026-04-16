import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { DASHBOARD_CHILD_PROFILE_PATH } from '../router/paths';
import { clearActiveChildSession, getActiveChildSession } from '../utils/childSessionRequest';

const ProtectedChild = ({ children }) => {
  const [isValidSession, setIsValidSession] = useState(true);
  const [showSessionPopup, setShowSessionPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const activeChildSession = getActiveChildSession();

      if (!activeChildSession) {
        clearActiveChildSession();
        setIsValidSession(false);
        setShowSessionPopup(true);
        return;
      }

      const { childId: selectedChildId, sessionId: childSession } = activeChildSession;

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
          clearActiveChildSession();
          setIsValidSession(false);
          setShowSessionPopup(true);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        clearActiveChildSession();
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
    navigate(DASHBOARD_CHILD_PROFILE_PATH);
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
