import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/* A small wheeled bot. Wheels rotate continuously (cross-spokes inside
   each tire so the motion actually reads), antenna LED pulses, the body
   bobs by a single px so the whole thing feels alive without looking
   like it's vibrating. Pure SVG — no asset, no shader, no third-party
   illustration library. */
const Wheel = ({ cx, animating }) => (
  <motion.g
    style={{ originX: `${cx}px`, originY: "82px", transformBox: "fill-box" }}
    animate={animating ? { rotate: 360 } : { rotate: 0 }}
    transition={
      animating
        ? { ease: "linear", duration: 2.4, repeat: Infinity }
        : { duration: 0 }
    }
  >
    <circle cx={cx} cy="82" r="9" className="fill-foreground" />
    <line
      x1={cx}
      y1="75"
      x2={cx}
      y2="89"
      className="stroke-background"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1={cx - 7}
      y1="82"
      x2={cx + 7}
      y2="82"
      className="stroke-background"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </motion.g>
);

export const RobotVignette = ({ className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "100px" });
  const reduced = useReducedMotion();
  const animating = inView && !reduced;

  return (
    <div
      ref={ref}
      className={cn("flex w-full items-center justify-center", className)}
    >
      <svg
        viewBox="0 0 140 110"
        className="h-full w-full max-w-[14rem]"
        aria-label="Animated robot"
        role="img"
      >
        <motion.g
          animate={animating ? { y: [0, -1, 0] } : { y: 0 }}
          transition={
            animating ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }
          }
        >
          {/* antenna */}
          <line
            x1="70"
            y1="14"
            x2="70"
            y2="28"
            className="stroke-foreground"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <motion.circle
            cx="70"
            cy="12"
            r="4"
            className="fill-primary"
            animate={animating ? { opacity: [1, 0.35, 1] } : { opacity: 1 }}
            transition={
              animating
                ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0 }
            }
          />

          {/* body */}
          <rect
            x="32"
            y="28"
            width="76"
            height="44"
            rx="10"
            className="fill-card stroke-foreground"
            strokeWidth="2"
          />

          {/* eyes */}
          <circle cx="55" cy="48" r="4" className="fill-foreground" />
          <circle cx="85" cy="48" r="4" className="fill-foreground" />

          {/* mouth */}
          <path
            d="M 55 60 Q 70 66, 85 60"
            className="stroke-foreground"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* arms */}
          <line
            x1="32"
            y1="44"
            x2="22"
            y2="50"
            className="stroke-foreground"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="108"
            y1="44"
            x2="118"
            y2="50"
            className="stroke-foreground"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* axle */}
          <line
            x1="40"
            y1="82"
            x2="100"
            y2="82"
            className="stroke-foreground/70"
            strokeWidth="1.5"
          />
        </motion.g>

        {/* wheels live outside the bobbing group so the body floats slightly
            relative to the ground, like it's hovering on suspension */}
        <Wheel cx={42} animating={animating} />
        <Wheel cx={98} animating={animating} />
      </svg>
    </div>
  );
};
