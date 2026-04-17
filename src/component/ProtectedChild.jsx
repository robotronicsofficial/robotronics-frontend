import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { DASHBOARD_CHILD_PROFILE_PATH } from '../router/paths';
import {
  buildChildSessionRequest,
  clearActiveChildSession,
  getActiveChildSession,
} from '../utils/childSessionRequest';

const ProtectedChild = ({ children }) => {
  const [isValidSession, setIsValidSession] = useState(true);
  const [showSessionPopup, setShowSessionPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const invalidateChildSession = () => {
      clearActiveChildSession();
      setIsValidSession(false);
      setShowSessionPopup(true);
    };

    const checkSession = async () => {
      const activeChildSession = getActiveChildSession();

      if (!activeChildSession) {
        invalidateChildSession();
        return;
      }

      const { childId, sessionId } = activeChildSession;

      try {
        const childSessionRequest = buildChildSessionRequest({
          method: 'POST',
          childId,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            childId,
            sessionId,
          },
        });

        if (!childSessionRequest) {
          invalidateChildSession();
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/verifyChildSession`,
          childSessionRequest
        );

        const data = await response.json();
        
        if (!response.ok || !data.isValid) {
          invalidateChildSession();
        }
      } catch (error) {
        console.error('Session check failed:', error);
        invalidateChildSession();
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

ProtectedChild.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedChild;
