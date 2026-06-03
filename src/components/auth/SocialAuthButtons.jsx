import PropTypes from "prop-types";

import facebook from "@/assets/images/Facebooklogo.svg";
import google from "@/assets/images/Googlelogo.svg";
import { startSocialLogin } from "@/utils/authRedirect";
import AuthSocialButton from "./AuthSocialButton";

const SOCIAL_AUTH_PROVIDERS = [
  {
    provider: "facebook",
    icon: facebook,
    label: "Continue with Facebook",
  },
  {
    provider: "google",
    icon: google,
    label: "Continue with Google",
  },
];

const SocialAuthButtons = ({ redirectPath, className = "w-full" }) => (
  <div className="flex flex-col gap-3">
    {SOCIAL_AUTH_PROVIDERS.map((item) => (
      <AuthSocialButton
        key={item.provider}
        className={className}
        icon={item.icon}
        label={item.label}
        onClick={() => startSocialLogin(item.provider, redirectPath)}
      />
    ))}
  </div>
);

SocialAuthButtons.propTypes = {
  redirectPath: PropTypes.string,
  className: PropTypes.string,
};

export default SocialAuthButtons;
