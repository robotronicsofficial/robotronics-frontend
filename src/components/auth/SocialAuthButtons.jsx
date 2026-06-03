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

const SOCIAL_AUTH_UNAVAILABLE_MESSAGE = "Social login is unavailable right now.";

const buildVisibleProviders = (providers = []) => (
  providers
    .filter((provider) => provider.enabled)
    .map((provider) => {
      const icon = SOCIAL_AUTH_PROVIDER_ICONS[provider.provider];
      if (!icon) {
        throw new Error(`Unsupported social auth provider: ${provider.provider}`);
      }

      return {
        ...provider,
        icon,
      };
    })
);

const SocialAuthButtons = ({ redirectPath, className = "w-full" }) => {
  const {
    data: socialAuthProviders,
    isError,
  } = useSocialAuthProviders();

  if (isError) {
    return (
      <p className="text-center text-sm text-destructive" role="alert">
        {SOCIAL_AUTH_UNAVAILABLE_MESSAGE}
      </p>
    );
  }

  let visibleProviders;

  try {
    visibleProviders = buildVisibleProviders(socialAuthProviders);
  } catch {
    return (
      <p className="text-center text-sm text-destructive" role="alert">
        {SOCIAL_AUTH_UNAVAILABLE_MESSAGE}
      </p>
    );
  }

  if (!visibleProviders.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {visibleProviders.map((item) => (
        <AuthSocialButton
          key={item.provider}
          className={className}
          icon={item.icon}
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
