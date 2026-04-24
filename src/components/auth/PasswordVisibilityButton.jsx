import PropTypes from "prop-types";

import hide from "../../assets/images/hide.svg";
import { cn } from "../../lib/utils";

const PasswordVisibilityButton = ({
  isVisible,
  onToggle,
  className,
  textClassName,
  showIconWhenHidden = false,
}) => (
  <button
    className={cn("flex w-20 items-center justify-center gap-2", className)}
    onClick={onToggle}
    type="button"
  >
    {isVisible ? (
      <>
        <img className="h-5 w-5" src={hide} alt="Hide password" />
        <p className={cn("text-sm poppins-light", textClassName)}>Hide</p>
      </>
    ) : (
      <>
        {showIconWhenHidden && (
          <img className="h-5 w-5" src={hide} alt="Show password" />
        )}
        <p className={cn("text-sm poppins-light", textClassName)}>Show</p>
      </>
    )}
  </button>
);

PasswordVisibilityButton.propTypes = {
  className: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  showIconWhenHidden: PropTypes.bool,
  textClassName: PropTypes.string,
};

export default PasswordVisibilityButton;
