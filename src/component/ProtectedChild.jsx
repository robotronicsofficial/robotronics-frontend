import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { DASHBOARD_CHILD_PROFILE_PATH } from '../router/paths';
import {
  clearActiveChildSession,
  getActiveChildSession,
} from '../utils/childSessionRequest';
import { useChildSessionVerification } from '../hooks/useChildSessionQuery';

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
  const activeChildSession = getActiveChildSession();
  const childId = activeChildSession?.childId || null;
  const childIds = activeChildSession?.childIds || [];
  const sessionId = activeChildSession?.sessionId || null;

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
  const expectedChildMatchesSession = !expectedChildId || childIds.includes(expectedChildId);
  const sessionQuery = useChildSessionVerification({
    childId,
    sessionId,
    enabled: expectedChildMatchesSession,
  });

  useEffect(() => {
    const invalidateChildSession = ({
      message = 'This child session is no longer valid. Re-enter the PIN to continue.',
      clearSession = true,
    } = {}) => {
      if (clearSession) {
        clearActiveChildSession();
      }

      setSessionMessage(message);
      setSessionStatus('invalid');
      setShowSessionPopup(true);
    };

    if (!activeChildSession) {
      invalidateChildSession();
      return;
    }

    if (!expectedChildMatchesSession) {
      invalidateChildSession({
        message: 'This page belongs to a different child account. Return to Child Accounts and open the correct child from there.',
        clearSession: false,
      });
      return;
    }

    if (sessionQuery.isLoading || sessionQuery.isFetching) {
      setSessionStatus((currentStatus) => (
        currentStatus === 'valid' ? currentStatus : 'checking'
      ));
      setShowSessionPopup(false);
      return;
    }

    if (sessionQuery.isError || sessionQuery.data !== true) {
      invalidateChildSession();
      return;
    }

    setSessionMessage('This child session is no longer valid. Re-enter the PIN to continue.');
    setSessionStatus('valid');
    setShowSessionPopup(false);
  }, [
    activeChildSession,
    expectedChildMatchesSession,
    sessionQuery.data,
    sessionQuery.isError,
    sessionQuery.isFetching,
    sessionQuery.isLoading,
  ]);

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
