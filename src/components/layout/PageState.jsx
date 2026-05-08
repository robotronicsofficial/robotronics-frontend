import PropTypes from "prop-types";
import { cn } from "../../lib/utils";
import { getHeaderOffsetClass } from "./headerOffset";

const PageState = ({ children, className, message }) => (
  <div className={cn("bg-background pb-20 text-center", getHeaderOffsetClass(), className)}>
    {children || message}
  </div>
);

PageState.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  message: PropTypes.node,
};

export default PageState;
