import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Mail, Check, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import PasswordVisibilityButton from "@/components/auth/PasswordVisibilityButton";
import AuthSocialButton from "@/components/auth/AuthSocialButton";
import { getPasswordInputClassName } from "@/components/auth/passwordInputClass";
import facebook from "@/assets/images/Facebooklogo.svg";
import google from "@/assets/images/Googlelogo.svg";
import { useAuth } from "@/contexts/useAuth";
import {
  useRegisterMutation,
  useResendVerificationMutation,
} from "@/hooks/useAuthMutations";
import {
  getPasswordValidationState,
  hasValidPasswordRequirements,
  PASSWORD_POLICY_MESSAGE,
} from "@/utils/passwordPolicy";
import { savePostAuthRedirect, startSocialLogin } from "@/utils/authRedirect";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
   InlineAuthPanel — sign in / create account inside the wizard.

   Replaces the old /Signup → /verifyEmail → /Login mid-funnel detour.
   The user signs up here, sees the "check your inbox" state inline,
   and the verification link returns them right back to this URL.
   ────────────────────────────────────────────────────────────────── */

const RequirementCheck = ({ isValid, text }) => (
  <div className="flex items-center gap-2">
    <span
      aria-hidden="true"
      className={cn(
        "grid size-4 place-items-center rounded-full",
        isValid
          ? "bg-success/15 text-success"
          : "bg-muted text-muted-foreground",
      )}
    >
      {isValid ? <Check className="size-3" /> : <X className="size-3" />}
    </span>
    <Text size="xs" className={isValid ? "text-success" : "text-muted-foreground"}>
      {text}
    </Text>
  </div>
);

