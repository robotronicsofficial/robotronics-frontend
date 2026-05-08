import { motion, useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

/* Glowing animated outline for a card. A conic-gradient blob rotates behind
   the wrapped element; the inner content (its own bg-card surface) blocks
   out the gradient's interior, so only a thin halo peeks past the edges.
   Wrap any element with a solid background and matching radius — pass that
   radius via `className`. Reduced-motion users see a static halo. */
export const StarBorder = ({
  children,
  className,
  duration = 6,
  glow = "var(--color-primary)",
  inset = 2,
}) => {
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative isolate", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0 overflow-hidden rounded-[inherit]"
        style={{ inset: -inset }}
      >
        <motion.div
          className="absolute inset-[-50%] blur-[6px]"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${glow} 50deg, transparent 130deg, transparent 230deg, ${glow} 310deg, transparent 360deg)`,
          }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={
            reduced
              ? undefined
              : { duration, ease: "linear", repeat: Infinity }
          }
        />
      </div>
      <div className="relative z-10 rounded-[inherit]">{children}</div>
    </div>
  );
};

StarBorder.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  duration: PropTypes.number,
  glow: PropTypes.string,
  inset: PropTypes.number,
};
