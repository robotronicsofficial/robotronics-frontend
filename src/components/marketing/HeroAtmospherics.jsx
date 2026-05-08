import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

/* Shared dotted-grid backdrop for hero surfaces. Keep it subtle by default;
   stronger decoration should be opted into per page. */

const VARIANTS = {
  grid: { showGrid: true },
  none: { showGrid: false },
};

export const HeroAtmospherics = ({ variant = "grid", className }) => {
  const { showGrid } = VARIANTS[variant];
  return (
    <>
      {showGrid && (
        <div
          aria-hidden="true"
          className={cn("pointer-events-none absolute inset-0 -z-10 opacity-[0.28]", className)}
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      )}
    </>
  );
};

HeroAtmospherics.propTypes = {
  variant: PropTypes.oneOf(Object.keys(VARIANTS)),
  className: PropTypes.string,
};

export default HeroAtmospherics;
