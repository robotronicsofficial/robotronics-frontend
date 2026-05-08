import PropTypes from "prop-types";

import hide from "../../assets/images/hide.svg";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { cn } from "../../lib/utils";

const PasswordVisibilityButton = ({
  isVisible,
  onToggle,
  className,
  textClassName,
  showIconWhenHidden = false,
}) => (
  <Button
    variant="ghost"
    size="sm"
    className={cn("h-auto w-20 gap-2 px-1 py-0", className)}
    onClick={onToggle}
    type="button"
  >
    {isVisible ? (
      <>
        <img className="h-5 w-5" src={hide} alt="Hide password" />
        <Text as="span" size="xs" className={textClassName}>Hide</Text>
      </>
    ) : (
      <>
        {showIconWhenHidden && (
          <img className="h-5 w-5" src={hide} alt="Show password" />
        )}
        <Text as="span" size="xs" className={textClassName}>Show</Text>
      </>
    )}
  </Button>
);

PasswordVisibilityButton.propTypes = {
  className: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  showIconWhenHidden: PropTypes.bool,
  textClassName: PropTypes.string,
};

export default PasswordVisibilityButton;
