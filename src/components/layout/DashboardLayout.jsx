import PropTypes from "prop-types";
import LeftNav from "../../component/dashboard/leftNav";
import { cn } from "../../lib/utils";
import { getHeaderOffsetClass } from "./headerOffset";

const DashboardLayout = ({
  children,
  className,
  contentClassName,
  headerOffsetVariant = "dashboard",
  navClassName,
  navProps,
  withHeaderOffset = true,
}) => (
  <div
    className={cn(
      "bg-background min-h-screen flex flex-col md:flex-row px-4 md:px-20",
      withHeaderOffset && getHeaderOffsetClass(headerOffsetVariant),
      className,
    )}
  >
    <div className={cn("w-full md:w-1/4", navClassName)} {...navProps}>
      <LeftNav />
    </div>

    <div className={cn("w-full md:w-3/4 p-4", contentClassName)}>
      {children}
    </div>
  </div>
);

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  headerOffsetVariant: PropTypes.string,
  navClassName: PropTypes.string,
  navProps: PropTypes.object,
  withHeaderOffset: PropTypes.bool,
};

export default DashboardLayout;
