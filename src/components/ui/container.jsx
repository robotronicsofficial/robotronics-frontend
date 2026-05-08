import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

const SIZE_CLASS = {
  narrow: "max-w-shell-narrow",
  default: "max-w-shell",
  wide: "max-w-shell-wide",
  full: "max-w-none",
};

export const Container = ({
  as: Tag = "div",
  size = "default",
  className,
  ...props
}) => (
  <Tag
    className={cn("mx-auto w-full px-6 lg:px-8", SIZE_CLASS[size], className)}
    {...props}
  />
);

Container.propTypes = {
  as: PropTypes.elementType,
  size: PropTypes.oneOf(Object.keys(SIZE_CLASS)),
  className: PropTypes.string,
};
