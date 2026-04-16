import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, CircularProgress, Button } from '@mui/material';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const verificationStarted = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      // Skip if already started
      if (verificationStarted.current) return;
      verificationStarted.current = true;
      
      const token = searchParams.get('token');
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message);
          // Redirect to login after 3 seconds with success state
          setTimeout(() => {
            navigate('/Login', { state: { emailVerified: true } });
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.message);
        }
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred during verification');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

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
