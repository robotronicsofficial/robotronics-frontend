import { motion, useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

export const ShinyText = ({
  children,
  className,
  duration = 4.5,
  repeatDelay = 1.8,
}) => {
  const reduced = useReducedMotion();

  return (
    <motion.span
      className={cn("inline-block text-primary", className)}
      animate={reduced ? undefined : { opacity: [1, 0.82, 1] }}
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
  duration: PropTypes.number,
  repeatDelay: PropTypes.number,
};
