import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useVerifyEmailMutation } from '../hooks/useAuthMutations';
import {
  buildAuthRedirectSearch,
  consumePostAuthRedirect,
  getSafeRedirectPath,
} from '../utils/authRedirect';

const VerifyEmail = () => {
  const search = useSearch({ strict: false });
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const verificationStarted = useRef(false);
  const verifyEmailMutation = useVerifyEmailMutation();
  const redirectPath = getSafeRedirectPath(search.redirect);

  useEffect(() => {
    let redirectTimer = null;

    const verifyEmail = async () => {
      if (verificationStarted.current) return;
      verificationStarted.current = true;
      
      const token = search.token;
      if (!token) {
        setStatus('error');
        setMessage('Verification token is missing');
        return;
      }

      try {
        const data = await verifyEmailMutation.mutateAsync(token);
        const nextRedirectPath = redirectPath || consumePostAuthRedirect();

        setStatus('success');
        setMessage(data.message);
        redirectTimer = setTimeout(() => {
          navigate({
            to: '/Login',
            search: {
              emailVerified: true,
              ...buildAuthRedirectSearch(nextRedirectPath),
            },
          });
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
  }, [search.token, navigate, verifyEmailMutation, redirectPath]);

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        {status === 'verifying' && (
          <>
            <Spinner className="size-14 text-primary" />
            <h1
              aria-live="polite"
              className="mt-6 text-xl font-semibold text-foreground"
            >
              Verifying your email...
            </h1>
          </>
        )}

        {status === 'success' && (
          <>
            <h1 className="text-3xl font-bold text-primary">
              Email Verified!
            </h1>
            <p aria-live="polite" className="mb-6 mt-3 text-muted-foreground">
              {message} Redirecting to login page...
            </p>
            <Spinner className="size-8 text-primary" />
          </>
        )}

        {status === 'error' && (
          <div role="alert" aria-live="polite" className="flex flex-col items-center gap-6">
            <h1 className="text-3xl font-bold text-destructive">
              Verification Failed
            </h1>
            <p className="text-muted-foreground">{message}</p>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: '/Signup' })}
              disabled={verifyEmailMutation.isPending}
            >
              {verifyEmailMutation.isPending ? "Retrying…" : "Try Again"}
            </Button>
          </div>
        )}
    </main>
  );
};

export default VerifyEmail;
