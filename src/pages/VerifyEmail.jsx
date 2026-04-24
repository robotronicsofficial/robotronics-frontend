import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, CircularProgress, Button } from '@mui/material';
import { useVerifyEmailMutation } from '../hooks/useAuthMutations';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const verificationStarted = useRef(false);
  const verifyEmailMutation = useVerifyEmailMutation();

  useEffect(() => {
    let redirectTimer = null;

    const verifyEmail = async () => {
      if (verificationStarted.current) return;
      verificationStarted.current = true;
      
      const token = searchParams.get('token');
      if (!token) {
        setStatus('error');
        setMessage('Verification token is missing');
        return;
      }

      try {
        const data = await verifyEmailMutation.mutateAsync(token);

        setStatus('success');
        setMessage(data.message);
        redirectTimer = setTimeout(() => {
          navigate('/Login', { state: { emailVerified: true } });
        }, 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.message || 'An error occurred during verification');
      }
    };

    verifyEmail();

    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [searchParams, navigate, verifyEmailMutation]);

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        textAlign="center"
      >
        {status === 'verifying' && (
          <>
            <CircularProgress size={60} />
            <Typography variant="h6" mt={3}>Verifying your email...</Typography>
          </>
        )}

        {status === 'success' && (
          <>
            <Typography variant="h4" color="success.main" gutterBottom>
              Email Verified!
            </Typography>
            <Typography variant="body1" mb={3}>
              {message} Redirecting to login page...
            </Typography>
            <CircularProgress size={30} />
          </>
        )}

        {status === 'error' && (
          <>
            <Typography variant="h4" color="error.main" gutterBottom>
              Verification Failed
            </Typography>
            <Typography variant="body1" mb={3}>{message}</Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/Signup')}
            >
              Try Again
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default VerifyEmail;
