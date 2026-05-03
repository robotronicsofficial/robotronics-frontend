import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PasswordVisibilityButton from "@/components/auth/PasswordVisibilityButton";
import { getPasswordInputClassName } from "@/components/auth/passwordInputClass";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Display, Text } from "@/components/ui/typography";
import { useResetPasswordMutation } from "../hooks/useAuthMutations";
import { getHeaderOffsetClass } from "@/components/layout/headerOffset";
import {
  getPasswordValidationState,
  hasValidPasswordRequirements,
  PASSWORD_POLICY_MESSAGE,
} from "../utils/passwordPolicy";

const RequirementCheck = ({ isValid, text }) => (
  <div className="flex items-center gap-2">
    <Badge variant={isValid ? "default" : "destructive"} className="size-4 rounded-full p-0" />
    <Text size="xs" tone={isValid ? "default" : "default"} className={isValid ? "text-success" : "text-destructive"}>
      {text}
    </Text>
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
  const search = useSearch({ strict: false });
  const token = search.token;
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
      setTimeout(() => navigate({ to: "/Login" }), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
      console.error("Reset password error:", err);
    }
  };

  return (
    <div className="bg-background" id="reset-password">
      <div className={getHeaderOffsetClass("mx-auto flex w-full max-w-md flex-col items-center gap-6 px-6 pb-20 md:px-10 lg:px-16")}>
        <div className="flex flex-col items-center gap-2 text-center">
          <Display size="md">Reset password</Display>
          <Text tone="muted">Choose a new password to sign back in.</Text>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label>New password</Label>
              <PasswordVisibilityButton
                isVisible={showPassword}
                onToggle={togglePasswordVisibility}
              />
            </div>
            <Input
              className={getPasswordInputClassName(password, hasMinLength && hasNumber && hasSymbol)}
              type={showPassword ? "text" : "password"}
              name="new-password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="mt-2 grid grid-cols-2 gap-2">
              <RequirementCheck isValid={hasMinLength} text="8+ characters" />
              <RequirementCheck isValid={hasNumber} text="Contains number" />
              <RequirementCheck isValid={hasSymbol} text="Contains symbol" />
            </div>
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label>Confirm password</Label>
              <PasswordVisibilityButton
                isVisible={showConfirmPassword}
                onToggle={toggleConfirmPasswordVisibility}
              />
            </div>
            <Input
              className={getPasswordInputClassName(confirmPassword, passwordsMatch)}
              type={showConfirmPassword ? "text" : "password"}
              name="confirm-password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPassword && (
              <Text size="xs" className={passwordsMatch ? "text-success" : "text-destructive"}>
                {passwordsMatch ? "Passwords match" : "Passwords do not match"}
              </Text>
            )}
          </div>

          <Button
            type="submit"
            size="marketing"
            className="w-full"
            disabled={
              resetPasswordMutation.isPending ||
              !password ||
              !confirmPassword ||
              !hasMinLength ||
              !hasNumber ||
              !hasSymbol
            }
          >
            {resetPasswordMutation.isPending ? "Resetting…" : "Reset password"}
          </Button>

          <Button
            type="button"
            onClick={() => navigate({ to: "/Login" })}
            variant="link"
          >
            Back to login
          </Button>
        </form>
        {error && (
          <Text role="alert" size="sm" className="text-destructive">
            {error}
          </Text>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
