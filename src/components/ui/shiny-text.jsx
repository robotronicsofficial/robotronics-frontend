import { motion, useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

/* Sweeps a soft highlight across the contained text. The default gradient
   assumes the text is mustard (matches <Highlight>); pass `gradient` to
   override. Animates `background-position` only — cheap, GPU-friendly. The
   sweep loops with a long pause between passes so it reads as a quiet
   accent, not a strobe. */
export const ShinyText = ({
  children,
  className,
  gradient,
  duration = 4.5,
  repeatDelay = 1.8,
}) => {
  const reduced = useReducedMotion();
  const bg =
    gradient ??
    "linear-gradient(110deg, var(--color-primary) 35%, color-mix(in oklab, var(--color-primary) 35%, white 65%) 50%, var(--color-primary) 65%)";

  return (
    <motion.span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: bg,
        backgroundSize: "300% 100%",
        backgroundPosition: "100% 0",
      }}
      animate={reduced ? undefined : { backgroundPosition: ["100% 0", "-100% 0"] }}
      transition={
        reduced
          ? undefined
          : { duration, ease: "linear", repeat: Infinity, repeatDelay }
      }
    >
      {children}
    </motion.span>
  );
};

ShinyText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  gradient: PropTypes.string,
  duration: PropTypes.number,
  repeatDelay: PropTypes.number,
};
