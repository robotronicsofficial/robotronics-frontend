import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

const PageState = ({ children, className, message }) => (
  <div className={cn("bg-background pt-44 pb-20 text-center", className)}>
    {children || message}
  </div>
);

PageState.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  message: PropTypes.node,
};

export default PageState;
