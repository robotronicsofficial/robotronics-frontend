import { useState, useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import facebook from "../assets/images/Facebooklogo.svg";
import google from "../assets/images/Googlelogo.svg";
import AuthShell from "@/components/auth/AuthShell";
import AuthSocialButton from "@/components/auth/AuthSocialButton";
import PasswordVisibilityButton from "@/components/auth/PasswordVisibilityButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Display, Text } from "@/components/ui/typography";
import { useAuth } from "../contexts/useAuth";
import { resolveBackendUrl } from "../lib/api";
import { useRequestPasswordResetMutation } from "../hooks/useAuthMutations";
import {
  buildAuthRedirectSearch,
  consumePostAuthRedirect,
  getSafeRedirectPath,
} from "../utils/authRedirect";

const FieldLabel = ({ htmlFor, children, action }) => (
  <div className="flex items-center justify-between">
    <Label htmlFor={htmlFor}>{children}</Label>
    {action}
  </div>
);

const Login = () => {
  const { currentUser, isAuthLoading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const requestPasswordResetMutation = useRequestPasswordResetMutation();
  const redirectPath = getSafeRedirectPath(search.redirect);

  useEffect(() => {
    if (search.emailVerified) {
      const nextRedirectPath = redirectPath || consumePostAuthRedirect();
      toast.success("Your email has been verified. Sign in to continue.");
      navigate({
        to: "/Login",
        search: buildAuthRedirectSearch(nextRedirectPath),
        replace: true,
      });
      return;
    }

    if (currentUser) {
      navigate({ to: redirectPath || "/", replace: true });
    }
  }, [search.emailVerified, currentUser, navigate, redirectPath]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoggingIn) return;
    setError(null);
    setIsLoggingIn(true);
    try {
      await login(email, password, rememberMe);
      toast.success("Login successful.");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = await requestPasswordResetMutation.mutateAsync(forgotEmail);
      toast.success(payload?.message || "Password reset instructions sent.");
      setForgotPasswordMode(false);
      setForgotEmail("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.assign(resolveBackendUrl(`/auth/${provider}`));
  };

  if (isAuthLoading) {
    return (
      <AuthShell>
        <Text tone="muted" className="text-center">
          Loading account…
        </Text>
      </AuthShell>
    );
  }

  if (forgotPasswordMode) {
    return (
      <AuthShell>
        <header className="flex flex-col items-center gap-2 text-center">
          <Display size="md">Reset your password</Display>
          <Text tone="muted">
            Enter the email tied to your account — we&apos;ll send a reset link.
          </Text>
        </header>

        <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <FieldLabel htmlFor="forgot-email">Email address</FieldLabel>
            <Input
              id="forgot-email"
              type="email"
              autoComplete="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            size="marketing"
            className="w-full"
            disabled={requestPasswordResetMutation.isPending}
          >
            {requestPasswordResetMutation.isPending ? "Sending…" : "Send reset instructions"}
          </Button>
          <Button
            type="button"
            variant="link"
            onClick={() => setForgotPasswordMode(false)}
          >
            Back to login
          </Button>
          {error && <Text size="sm" className="text-destructive" role="alert">{error}</Text>}
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <header className="flex flex-col items-center gap-2 text-center">
        <Display size="md">Welcome back</Display>
        <Text tone="muted">Sign in to your Robotronics.ai account.</Text>
      </header>

      <div className="flex flex-col gap-3">
        <AuthSocialButton
          className="w-full"
          icon={facebook}
          label="Continue with Facebook"
          onClick={() => handleSocialLogin("facebook")}
        />
        <AuthSocialButton
          className="w-full"
          icon={google}
          label="Continue with Google"
          onClick={() => handleSocialLogin("google")}
        />
      </div>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <Text size="xs" tone="muted" className="font-mono uppercase tracking-wider">
          or
        </Text>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="email">Email address</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel
            htmlFor="password"
            action={
              <PasswordVisibilityButton
                isVisible={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
                showIconWhenHidden
              />
            }
          >
            Password
          </FieldLabel>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="button"
            variant="link"
            onClick={() => setForgotPasswordMode(true)}
            className="self-end p-0 text-body-sm"
          >
            Forgot password?
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
          />
          <Label htmlFor="remember-me" className="cursor-pointer">
            Remember me
          </Label>
        </div>

        <Button type="submit" size="marketing" className="w-full" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in…" : "Log in"}
        </Button>

        {error && <Text size="sm" className="text-destructive" role="alert">{error}</Text>}
      </form>

      <div className="flex flex-col items-center gap-3 border-t border-border pt-6">
        <Text tone="muted" size="sm">
          Don&apos;t have an account?
        </Text>
        <Button
          type="button"
          size="marketing"
          variant="outline"
          className="w-full"
          onClick={() =>
            navigate({ to: "/Signup", search: buildAuthRedirectSearch(redirectPath) })
          }
        >
          Create an account
        </Button>
      </div>
    </AuthShell>
  );
};

export default Login;
