import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

const widths = {
  page: "max-w-7xl",
  reading: "max-w-3xl",
  narrow: "max-w-5xl",
  wide: "max-w-[88rem]",
};

const Container = ({ as: Component = "div", className, width = "page", ...props }) => (
  <Component
    className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", widths[width] || widths.page, className)}
    {...props}
  />
);

Container.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  width: PropTypes.oneOf(Object.keys(widths)),
};

export default Container;