RequirementCheck.propTypes = {
  isValid: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export const InlineAuthPanel = ({
  redirectPath,
  defaultMode = "signup",
  title = "Create your parent account",
  subtitle = "It only takes a moment. Your kids' learning is one signup away.",
}) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();
  const resendMutation = useResendVerificationMutation();

  const [mode, setMode] = useState(defaultMode);
  const [pending, setPending] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const passwordErrors = getPasswordValidationState(signupForm.password, signupForm.password);
  const passwordMeetsPolicy =
    passwordErrors.length && passwordErrors.number && passwordErrors.symbol;

  const handleSocialLogin = (provider) => {
    startSocialLogin(provider, redirectPath);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (pending) return;
    if (!hasValidPasswordRequirements(passwordErrors)) {
      toast.error(PASSWORD_POLICY_MESSAGE);
      return;
    }
    if (!agree) {
      toast.error("Please agree to the Terms of Use and Privacy Policy.");
      return;
    }
    setPending(true);
    try {
      await registerMutation.mutateAsync(signupForm);
      if (redirectPath) savePostAuthRedirect(redirectPath);
      setRegisteredEmail(signupForm.email);
    } catch (error) {
      toast.error(error.message || "We couldn't create your account.");
    } finally {
      setPending(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    try {
      await login(loginForm.email, loginForm.password, true);
      toast.success("Signed in.");
      if (redirectPath) {
        navigate({ to: redirectPath, replace: true });
      }
    } catch (error) {
      toast.error(error.message || "Couldn't sign in.");
    } finally {
      setPending(false);
    }
  };

  const handleResend = async () => {
    if (!registeredEmail) return;
    try {
      await resendMutation.mutateAsync(registeredEmail);
      toast.success("Verification email resent. Check your inbox.");
    } catch (error) {
      toast.error(error.message || "Could not resend the email.");
    }
  };

  if (registeredEmail) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-5 py-10 text-center">
          <span
            aria-hidden="true"
            className="grid size-14 place-items-center rounded-full bg-primary-soft text-primary"
          >
            <Mail className="size-6" />
          </span>
          <Heading level={3} className="text-h4">
            Check your inbox
          </Heading>
          <Text tone="muted" className="max-w-md">
            We sent a verification link to{" "}
            <span className="font-semibold text-foreground">{registeredEmail}</span>.
            Click the link to come right back to this page and finish signing up
            your kids.
          </Text>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleResend}
              disabled={resendMutation.isPending}
            >
              {resendMutation.isPending ? "Resending…" : "Resend email"}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={() => {
                setRegisteredEmail(null);
                setMode("login");
              }}
            >
              Already verified? Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <Eyebrow>{mode === "signup" ? "Create account" : "Sign in"}</Eyebrow>
          <Heading level={3} className="text-h4">
            {mode === "signup" ? title : "Welcome back"}
          </Heading>
          <Text tone="muted" size="sm">
            {mode === "signup"
              ? subtitle
              : "Sign in to pick up where you left off."}
          </Text>
        </div>

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

        {mode === "signup" ? (
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="auth-firstName">First name</Label>
                <Input
                  id="auth-firstName"
                  name="firstName"
                  autoComplete="given-name"
                  value={signupForm.firstName}
                  onChange={(e) =>
                    setSignupForm((p) => ({ ...p, firstName: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="auth-lastName">Last name</Label>
                <Input
                  id="auth-lastName"
                  name="lastName"
                  autoComplete="family-name"
                  value={signupForm.lastName}
                  onChange={(e) =>
                    setSignupForm((p) => ({ ...p, lastName: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="auth-email">Email</Label>
              <Input
                id="auth-email"
                type="email"
                name="email"
                autoComplete="email"
                value={signupForm.email}
                onChange={(e) =>
                  setSignupForm((p) => ({ ...p, email: e.target.value }))
                }
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="auth-phone">Phone</Label>
              <Input
                id="auth-phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                value={signupForm.phone}
                onChange={(e) =>
                  setSignupForm((p) => ({ ...p, phone: e.target.value }))
                }
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="auth-password">Password</Label>
                <PasswordVisibilityButton
                  isVisible={showPassword}
                  onToggle={() => setShowPassword((p) => !p)}
                />
              </div>
              <Input
                id="auth-password"
                className={getPasswordInputClassName(signupForm.password, passwordMeetsPolicy)}
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={signupForm.password}
                onChange={(e) =>
                  setSignupForm((p) => ({ ...p, password: e.target.value }))
                }
                required
              />
              <div className="mt-1 grid grid-cols-1 gap-1.5 sm:grid-cols-3">
                <RequirementCheck isValid={passwordErrors.length} text="8+ characters" />
                <RequirementCheck isValid={passwordErrors.number} text="One number" />
                <RequirementCheck isValid={passwordErrors.symbol} text="One symbol" />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="auth-terms"
                checked={agree}
                onCheckedChange={(checked) => setAgree(Boolean(checked))}
              />
              <Label htmlFor="auth-terms" className="cursor-pointer text-body-sm">
                I agree to the{" "}
                <Link
                  to="/TermsConditions"
                  className="text-foreground underline underline-offset-4"
                >
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link
                  to="/PrivacyPolicy"
                  className="text-foreground underline underline-offset-4"
                >
                  Privacy Policy
                </Link>
                .
              </Label>
            </div>

            <Button type="submit" size="marketing" className="w-full" disabled={pending || !agree}>
              {pending ? (
                <>
                  <Spinner /> Creating account…
                </>
              ) : (
                "Create account"
              )}
            </Button>

            <Text tone="muted" size="sm" className="text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-foreground underline underline-offset-4"
              >
                Sign in
              </button>
            </Text>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="auth-login-email">Email</Label>
              <Input
                id="auth-login-email"
                type="email"
                name="email"
                autoComplete="email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((p) => ({ ...p, email: e.target.value }))
                }
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="auth-login-password">Password</Label>
                <PasswordVisibilityButton
                  isVisible={showPassword}
                  onToggle={() => setShowPassword((p) => !p)}
                />
              </div>
              <Input
                id="auth-login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((p) => ({ ...p, password: e.target.value }))
                }
                required
              />
            </div>
            <Button type="submit" size="marketing" className="w-full" disabled={pending}>
              {pending ? "Signing in…" : "Sign in"}
            </Button>
            <Text tone="muted" size="sm" className="text-center">
              New to Robotronics?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-foreground underline underline-offset-4"
              >
                Create an account
              </button>
            </Text>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

InlineAuthPanel.propTypes = {
  redirectPath: PropTypes.string,
  defaultMode: PropTypes.oneOf(["signup", "login"]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default InlineAuthPanel;
