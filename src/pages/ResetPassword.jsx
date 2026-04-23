import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hide from "../assets/images/hide.svg";

import { sendJson } from "../lib/api";
import {
  getPasswordValidationState,
  hasValidPasswordRequirements,
  PASSWORD_POLICY_MESSAGE,
} from "../utils/passwordPolicy";

const RequirementCheck = ({ isValid, text }) => (
  <div className="flex items-center">
    <span className={`inline-block w-4 h-4 rounded-full mr-2 ${isValid ? 'bg-green-500' : 'bg-red-500'}`}></span>
    <span className={`text-xs ${isValid ? 'text-green-500' : 'text-red-500'}`}>{text}</span>
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
      await sendJson('/auth/reset-password', {
        method: "POST",
        body: { token, password },
      });

      toast.success("Password reset successfully!");
      setTimeout(() => navigate("/Login"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
      console.error("Reset password error:", err);
    }
  };

  return (
    <div className="bg-gray" id="reset-password">
      <div className="flex flex-col items-center justify-center pt-44 pb-20">
        <p className="text-4xl poppins-bold text-brown">Reset Password</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4 w-full max-w-md"
        >
          <div className="w-full">
            <div className="flex flex-row justify-between items-center">
              <p className="text-sm poppins-light">New Password</p>
              <button
                className="flex items-center justify-center space-x-2 w-20"
                onClick={togglePasswordVisibility}
                type="button"
              >
                {showPassword ? (
                  <>
                    <img className="h-5 w-5" src={hide} alt="Hide password" />
                    <p className="text-sm poppins-light">Hide</p>
                  </>
                ) : (
                  <p className="text-sm poppins-light">Show</p>
                )}
              </button>
            </div>
            <input
              className={`border rounded-xl p-2 bg-gray w-full ${
                password ? (hasMinLength && hasNumber && hasSymbol) 
                  ? 'border-green-500' 
                  : 'border-red-500' 
                : 'border-line'
              }`}
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
            <div className="flex flex-row justify-between items-center">
              <p className="text-sm poppins-light">Confirm Password</p>
              <button
                className="flex items-center justify-center space-x-2 w-20"
                onClick={toggleConfirmPasswordVisibility}
                type="button"
              >
                {showConfirmPassword ? (
                  <>
                    <img className="h-5 w-5" src={hide} alt="Hide password" />
                    <p className="text-sm poppins-light">Hide</p>
                  </>
                ) : (
                  <p className="text-sm poppins-light">Show</p>
                )}
              </button>
            </div>
            <input
              className={`border rounded-xl p-2 bg-gray w-full ${
                confirmPassword 
                  ? passwordsMatch 
                    ? 'border-green-500' 
                    : 'border-red-500' 
                  : 'border-line'
              }`}
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPassword && (
              <p className={`text-xs mt-1 ${passwordsMatch ? 'text-green-500' : 'text-red-500'}`}>
                {passwordsMatch ? 'Passwords match!' : 'Passwords do not match'}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-brown border border-line text-white poppins-regular rounded-3xl py-3 lg:px-32 px-14 w-full"
            disabled={!hasMinLength || !hasNumber || !hasSymbol || !passwordsMatch}
          >
            Reset Password
          </button>

          <button
            type="button"
            onClick={() => navigate('/Login')}
            className="text-brown underline mt-2 poppins-regular"
          >
            Back to Login
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2 poppins-regular">{error}</p>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
