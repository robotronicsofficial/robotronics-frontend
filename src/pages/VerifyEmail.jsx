import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Display, Text } from "@/components/ui/typography";
import { useVerifyEmailMutation } from "../hooks/useAuthMutations";
import {
  buildAuthRedirectSearch,
  consumePostAuthRedirect,
  getSafeRedirectPath,
} from "../utils/authRedirect";

const VerifyEmail = () => {
  const search = useSearch({ strict: false });
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
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
        setStatus("error");
        setMessage("Verification token is missing");
        return;
      }

      try {
        const data = await verifyEmailMutation.mutateAsync(token);
        const nextRedirectPath = redirectPath || consumePostAuthRedirect();

        setStatus("success");
        setMessage(data.message);
        redirectTimer = setTimeout(() => {
          navigate({
            to: "/Login",
            search: {
              emailVerified: true,
              ...buildAuthRedirectSearch(nextRedirectPath),
            },
          });
        }, 3000);
      } catch (error) {
        setStatus("error");
        setMessage(error.message || "An error occurred during verification");
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
    <AuthShell>
      <div className="flex flex-col items-center gap-5 text-center">
        {status === "verifying" && (
          <>
            <span
              aria-hidden="true"
              className="grid size-14 place-items-center rounded-full bg-primary-soft text-primary"
            >
              <Spinner className="size-7" />
            </span>
            <Display size="md" aria-live="polite">
              Verifying your email…
            </Display>
            <Text tone="muted">Hang tight, this only takes a moment.</Text>
          </>
        )}

        {status === "success" && (
          <>
            <Display size="md" tone="brand">
              Email verified
            </Display>
            <Text tone="muted" aria-live="polite">
              {message} Redirecting to login…
            </Text>
            <Spinner className="size-8 text-primary" />
          </>
        )}

        {status === "error" && (
          <div
            role="alert"
            aria-live="polite"
            className="flex flex-col items-center gap-5"
          >
            <span
              aria-hidden="true"
              className="grid size-14 place-items-center rounded-full bg-destructive/10 text-destructive"
            >
              <AlertCircle className="size-7" />
            </span>
            <Display size="md" className="text-destructive">
              Verification failed
            </Display>
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
      </div>
    </AuthShell>
  );
};

export default VerifyEmail;
