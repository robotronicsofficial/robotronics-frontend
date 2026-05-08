import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

const TONE_CLASS = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  subtle: "text-subtle-foreground",
  inverted: "text-background",
  brand: "text-primary",
};

const DISPLAY_SIZE_CLASS = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
};

const HEADING_LEVEL_CLASS = {
  1: "text-h1",
  2: "text-h2",
  3: "text-h3",
  4: "text-h4",
  5: "text-h5",
};

const TEXT_SIZE_CLASS = {
  lg: "text-body-lg",
  md: "text-body",
  sm: "text-body-sm",
  xs: "text-caption",
};

const TEXT_WEIGHT_CLASS = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
};

const tonePropType = PropTypes.oneOf(Object.keys(TONE_CLASS));

/* ──────────────────────────────────────────────────────────────────
   Display — marketing-grade headlines (above h1). Fluid via clamp().
   ────────────────────────────────────────────────────────────────── */

export const Display = ({
  as: Tag = "h1",
  size = "lg",
  tone = "default",
  className,
  ...props
}) => (
  <Tag
    className={cn("font-sans", DISPLAY_SIZE_CLASS[size], TONE_CLASS[tone], className)}
    {...props}
  />
);

Display.propTypes = {
  as: PropTypes.elementType,
  size: PropTypes.oneOf(Object.keys(DISPLAY_SIZE_CLASS)),
  tone: tonePropType,
  className: PropTypes.string,
};

/* ──────────────────────────────────────────────────────────────────
   Heading — semantic h1–h5. `level` drives both visual size and tag.
   Override the tag with `as` when document outline needs to differ.
   ────────────────────────────────────────────────────────────────── */

export const Heading = ({
  level = 2,
  as,
  tone = "default",
  className,
  ...props
}) => {
  const Tag = as ?? `h${level}`;
  return (
    <Tag
      className={cn("font-sans", HEADING_LEVEL_CLASS[level], TONE_CLASS[tone], className)}
      {...props}
    />
  );
};

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5]),
  as: PropTypes.elementType,
  tone: tonePropType,
  className: PropTypes.string,
};

/* ──────────────────────────────────────────────────────────────────
   Text — body copy. Renders <p> by default; use `as="span"` inline.
   ────────────────────────────────────────────────────────────────── */

export const Text = ({
  as: Tag = "p",
  size = "md",
  weight = "regular",
  tone = "default",
  className,
  ...props
}) => (
  <Tag
    className={cn(
      "font-sans",
      TEXT_SIZE_CLASS[size],
      TEXT_WEIGHT_CLASS[weight],
      TONE_CLASS[tone],
      className,
    )}
    {...props}
  />
);

Text.propTypes = {
  as: PropTypes.elementType,
  size: PropTypes.oneOf(Object.keys(TEXT_SIZE_CLASS)),
  weight: PropTypes.oneOf(Object.keys(TEXT_WEIGHT_CLASS)),
  tone: tonePropType,
  className: PropTypes.string,
};

/* ──────────────────────────────────────────────────────────────────
   Highlight — inline mustard span for keyword emphasis inside headlines.
   `<Heading>Future skills <Highlight>Powered by AI</Highlight></Heading>`
   ────────────────────────────────────────────────────────────────── */

export const Highlight = ({ as: Tag = "span", className, ...props }) => (
  <Tag className={cn("text-primary", className)} {...props} />
);

Highlight.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
};

/* ──────────────────────────────────────────────────────────────────
   Eyebrow — uppercase tracked label that sits above a heading.
   ────────────────────────────────────────────────────────────────── */

export const Eyebrow = ({
  as: Tag = "span",
  tone = "muted",
  className,
  ...props
}) => (
  <Tag
    className={cn("text-eyebrow uppercase", TONE_CLASS[tone], className)}
    {...props}
  />
);

Eyebrow.propTypes = {
  as: PropTypes.elementType,
  tone: tonePropType,
  className: PropTypes.string,
};
