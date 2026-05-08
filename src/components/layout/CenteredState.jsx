import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

const CenteredState = ({ children, className, contentClassName }) => (
  <div className={cn("flex items-center justify-center", className)}>
    {contentClassName ? (
      <div className={contentClassName}>{children}</div>
    ) : (
      children
    )}
  </div>
);

CenteredState.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
};

export default CenteredState;
