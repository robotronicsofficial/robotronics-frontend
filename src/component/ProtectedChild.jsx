import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { resolveBackendUrl } from '../lib/api';
import { DASHBOARD_CHILD_PROFILE_PATH } from '../router/paths';
import {
  buildChildSessionRequest,
  clearActiveChildSession,
  getActiveChildSession,
} from '../utils/childSessionRequest';

const CHILD_PARAM_ROUTE_PREFIXES = [
  '/Dashboard/MyCoursesPage/',
  '/Dashboard/myAllCourses/',
];

const ProtectedChild = ({ children }) => {
  const [sessionStatus, setSessionStatus] = useState('checking');
  const [showSessionPopup, setShowSessionPopup] = useState(false);
  const [sessionMessage, setSessionMessage] = useState('This child session is no longer valid. Re-enter the PIN to continue.');
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const expectedChildId = useMemo(() => {
    const childIdFromQuery = searchParams.get('childId');
    if (childIdFromQuery) {
      return childIdFromQuery;
    }

    const usesChildIdInPath = CHILD_PARAM_ROUTE_PREFIXES.some((prefix) =>
      location.pathname.startsWith(prefix)
    );

    return usesChildIdInPath && params.id ? String(params.id) : null;
  }, [location.pathname, params.id, searchParams]);

  useEffect(() => {
    let isMounted = true;

    const invalidateChildSession = ({
      message = 'This child session is no longer valid. Re-enter the PIN to continue.',
      clearSession = true,
    } = {}) => {
      if (clearSession) {
        clearActiveChildSession();
      }

      if (!isMounted) {
        return;
      }

      setSessionMessage(message);
      setSessionStatus('invalid');
      setShowSessionPopup(true);
    };

    const checkSession = async () => {
      const activeChildSession = getActiveChildSession();

      if (!activeChildSession) {
        invalidateChildSession();
        return;
      }

      const { childId, childIds = [], sessionId } = activeChildSession;

      if (expectedChildId && !childIds.includes(expectedChildId)) {
        invalidateChildSession({
          message: 'This page belongs to a different child account. Return to Child Accounts and open the correct child from there.',
          clearSession: false,
        });
        return;
      }

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
          resolveBackendUrl("/verifyChildSession"),
          childSessionRequest
        );

        const data = await response.json();
        
        if (!response.ok || !data.isValid) {
          invalidateChildSession();
          return;
        }

        if (!isMounted) {
          return;
        }

        setSessionMessage('This child session is no longer valid. Re-enter the PIN to continue.');
        setSessionStatus('valid');
        setShowSessionPopup(false);
      } catch (error) {
        console.error('Session check failed:', error);
        invalidateChildSession();
      }
    };

    setSessionStatus('checking');
    setShowSessionPopup(false);
    checkSession();

    const interval = setInterval(checkSession, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [expectedChildId]);

  const handlePopupClose = () => {
    setShowSessionPopup(false);
    navigate(DASHBOARD_CHILD_PROFILE_PATH);
  };

  return (
    <ProtectedRoute>
      {sessionStatus === 'checking' ? (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
          Validating child access...
        </div>
      ) : sessionStatus === 'valid' ? (
        children
      ) : (
        <>
          <Dialog
            open={showSessionPopup}
            onClose={handlePopupClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Child Access Required</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {sessionMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handlePopupClose} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <div>{sessionMessage}</div>
        </>
      )}
    </ProtectedRoute>
  );
};

ProtectedChild.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedChild;
