import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Display, Heading, Text } from "@/components/ui/typography";
import { useVerifyEmailMutation } from "../hooks/useAuthMutations";
import {
  buildAuthRedirectSearch,
  consumePostAuthRedirect,
  getSafeRedirectPath,
} from "../utils/authRedirect";

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
    <main className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      {status === "verifying" && (
        <>
          <Spinner className="size-14 text-primary" />
          <Heading level={2} aria-live="polite" className="mt-6">
            Verifying your email…
          </Heading>
        </>
      )}

      {status === "success" && (
        <>
          <Display size="md" tone="brand">Email verified</Display>
          <Text tone="muted" aria-live="polite">
            {message} Redirecting to login…
          </Text>
          <Spinner className="size-8 text-primary" />
        </>
      )}

      {status === "error" && (
        <div role="alert" aria-live="polite" className="flex flex-col items-center gap-4">
          <Display size="md" className="text-destructive">Verification failed</Display>
          <Text tone="muted">{message}</Text>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/Signup" })}
            disabled={verifyEmailMutation.isPending}
          >
            {verifyEmailMutation.isPending ? "Retrying…" : "Try again"}
          </Button>
        </div>
      )}
    </main>
  );
};

export default VerifyEmail;
