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
        <div className={getHeaderOffsetClass("page", "flex flex-col items-center justify-center pb-20")}>
          <p className="text-4xl poppins-bold text-foreground">Forgot Password</p>
          <form
            onSubmit={handleForgotPassword}
            className="flex flex-col items-center gap-4"
          >
            <div>
              <Label className="text-sm poppins-regular">Email address</Label>
              <Input
                className="h-auto rounded-xl bg-background py-3 px-14 lg:px-32"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="h-auto rounded-3xl bg-foreground px-14 py-3 text-background poppins-regular lg:px-32"
            >
              Send Reset Instructions
            </Button>
            <Button
              type="button"
              onClick={() => setForgotPasswordMode(false)}
              variant="link"
              className="mt-2 text-foreground"
            >
              Back to Login
            </Button>
          </form>
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background" id="signin">
      <div>
        <div
          className={getHeaderOffsetClass("auth", "flex flex-col items-center justify-center gap-1 py-5 lg:gap-4")}
          data-aos="fade-up"
        >
          <p className="text-center text-wrap justify-center lg:py-10 py-5 md:text-3xl text-2xl poppins-bold text-foreground">
            Log in to your account
          </p>
          <AuthSocialButton
            className="px-12 lg:px-28"
            icon={facebook}
            label="Continue with Facebook"
            onClick={() => handleSocialLogin('facebook')}
          />
          <AuthSocialButton
            className="px-14 lg:px-32"
            icon={google}
            label="Continue with Google"
            onClick={() => handleSocialLogin('google')}
          />
        </div>
        <div
          className="flex items-center justify-center"
          data-aos="fade-up"
        >
          <Separator className="lg:w-52 w-44" />
          <p className="text-xl font-bold p-2">OR</p>
          <Separator className="lg:w-52 w-44" />
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-3"
          data-aos="fade-up"
        >
          <div className="lg:py-8 py-4">
            <Label className="text-sm poppins-regular">Email address</Label>
            <Input
              className="h-auto rounded-xl bg-background py-3 px-14 lg:px-32"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
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
              className="h-auto rounded-xl bg-background py-3 px-14 lg:px-32"
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
          <div className="flex items-left lg:py-5 py-2">
            <Checkbox
              id="keep-signed-in"
            />
            <Label
              htmlFor="keep-signed-in"
              className="ms-2 text-sm poppins-regular text-muted-foreground"
            >
              Keep me signed in until I sign out
            </Label>
          </div>
          <Button
            type="submit"
            className="h-auto rounded-3xl bg-foreground px-14 py-3 text-background poppins-regular lg:px-32"
          >
            Log in
          </Button>
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
          <div className="flex items-center justify-center">
            <Separator className="lg:w-56 w-44" />
            <Separator className="lg:w-60 w-48" />
          </div>
          <p className="text-center poppins-regular justify-center lg:py-10 py-5 lg:text-3xl text-xl text-foreground">
            Don&apos;t have an account?
          </p>
          <div className="lg:pb-10 pb-4">
            <Button
              type="button"
              variant="outline"
              className="h-auto rounded-3xl bg-background px-14 py-3 text-foreground poppins-regular lg:px-32"
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
