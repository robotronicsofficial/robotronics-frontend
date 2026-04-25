import { useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import PropTypes from "prop-types";
import AppImage from "../component/AppImage";
import robot from "../assets/images/shopRobot.webp";
import facebook from "../assets/images/Facebooklogo.svg";
import google from "../assets/images/Googlelogo.svg";
import AuthSocialButton from "../components/auth/AuthSocialButton";
import PasswordVisibilityButton from "../components/auth/PasswordVisibilityButton";
import { getPasswordInputClassName } from "../components/auth/passwordInputClass";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { resolveBackendUrl } from "../lib/api";
import { useRegisterMutation } from "../hooks/useAuthMutations";
import {
  getPasswordValidationState,
  hasValidPasswordRequirements,
  PASSWORD_POLICY_MESSAGE,
} from "../utils/passwordPolicy";
import {
  buildAuthRedirectSearch,
  getSafeRedirectPath,
  savePostAuthRedirect,
} from "../utils/authRedirect";

const Signup = () => {
  const registerMutation = useRegisterMutation();
  const search = useSearch({ strict: false });
  const redirectPath = getSafeRedirectPath(search.redirect);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const passwordErrors = getPasswordValidationState(
    formData.password,
    formData.confirmPassword,
  );

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({
      ...prev,
      phoneNumber: value
    }));
  };

  const validateForm = () => {
    if (!hasValidPasswordRequirements(passwordErrors)) {
      toast.error(PASSWORD_POLICY_MESSAGE);
      return false;
    }

    if (!passwordErrors.match) {
      toast.error("Passwords do not match");
      return false;
    }

    if (!isCheckboxChecked) {
      toast.error("Please agree to the Terms of Use and Privacy Policy");
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      await registerMutation.mutateAsync({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phoneNumber,
        password: formData.password
      });

      savePostAuthRedirect(redirectPath);
      toast.success("Email sent successfully! Please verify your email.");
    } catch (error) {
      toast.error(error.message);
    }

  };

  const handleSocialLogin = (provider) => {
    window.location.assign(resolveBackendUrl(`/auth/${provider}`));
  };

  const passwordMeetsPolicy = passwordErrors.length && passwordErrors.number && passwordErrors.symbol;

  return (
    <div className="signin" id="signin">
      <div className="flex flex-col gap-8 px-6 py-10 md:px-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:px-16 lg:py-40">
        <div className="hidden lg:flex lg:flex-col lg:gap-6">
          <div className="flex flex-col items-start gap-5">
            <p
              className="text-6xl text-background text-wrap poppins-bold"
              data-aos="fade-up"
            >
              Robotics
            </p>
            <p
              className="text-2xl poppins-light text-background"
              data-aos="fade-up"
            >
              Access to courses and <br /> Products
            </p>
          </div>
          <div className="flex items-end">
            <AppImage
              className="w-full items-end"
              src={robot}
              alt="Robotronics signup illustration"
              loading="eager"
              data-aos="fade-up"
            />
          </div>
          <div
            className="w-full border border-border"
            data-aos="fade-up"
          ></div>
        </div>
        <div
          className="mt-header-auth flex flex-col md:mt-0"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-3">
            <p className="md:text-3xl text-2xl font-bold pb-2 lg:pb-5 poppins-bold">
              Sign Up Now
            </p>
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
              <div className="flex flex-1 flex-col gap-1">
                <Label className="text-sm poppins-regular">First name</Label>
                <Input
                  className="h-auto rounded-xl bg-background px-3 py-2"
                  name="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <Label className="text-sm poppins-regular">Last name</Label>
                <Input
                  className="h-auto rounded-xl bg-background px-3 py-2"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-sm poppins-regular">Email address</Label>
              <Input
                className="h-auto rounded-xl bg-background px-3 py-2"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-sm poppins-regular">Phone number</Label>
              <div className="relative">
                <PhoneInput
                  international
                  defaultCountry="PK"
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  numberInputProps={{
                    className: "border border-border rounded-xl p-2 pl-14 bg-background w-full focus:outline-none focus:ring-0 focus:border-border text-base",
                    autoComplete: "tel",
                    type: "tel"
                  }}
                  countrySelectProps={{
                    className: "absolute left-0 top-0 h-full flex items-center pl-2 touch-manipulation",
                    dropdownClass: "absolute z-dropdown max-h-60 overflow-y-auto bg-card shadow-lg border border-border rounded-md w-60 max-w-full mt-1",
                    buttonClass: "flex items-center justify-center h-full px-2 focus:outline-none"
                  }}
                  className="phone-input relative w-full"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <Label className="text-sm poppins-regular">Password</Label>
                <PasswordVisibilityButton
                  isVisible={showPassword}
                  onToggle={togglePasswordVisibility}
                />
              </div>
              <Input
                className={getPasswordInputClassName(formData.password, passwordMeetsPolicy)}
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <RequirementCheck
                  isValid={passwordErrors.length}
                  text="8+ characters"
                />
                <RequirementCheck
                  isValid={passwordErrors.number}
                  text="Contain at least one Number"
                />
                <RequirementCheck
                  isValid={passwordErrors.symbol}
                  text="Contain at least one symbol"
                />
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm poppins-regular">Confirm Password</Label>
                <PasswordVisibilityButton
                  isVisible={showConfirmPassword}
                  onToggle={toggleConfirmPasswordVisibility}
                />
              </div>
              <Input
                className={getPasswordInputClassName(formData.confirmPassword, passwordErrors.match)}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {formData.confirmPassword && (
                <p className={`text-xs mt-1 ${passwordErrors.match ? 'text-success' : 'text-destructive'
                  }`}>
                  {passwordErrors.match ? 'Passwords match!' : 'Passwords do not match'}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 lg:gap-3">
              <div className="flex items-center py-5">
                <Checkbox
                  id="terms-checkbox"
                  checked={isCheckboxChecked}
                  onCheckedChange={(checked) => setIsCheckboxChecked(Boolean(checked))}
                />
                <Label
                  htmlFor="terms-checkbox"
                  className="ms-2 text-sm font-medium text-muted-foreground text-wrap"
                >
                  By creating an account, I agree to our{" "}
                  <Link to="/TermsConditions" className="underline underline-offset-4">
                    Terms of use
                  </Link>{" "}
                  and{" "}
                  <Link to="/PrivacyPolicy" className="underline underline-offset-4">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              <Button
                className="h-auto w-full rounded-3xl bg-foreground px-5 py-2 text-primary"
                onClick={handleSignUp}
                disabled={!isCheckboxChecked || registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <>
                    <Spinner />
                    Creating account…
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                to="/Login"
                search={buildAuthRedirectSearch(redirectPath)}
                className="underline underline-offset-4"
              >
                Log in
              </Link>
            </p>
          </div>
          <div className="flex flex-col lg:py-10 py-5">
            <div className="flex items-center justify-center">
              <Separator className="w-52" />
              <p className=" text-xl poppins-semibold p-2">OR</p>
              <Separator className="w-52" />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 py-10 lg:gap-4 lg:py-20">
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
          </div>
        </div>
      </div>
    </div>
  );
};

const RequirementCheck = ({ isValid, text }) => (
  <div className="flex items-center gap-2">
    <Badge variant={isValid ? "default" : "destructive"} className="size-4 rounded-full p-0" />
    <span className={`text-xs ${isValid ? "text-success" : "text-destructive"}`}>
      {text}
    </span>
  </div>
);

RequirementCheck.propTypes = {
  isValid: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Signup;
