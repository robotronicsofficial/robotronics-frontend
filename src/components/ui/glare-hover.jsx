import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";

import { cn } from "@/lib/utils";

/* Soft glare that follows the cursor across a card surface. Pass card chrome
   (border, bg, rounded, sizing, layout) via `className`; the glare overlay
   sits above the children with `mix-blend-mode: soft-light` so it warms the
   card without obscuring text. Reduced-motion users see a static surface. */
export const GlareHover = ({
  as: Tag = "div",
  children,
  className,
  glareColor = "var(--color-primary-soft)",
  intensity = 0.6,
  size = 280,
  ...rest
}) => {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(50);
  const y = useMotionValue(50);

  const handleMove = (e) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width) * 100);
    y.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}% ${y}%, ${glareColor}, transparent 70%)`;

  return (
    <Tag
      onPointerEnter={() => !reduced && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={handleMove}
      className={cn("relative isolate overflow-hidden", className)}
      {...rest}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background, mixBlendMode: "soft-light" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? intensity : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </Tag>
  );
};

GlareHover.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  glareColor: PropTypes.string,
  intensity: PropTypes.number,
  size: PropTypes.number,
};
