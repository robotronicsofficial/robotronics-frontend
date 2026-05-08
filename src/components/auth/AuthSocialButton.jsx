import PropTypes from "prop-types";

import { Button } from "@/components/ui/button";
import { cn } from "../../lib/utils";

const AuthSocialButton = ({ icon, label, onClick, className }) => (
  <Button
    type="button"
    variant="outline"
    size="lg"
    className={cn(
      "h-auto rounded-3xl bg-background py-3 text-foreground font-bold ",
      className,
    )}
    onClick={onClick}
  >
    <img className="h-6 w-8" src={icon} alt="" aria-hidden="true" />
    {label}
  </Button>
);

AuthSocialButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default AuthSocialButton;
