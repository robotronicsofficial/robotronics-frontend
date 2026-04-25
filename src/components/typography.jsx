import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

const headingVariants = {
  hero: "font-title text-display font-bold tracking-normal text-foreground md:text-[3.5rem] md:leading-[4rem]",
  page: "font-title text-display-sm font-bold tracking-normal text-foreground md:text-display",
  section: "font-title text-title font-semibold tracking-normal text-foreground md:text-display-sm",
  card: "font-title text-lg font-semibold tracking-normal text-foreground",
};

const textVariants = {
  lead: "font-title text-lead font-normal text-muted-foreground",
  body: "font-title text-body font-normal text-foreground",
  muted: "font-title text-body-sm font-normal text-muted-foreground",
  caption: "font-title text-caption font-medium uppercase text-muted-foreground",
};

export const Heading = ({
  as: Component = "h2",
  className,
  variant = "section",
  ...props
}) => (
  <Component
    className={cn(headingVariants[variant] || headingVariants.section, className)}
    {...props}
  />
);

Heading.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(headingVariants)),
};

export const Text = ({
  as: Component = "p",
  className,
  variant = "body",
  ...props
}) => (
  <Component
    className={cn(textVariants[variant] || textVariants.body, className)}
    {...props}
  />
);

Text.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(textVariants)),
};
