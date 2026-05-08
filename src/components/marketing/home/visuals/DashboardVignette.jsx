import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const SUBJECTS = [
  { label: "Coding", value: 92 },
  { label: "AI", value: 78 },
  { label: "Robotics", value: 64 },
  { label: "Math", value: 50 },
];

const LOOP_DURATION = 6;

/* Mini parent dashboard preview. Each subject bar fills to its target,
   holds, then drains back so a viewer who scrolls into view at any
   point still catches the motion. Stagger across rows reads as the
   dashboard "loading in" rather than four bars hitting in unison. */
export const DashboardVignette = ({ className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "100px" });
  const reduced = useReducedMotion();
  const animating = inView && !reduced;

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-caption font-semibold uppercase tracking-wide text-muted-foreground">
          Aisha · this week
        </span>
        <span className="text-caption font-semibold tabular-nums text-foreground">
          4h 12m
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        {SUBJECTS.map((subject, index) => {
          const targetWidth = `${subject.value}%`;
          return (
            <div key={subject.label} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between">
                <span className="text-caption font-medium text-foreground">
                  {subject.label}
                </span>
                <span className="text-caption tabular-nums text-muted-foreground">
                  {subject.value}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={
                    animating
                      ? { width: ["0%", targetWidth, targetWidth, "0%"] }
                      : { width: reduced ? targetWidth : "0%" }
                  }
                  transition={
                    animating
                      ? {
                          duration: LOOP_DURATION,
                          times: [0, 0.35, 0.85, 1],
                          delay: index * 0.12,
                          repeat: Infinity,
                          ease: [0.2, 0.8, 0.2, 1],
                        }
                      : { duration: 0 }
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
