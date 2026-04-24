import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Button } from '@/components/ui/button';
import DialogShell from '@/components/ui/dialog-shell';
import { DASHBOARD_CHILD_PROFILE_PATH } from '../router/paths';
import {
  clearActiveChildSession,
  getActiveChildSession,
} from '../utils/childSessionRequest';
import { useChildSessionVerification } from '../hooks/useChildSessionQuery';

const ProtectedChild = ({ children }) => {
  const [sessionStatus, setSessionStatus] = useState('checking');
  const [showSessionPopup, setShowSessionPopup] = useState(false);
  const [sessionMessage, setSessionMessage] = useState('This child session is no longer valid. Re-enter the PIN to continue.');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeChildSession = getActiveChildSession();
  const childId = activeChildSession?.childId || null;
  const childIds = activeChildSession?.childIds || [];
  const sessionId = activeChildSession?.sessionId || null;

  const expectedChildId = useMemo(() => {
    const childIdFromQuery = searchParams.get('childId');
    return childIdFromQuery ? String(childIdFromQuery) : null;
  }, [searchParams]);
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
        <div className="bg-muted min-h-screen flex justify-center items-center">
          Validating child access...
        </div>
      ) : sessionStatus === 'valid' ? (
        children
      ) : (
        <>
          <DialogShell
            isOpen={showSessionPopup}
            onClose={handlePopupClose}
            title="Child Access Required"
            description={sessionMessage}
          >
            <Button type="button" className="w-full" onClick={handlePopupClose} autoFocus>
              OK
            </Button>
          </DialogShell>
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
