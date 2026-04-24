import PropTypes from "prop-types";

import { cn } from "../../lib/utils";

const AuthSocialButton = ({ icon, label, onClick, className }) => (
  <button
    type="button"
    className={cn(
      "flex rounded-3xl border border-border bg-background py-3 text-foreground font-bold poppins-regular",
      className,
    )}
    onClick={onClick}
  >
    <img className="h-6 w-8" src={icon} alt="" aria-hidden="true" />
    {label}
  </button>
);

AuthSocialButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default AuthSocialButton;
