import PropTypes from "prop-types";

import { cn } from "@/lib/utils";
import Container from "./Container";

const spacing = {
  default: "py-16 md:py-24",
  compact: "py-10 md:py-14",
  spacious: "py-20 md:py-32",
};

const Section = ({
  as: Component = "section",
  children,
  className,
  containerClassName,
  spacing: spacingKey = "default",
  width = "page",
  ...props
}) => (
  <Component className={cn(spacing[spacingKey] || spacing.default, className)} {...props}>
    <Container className={containerClassName} width={width}>
      {children}
    </Container>
  </Component>
);

Section.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  spacing: PropTypes.oneOf(Object.keys(spacing)),
  width: PropTypes.oneOf(["page", "reading", "narrow", "wide"]),
};

export default Section;
