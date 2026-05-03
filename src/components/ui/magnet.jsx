import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import PropTypes from "prop-types";
import { useRef } from "react";

import { cn } from "@/lib/utils";

/* Wraps a child so it slides toward the cursor on pointer-over. The pull
   is fractional (`strength` of the cursor offset) and spring-damped, so
   it reads as a gentle attraction — not a teleport. Useful on primary
   CTAs for tactile feedback without veering into playful. Reduced-motion
   users see a static element. */
export const Magnet = ({ children, className, strength = 0.3 }) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const handleMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
};

Magnet.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  strength: PropTypes.number,
};
