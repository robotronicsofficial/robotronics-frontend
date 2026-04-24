import PropTypes from "prop-types";
import LeftNav from "../../component/dashboard/leftNav";
import { cn } from "../../lib/utils";

const DashboardLayout = ({
  children,
  className,
  contentClassName,
  withHeaderOffset = true,
}) => (
  <div
    className={cn(
      "bg-gray-100 min-h-screen flex flex-col md:flex-row bg-[#ebe5e2] px-4 md:px-20",
      withHeaderOffset && "pt-44 md:pt-2",
      className,
    )}
  >
    <div className="w-full md:w-1/4">
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
  withHeaderOffset: PropTypes.bool,
};

export default DashboardLayout;
