import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

/* Inverse band — black background, white text. Used sparingly for the
   final-CTA section and the footer surface. The mustard CTA on top of
   this provides the high-contrast moment the brand brief calls out. */
export const SectionInverse = ({ as: Tag = "section", className, ...props }) => (
  <Tag
    data-tone="inverse"
    className={cn("bg-foreground text-background", className)}
    {...props}
  />
);

SectionInverse.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
};
