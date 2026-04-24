import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PasswordVisibilityButton from "../components/auth/PasswordVisibilityButton";
import { getPasswordInputClassName } from "../components/auth/passwordInputClass";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPasswordMutation } from "../hooks/useAuthMutations";
import { getHeaderOffsetClass } from "../components/layout/headerOffset";
import {
  getPasswordValidationState,
  hasValidPasswordRequirements,
  PASSWORD_POLICY_MESSAGE,
} from "../utils/passwordPolicy";

const RequirementCheck = ({ isValid, text }) => (
  <div className="flex items-center gap-2">
    <Badge variant={isValid ? "default" : "destructive"} className="size-4 rounded-full p-0" />
    <span className={`text-xs ${isValid ? 'text-success' : 'text-destructive'}`}>{text}</span>
  </div>
);

RequirementCheck.propTypes = {
  isValid: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const resetPasswordMutation = useResetPasswordMutation();

  const passwordValidation = getPasswordValidationState(password, confirmPassword);
  const {
    length: hasMinLength,
    number: hasNumber,
    symbol: hasSymbol,
    match: passwordsMatch,
  } = passwordValidation;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      return setError("Reset token is missing");
    }

    if (!hasValidPasswordRequirements(passwordValidation)) {
      return setError(PASSWORD_POLICY_MESSAGE);
    }

    if (!passwordsMatch) {
      return setError("Passwords do not match");
    }

    try {
      await resetPasswordMutation.mutateAsync({ token, password });

      toast.success("Password reset successfully!");
      setTimeout(() => navigate("/Login"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
      console.error("Reset password error:", err);
    }
  };

  return (
    <div className="bg-background" id="reset-password">
      <div className={getHeaderOffsetClass("page", "flex flex-col items-center justify-center pb-20")}>
        <p className="text-4xl poppins-bold text-foreground">Reset Password</p>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col items-center gap-4"
        >
          <div className="w-full">
            <div className="flex items-center justify-between">
              <Label className="text-sm poppins-light">New Password</Label>
              <PasswordVisibilityButton
                isVisible={showPassword}
                onToggle={togglePasswordVisibility}
              />
            </div>
            <Input
              className={getPasswordInputClassName(password, hasMinLength && hasNumber && hasSymbol)}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <RequirementCheck
                isValid={hasMinLength}
                text="8+ characters"
              />
              <RequirementCheck
                isValid={hasNumber}
                text="Contains number"
              />
              <RequirementCheck
                isValid={hasSymbol}
                text="Contains symbol"
              />
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between">
              <Label className="text-sm poppins-light">Confirm Password</Label>
              <PasswordVisibilityButton
                isVisible={showConfirmPassword}
                onToggle={toggleConfirmPasswordVisibility}
              />
            </div>
            <Input
              className={getPasswordInputClassName(confirmPassword, passwordsMatch)}
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPassword && (
              <p className={`text-xs mt-1 ${passwordsMatch ? 'text-success' : 'text-destructive'}`}>
                {passwordsMatch ? 'Passwords match!' : 'Passwords do not match'}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="h-auto w-full rounded-3xl bg-foreground px-14 py-3 text-background poppins-regular lg:px-32"
            disabled={!hasMinLength || !hasNumber || !hasSymbol || !passwordsMatch}
          >
            Reset Password
          </Button>

          <Button
            type="button"
            onClick={() => navigate('/Login')}
            variant="link"
            className="mt-2 text-foreground poppins-regular"
          >
            Back to Login
          </Button>
        </form>
        {error && <p className="text-destructive text-sm mt-2 poppins-regular">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
