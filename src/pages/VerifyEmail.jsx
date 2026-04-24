import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
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
    <main className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        {status === 'verifying' && (
          <>
            <Spinner className="size-14 text-primary" />
            <h1 className="mt-6 text-xl font-semibold text-foreground">Verifying your email...</h1>
          </>
        )}

        {status === 'success' && (
          <>
            <h1 className="text-3xl font-bold text-primary">
              Email Verified!
            </h1>
            <p className="mb-6 mt-3 text-muted-foreground">
              {message} Redirecting to login page...
            </p>
            <Spinner className="size-8 text-primary" />
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-3xl font-bold text-destructive">
              Verification Failed
            </h1>
            <p className="mb-6 mt-3 text-muted-foreground">{message}</p>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/Signup')}
            >
              Try Again
            </Button>
          </>
        )}
    </main>
  );
};

export default VerifyEmail;
