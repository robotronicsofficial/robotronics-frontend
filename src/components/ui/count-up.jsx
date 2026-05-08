import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const formatWithCommas = (n) => Math.round(n).toLocaleString("en-US");

/* Counts from `from` (default 0) up to `to` once the element scrolls into
   view, animating exactly once. Optional `prefix`/`suffix` flank the number;
   the number itself is locale-formatted with commas. Reduced-motion users
   see the final value without animation. */
export const CountUp = ({
  to,
  from = 0,
  duration = 1.6,
  prefix = "",
  suffix = "",
  format = formatWithCommas,
  className,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const value = useMotionValue(from);
  const display = useTransform(value, (latest) => format(latest));
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [isInView, to, duration, value, prefersReducedMotion]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
};

CountUp.propTypes = {
  to: PropTypes.number.isRequired,
  from: PropTypes.number,
  duration: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  format: PropTypes.func,
  className: PropTypes.string,
};
