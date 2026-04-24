import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import facebook from "../assets/images/Facebooklogo.svg";
import google from "../assets/images/Googlelogo.svg";
import AuthSocialButton from "../components/auth/AuthSocialButton";
import PasswordVisibilityButton from "../components/auth/PasswordVisibilityButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "../contexts/useAuth";

import { resolveBackendUrl } from "../lib/api";
import { useRequestPasswordResetMutation } from "../hooks/useAuthMutations";
import { getHeaderOffsetClass } from "../components/layout/headerOffset";
const REDIRECT_AFTER_LOGIN_STORAGE_KEY = "redirectAfterLogin";

const isSafeRedirectPath = (value) => (
  typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
);

const Login = () => {
  const { currentUser, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const requestPasswordResetMutation = useRequestPasswordResetMutation();
  const redirectFromState = location.state?.from
    ? `${location.state.from.pathname || ""}${location.state.from.search || ""}${location.state.from.hash || ""}`
    : null;

  useEffect(() => {
    if (location.state?.emailVerified) {
      toast.success('Your email has been verified! Please sign in to continue.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      window.history.replaceState({}, document.title);
    }

    if (currentUser) {
      const redirectPath = window.sessionStorage.getItem(REDIRECT_AFTER_LOGIN_STORAGE_KEY);
      if (isSafeRedirectPath(redirectPath)) {
        window.sessionStorage.removeItem(REDIRECT_AFTER_LOGIN_STORAGE_KEY);
        navigate(redirectPath, { replace: true });
        return;
      }

      if (redirectPath) {
        window.sessionStorage.removeItem(REDIRECT_AFTER_LOGIN_STORAGE_KEY);
      }

      navigate(isSafeRedirectPath(redirectFromState) ? redirectFromState : "/", { replace: true });
    }
  }, [location.state, currentUser, navigate, redirectFromState]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
      toast.error(error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const payload = await requestPasswordResetMutation.mutateAsync(forgotEmail);

      toast.success(payload?.message || 'Password reset instructions sent to your email');
      setForgotPasswordMode(false);
      setForgotEmail('');
    } catch (err) {
      setError(err.message);
      console.error('Forgot password error:', err);
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.assign(resolveBackendUrl(`/auth/${provider}`));
  };

  if (forgotPasswordMode) {
    return (
      <div className="bg-background" id="forgot-password">
        <div className={getHeaderOffsetClass("page", "flex flex-col items-center justify-center gap-6 px-6 pb-20 md:px-10 lg:px-16")}>
          <p className="text-4xl poppins-bold text-foreground">Forgot Password</p>
          <form
            onSubmit={handleForgotPassword}
            className="flex w-full max-w-md flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <Label className="text-sm poppins-regular">Email address</Label>
              <Input
                className="h-auto rounded-xl bg-background px-4 py-3"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="h-auto w-full rounded-3xl bg-foreground py-3 text-background poppins-regular"
            >
              Send Reset Instructions
            </Button>
            <Button
              type="button"
              onClick={() => setForgotPasswordMode(false)}
              variant="link"
              className="text-foreground"
            >
              Back to Login
            </Button>
          </form>
          {error && <p role="alert" className="text-destructive text-sm">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background" id="signin">
      <div className={getHeaderOffsetClass("auth", "mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-8 md:px-10 lg:px-16")}>
        <div
          className="flex flex-col items-center gap-4"
          data-aos="fade-up"
        >
          <p className="text-center text-wrap md:text-3xl text-2xl poppins-bold text-foreground">
            Log in to your account
          </p>
          <AuthSocialButton
            className="w-full"
            icon={facebook}
            label="Continue with Facebook"
            onClick={() => handleSocialLogin('facebook')}
          />
          <AuthSocialButton
            className="w-full"
            icon={google}
            label="Continue with Google"
            onClick={() => handleSocialLogin('google')}
          />
        </div>
        <div
          className="flex items-center gap-3"
          data-aos="fade-up"
        >
          <Separator className="flex-1" />
          <p className="text-xl font-bold">OR</p>
          <Separator className="flex-1" />
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-1">
            <Label className="text-sm poppins-regular">Email address</Label>
            <Input
              className="h-auto rounded-xl bg-background px-4 py-3"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label className="text-sm poppins-regular">Password</Label>
              <PasswordVisibilityButton
                className="w-auto"
                isVisible={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
                showIconWhenHidden
                textClassName="poppins-regular"
              />
            </div>
            <Input
              className="h-auto rounded-xl bg-background px-4 py-3"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="button"
              onClick={() => setForgotPasswordMode(true)}
              variant="link"
              className="h-auto justify-end p-0 text-right text-sm font-bold text-foreground poppins-regular"
            >
              Forget your password
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="keep-signed-in"
            />
            <Label
              htmlFor="keep-signed-in"
              className="text-sm poppins-regular text-muted-foreground"
            >
              Keep me signed in until I sign out
            </Label>
          </div>
          <Button
            type="submit"
            className="h-auto w-full rounded-3xl bg-foreground py-3 text-background poppins-regular"
          >
            Log in
          </Button>
          {error && <p role="alert" className="text-destructive text-sm">{error}</p>}
          <Separator />
          <div className="flex flex-col items-center gap-4">
            <p className="text-center poppins-regular lg:text-3xl text-xl text-foreground">
              Don&apos;t have an account?
            </p>
            <Button
              type="button"
              variant="outline"
              className="h-auto w-full rounded-3xl bg-background py-3 text-foreground poppins-regular"
              onClick={() => navigate('/Signup')}
            >
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
