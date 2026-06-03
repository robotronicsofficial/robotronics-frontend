import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { AlertCircle, Mail } from "lucide-react";
import { toast } from "sonner";

import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Display, Text } from "@/components/ui/typography";
import {
  useResendVerificationMutation,
  useVerifyEmailMutation,
} from "../hooks/useAuthMutations";
import {
  buildAuthRedirectSearch,
  consumePostAuthRedirect,
  getSafeRedirectPath,
} from "../utils/authRedirect";
import { CONTACT_PATH, LOGIN_PATH } from "@/router/paths";

const VerifyEmail = () => {
  const search = useSearch({ strict: false });
  const navigate = useNavigate();
  const verifyEmailMutation = useVerifyEmailMutation();
  const resendMutation = useResendVerificationMutation();
  const verificationStarted = useRef(false);
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const redirectPath = getSafeRedirectPath(search.redirect);

  useEffect(() => {
    let redirectTimer = null;

    const verifyEmail = async () => {
      if (verificationStarted.current) return;
      verificationStarted.current = true;

      const token = search.token;
      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing or expired.");
        return;
      }

      try {
        const data = await verifyEmailMutation.mutateAsync(token);
        const nextRedirectPath = redirectPath || consumePostAuthRedirect();

        setStatus("success");
        setMessage(data.message || "Your email is verified.");
        redirectTimer = setTimeout(() => {
          /* If the user came from somewhere (e.g. the wizard), send them
             back with `verified=1` so the inline auth panel defaults to
             login mode. Otherwise fall back to the standalone /Login. */
          if (nextRedirectPath) {
            const separator = nextRedirectPath.includes("?") ? "&" : "?";
            window.location.assign(`${nextRedirectPath}${separator}verified=1`);
            return;
          }
          navigate({
            to: LOGIN_PATH,
            search: {
              emailVerified: true,
              ...buildAuthRedirectSearch(nextRedirectPath),
            },
            replace: true,
          });
        }, 1500);
      } catch (error) {
        setStatus("error");
        setMessage(
          error.message ||
            "We couldn't verify that link. It may have expired or already been used.",
        );
      }
    };

    verifyEmail();

    return () => {
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [search.token, navigate, verifyEmailMutation, redirectPath]);

  const handleResend = async (event) => {
    event.preventDefault();
    if (!resendEmail) {
      toast.error("Enter the email you signed up with.");
      return;
    }
    try {
      await resendMutation.mutateAsync(resendEmail);
      toast.success("Verification email sent. Check your inbox.");
    } catch (error) {
      toast.error(error.message || "Couldn't send the email. Try again.");
    }
  };

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
            <span
              aria-hidden="true"
              className="grid size-14 place-items-center rounded-full bg-success/15 text-success"
            >
              <Mail className="size-6" />
            </span>
            <Display size="md" tone="brand">
              Email verified
            </Display>
            <Text tone="muted" aria-live="polite">
              {message} Taking you back to where you left off…
            </Text>
            <Spinner className="size-6 text-primary" />
          </>
        )}

        {status === "error" && (
          <div
            role="alert"
            aria-live="polite"
            className="flex w-full flex-col items-center gap-5"
          >
            <span
              aria-hidden="true"
              className="grid size-14 place-items-center rounded-full bg-destructive/10 text-destructive"
            >
              <AlertCircle className="size-7" />
            </span>
            <Display size="md" className="text-destructive">
              Couldn&apos;t verify that link
            </Display>
            <Text tone="muted">{message}</Text>

            <form
              onSubmit={handleResend}
              className="mt-2 flex w-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 text-left"
            >
              <Label htmlFor="resend-email">Enter your email to get a fresh link</Label>
              <Input
                id="resend-email"
                type="email"
                autoComplete="email"
                value={resendEmail}
                onChange={(event) => setResendEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
              <Button
                type="submit"
                size="marketing"
                disabled={resendMutation.isPending}
              >
                {resendMutation.isPending
                  ? "Sending…"
                  : "Send a new verification email"}
              </Button>
            </form>

            <Text tone="muted" size="sm">
              Need help?{" "}
              <Link
                to={LOGIN_PATH}
                className="text-foreground underline underline-offset-4"
              >
                Sign in
              </Link>{" "}
              or{" "}
              <Link
                to={CONTACT_PATH}
                className="text-foreground underline underline-offset-4"
              >
                contact support
              </Link>
              .
            </Text>
          </div>
        )}
      </div>
    </AuthShell>
  );
};

export default VerifyEmail;
