import { useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PropTypes from "prop-types";
import { Check, GraduationCap, Users, X } from "lucide-react";

import facebook from "../assets/images/Facebooklogo.svg";
import google from "../assets/images/Googlelogo.svg";
import AuthShell from "@/components/auth/AuthShell";
import AuthSocialButton from "@/components/auth/AuthSocialButton";
import PasswordVisibilityButton from "@/components/auth/PasswordVisibilityButton";
import { getPasswordInputClassName } from "@/components/auth/passwordInputClass";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Display, Text } from "@/components/ui/typography";
import { resolveBackendUrl } from "../lib/api";
import { useRegisterMutation } from "../hooks/useAuthMutations";
import {
  getPasswordValidationState,
  hasValidPasswordRequirements,
  PASSWORD_POLICY_MESSAGE,
} from "../utils/passwordPolicy";
import {
  buildAuthRedirectQuery,
  buildAuthRedirectSearch,
  getSafeRedirectPath,
  savePostAuthRedirect,
} from "../utils/authRedirect";
import { cn } from "@/lib/utils";

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
    <Text
      size="xs"
      className={isValid ? "text-success" : "text-muted-foreground"}
    >
      {text}
    </Text>
  </div>
);

RequirementCheck.propTypes = {
  isValid: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

const FieldLabel = ({ htmlFor, children, action }) => (
  <div className="flex items-center justify-between">
    <Label htmlFor={htmlFor}>{children}</Label>
    {action}
  </div>
);

const ROLES = [
  {
    value: "parent",
    icon: Users,
    title: "I'm a parent",
    description: "Set up learning for one or more kids at home.",
  },
  {
    value: "school",
    icon: GraduationCap,
    title: "I'm with a school",
    description: "Roll out AI / Coding / Robotics for your classrooms.",
  },
];

const RolePicker = ({ value, onChange }) => (
  <fieldset className="grid grid-cols-1 gap-3 md:grid-cols-2">
    <legend className="sr-only">Account type</legend>
    {ROLES.map((role) => {
      const Icon = role.icon;
      const isSelected = value === role.value;
      return (
        <label
          key={role.value}
          className={cn(
            "flex cursor-pointer flex-col gap-2 rounded-2xl border bg-card p-4 text-left transition-colors",
            isSelected
              ? "border-primary ring-2 ring-primary/30 bg-primary-soft"
              : "border-border hover:border-foreground",
          )}
        >
          <input
            type="radio"
            name="accountType"
            value={role.value}
            checked={isSelected}
            onChange={() => onChange(role.value)}
            className="sr-only"
          />
          <span
            aria-hidden="true"
            className={cn(
              "grid size-9 place-items-center rounded-xl",
              isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
            )}
          >
            <Icon className="size-4" />
          </span>
          <Text size="sm" weight="semibold">
            {role.title}
          </Text>
          <Text size="xs" tone="muted">
            {role.description}
          </Text>
        </label>
      );
    })}
  </fieldset>
);

RolePicker.propTypes = {
  value: PropTypes.oneOf(["parent", "school"]).isRequired,
  onChange: PropTypes.func.isRequired,
};

const Signup = () => {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();
  const search = useSearch({ strict: false });
  const redirectPath = getSafeRedirectPath(search.redirect);
  const [role, setRole] = useState("parent");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const passwordErrors = getPasswordValidationState(
    formData.password,
    formData.confirmPassword,
  );
  const passwordMeetsPolicy =
    passwordErrors.length && passwordErrors.number && passwordErrors.symbol;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
  };

  const validateForm = () => {
    if (!hasValidPasswordRequirements(passwordErrors)) {
      toast.error(PASSWORD_POLICY_MESSAGE);
      return false;
    }
    if (!passwordErrors.match) {
      toast.error("Passwords do not match.");
      return false;
    }
    if (!isCheckboxChecked) {
      toast.error("Please agree to the Terms of Use and Privacy Policy.");
      return false;
    }
    return true;
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      await registerMutation.mutateAsync({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phoneNumber,
        password: formData.password,
      });
      savePostAuthRedirect(redirectPath);
      toast.success("Verification email sent. Check your inbox to continue.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSocialLogin = (provider) => {
    if (redirectPath) savePostAuthRedirect(redirectPath);
    window.location.assign(resolveBackendUrl(`/auth/${provider}${buildAuthRedirectQuery(redirectPath)}`));
  };

  if (role === "school") {
    return (
      <AuthShell>
        <header className="flex flex-col items-center gap-2 text-center">
          <Display size="md">Schools have their own onboarding</Display>
          <Text tone="muted" className="max-w-md">
            We tailor pricing, rollout, and teacher accounts based on your
            student count. Skip the personal signup and tell us about your
            school instead.
          </Text>
        </header>

        <RolePicker value={role} onChange={setRole} />

        <div className="flex flex-col gap-3">
          <Button
            type="button"
            size="marketing"
            className="w-full"
            onClick={() => navigate({ to: "/for-schools" })}
          >
            Go to schools onboarding
          </Button>
          <Button
            type="button"
            variant="outline"
            size="marketing"
            className="w-full"
            onClick={() => setRole("parent")}
          >
            Actually, I'm a parent
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <header className="flex flex-col items-center gap-2 text-center">
        <Display size="md">Create your account</Display>
        <Text tone="muted">
          One subscription unlocks every future skill for your child.
        </Text>
      </header>

      <RolePicker value={role} onChange={setRole} />

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

      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <FieldLabel htmlFor="firstName">First name</FieldLabel>
            <Input
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <FieldLabel htmlFor="lastName">Last name</FieldLabel>
            <Input
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="email">Email address</FieldLabel>
          <Input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="phone">Phone number</FieldLabel>
          <PhoneInput
            international
            defaultCountry="PK"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            numberInputProps={{
              id: "phone",
              className:
                "w-full rounded-md border border-border bg-background p-2 pl-14 text-base focus:outline-none focus:ring-2 focus:ring-ring/40",
              autoComplete: "tel",
              type: "tel",
              required: true,
            }}
            countrySelectProps={{
              className:
                "absolute left-0 top-0 flex h-full items-center pl-2 touch-manipulation",
              dropdownClass:
                "absolute z-dropdown mt-1 max-h-60 w-60 max-w-full overflow-y-auto rounded-md border border-border bg-card shadow-lg",
              buttonClass:
                "flex h-full items-center justify-center px-2 focus:outline-none",
            }}
            className="phone-input relative w-full"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel
            htmlFor="password"
            action={
              <PasswordVisibilityButton
                isVisible={showPassword}
                onToggle={() => setShowPassword((p) => !p)}
              />
            }
          >
            Password
          </FieldLabel>
          <Input
            id="password"
            className={getPasswordInputClassName(formData.password, passwordMeetsPolicy)}
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="mt-1 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            <RequirementCheck isValid={passwordErrors.length} text="8+ characters" />
            <RequirementCheck isValid={passwordErrors.number} text="At least one number" />
            <RequirementCheck isValid={passwordErrors.symbol} text="At least one symbol" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel
            htmlFor="confirmPassword"
            action={
              <PasswordVisibilityButton
                isVisible={showConfirmPassword}
                onToggle={() => setShowConfirmPassword((p) => !p)}
              />
            }
          >
            Confirm password
          </FieldLabel>
          <Input
            id="confirmPassword"
            className={getPasswordInputClassName(formData.confirmPassword, passwordErrors.match)}
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {formData.confirmPassword && (
            <Text
              size="xs"
              className={passwordErrors.match ? "text-success" : "text-destructive"}
            >
              {passwordErrors.match ? "Passwords match." : "Passwords do not match."}
            </Text>
          )}
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="terms-checkbox"
            checked={isCheckboxChecked}
            onCheckedChange={(checked) => setIsCheckboxChecked(Boolean(checked))}
          />
          <Label htmlFor="terms-checkbox" className="cursor-pointer">
            <span>
              By creating an account, I agree to the{" "}
              <Link to="/TermsConditions" className="text-foreground underline underline-offset-4">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link to="/PrivacyPolicy" className="text-foreground underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </span>
          </Label>
        </div>

        <Button
          type="submit"
          size="marketing"
          className="w-full"
          disabled={!isCheckboxChecked || registerMutation.isPending}
        >
          {registerMutation.isPending ? (
            <>
              <Spinner />
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <Text tone="muted" size="sm" className="text-center">
        Already have an account?{" "}
        <Link
          to="/Login"
          search={buildAuthRedirectSearch(redirectPath)}
          className="text-foreground underline underline-offset-4"
        >
          Log in
        </Link>
      </Text>
    </AuthShell>
  );
};

export default Signup;
