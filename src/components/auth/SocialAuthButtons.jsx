import PropTypes from "prop-types";

import facebook from "@/assets/images/Facebooklogo.svg";
import google from "@/assets/images/Googlelogo.svg";
import { useSocialAuthProviders } from "@/hooks/useSocialAuthProviders";
import { startSocialLogin } from "@/utils/authRedirect";
import AuthSocialButton from "./AuthSocialButton";

const SOCIAL_AUTH_PROVIDER_ICONS = {
  facebook,
  google,
};

const SocialAuthButtons = ({ redirectPath, className = "w-full" }) => {
  const { data: socialAuthProviders = [] } = useSocialAuthProviders();
  const visibleProviders = socialAuthProviders.filter(
    (provider) => provider.enabled && SOCIAL_AUTH_PROVIDER_ICONS[provider.provider],
  );

  if (!visibleProviders.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {visibleProviders.map((item) => (
        <AuthSocialButton
          key={item.provider}
          className={className}
          icon={SOCIAL_AUTH_PROVIDER_ICONS[item.provider]}
          label={`Continue with ${item.label}`}
          onClick={() => startSocialLogin(item.authPath, redirectPath)}
        />
      ))}
    </div>
  );
};

SocialAuthButtons.propTypes = {
  redirectPath: PropTypes.string,
  className: PropTypes.string,
};

export default SocialAuthButtons;
