import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1];

const CODE_LINES = [
  { text: "project.start()", tone: "strong" },
  { text: "sensor.scan()", tone: "muted" },
  { text: "motor.speed = 80", tone: "brand" },
  { text: "upload(robot)", tone: "strong" },
];

const CodePanel = ({ animating }) => (
  <div className="relative z-10 w-full max-w-[13.5rem] overflow-hidden rounded-[1.35rem] border border-foreground/80 bg-primary-foreground text-foreground shadow-xl sm:max-w-[14.5rem]">
    <div className="flex items-center gap-1.5 border-b border-border bg-primary-foreground px-3 py-2">
      <span className="size-2 rounded-full bg-destructive/70" aria-hidden="true" />
      <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
      <span className="size-2 rounded-full bg-success" aria-hidden="true" />
      <span className="ml-2 font-mono text-caption text-muted-foreground">
        project.py
      </span>
    </div>
    <div className="space-y-1.5 bg-foreground px-3 py-4 font-mono text-[0.72rem] leading-relaxed text-background sm:text-caption">
      {CODE_LINES.map((line, index) => (
        <motion.p
          key={line.text}
          className={cn(
            line.tone === "brand" && "text-primary",
            line.tone === "muted" && "text-background/38",
            line.tone === "strong" && "text-background/88",
          )}
          initial={false}
          animate={
            animating
              ? { opacity: [0.65, 1, 0.65], x: [4, 0, 0] }
              : { opacity: 1, x: 0 }
          }
          transition={
            animating
              ? {
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 0.9,
                  delay: index * 0.18,
                  ease: easeOut,
                }
              : { duration: 0 }
          }
        >
          {line.text}
        </motion.p>
      ))}
    </div>
  </div>
);

const UploadConnector = ({ animating }) => (
  <div
    aria-hidden="true"
    className="relative z-10 grid h-20 w-full max-w-[13.5rem] place-items-center overflow-visible md:-mr-10 md:h-auto md:w-28 md:max-w-none"
  >
    <svg
      viewBox="0 0 32 80"
      preserveAspectRatio="none"
      className="absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 overflow-visible text-foreground md:hidden"
    >
      <path
        d="M16 6V66"
        className="stroke-current opacity-60"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M16 74 8 60h16z" className="fill-current opacity-95" />
      <motion.path
        d="M16 6V66"
        className="stroke-background"
        strokeWidth="5"
        strokeLinecap="round"
        initial={false}
        animate={
          animating
            ? { pathLength: [0.08, 1, 0.08], opacity: [0.35, 1, 0.35] }
            : { pathLength: 1, opacity: 0.85 }
        }
        transition={
          animating
            ? { duration: 1.7, repeat: Infinity, ease: "linear" }
            : { duration: 0 }
        }
      />
      {[0, 1, 2].map((index) => (
        <motion.rect
          key={index}
          x="11"
          width="10"
          height="10"
          rx="3"
          className="fill-background stroke-current"
          strokeWidth="2"
          animate={
            animating
              ? { y: [8, 58], opacity: [0.15, 1, 1, 0.15] }
              : { y: 34, opacity: 0.9 }
          }
          transition={
            animating
              ? { duration: 1.35, repeat: Infinity, delay: index * 0.28, ease: "linear" }
              : { duration: 0 }
          }
        />
      ))}
    </svg>

    <svg
      viewBox="0 0 112 28"
      preserveAspectRatio="none"
      className="absolute inset-x-0 top-1/2 hidden h-10 -translate-y-1/2 overflow-visible text-foreground md:block"
    >
      <path
        d="M4 14H104"
        className="stroke-current opacity-60"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M112 14 96 6v16z" className="fill-current opacity-95" />
      <motion.path
        d="M4 14H104"
        className="stroke-background"
        strokeWidth="5"
        strokeLinecap="round"
        initial={false}
        animate={
          animating
            ? { pathLength: [0.08, 1, 0.08], opacity: [0.35, 1, 0.35] }
            : { pathLength: 1, opacity: 0.85 }
        }
        transition={
          animating
            ? { duration: 1.7, repeat: Infinity, ease: "linear" }
            : { duration: 0 }
        }
      />
      {[0, 1, 2].map((index) => (
        <motion.rect
          key={index}
          y="9"
          width="10"
          height="10"
          rx="3"
          className="fill-background stroke-current"
          strokeWidth="2"
          animate={
            animating
              ? { x: [4, 92], opacity: [0.15, 1, 1, 0.15] }
              : { x: 48, opacity: 0.9 }
          }
          transition={
            animating
              ? { duration: 1.35, repeat: Infinity, delay: index * 0.28, ease: "linear" }
              : { duration: 0 }
          }
        />
      ))}
    </svg>
  </div>
);

const SensorWave = ({ delay = 0 }) => (
  <motion.circle
    cx="136"
    cy="70"
    r="10"
    className="fill-none stroke-primary-foreground/65"
    strokeWidth="2"
    animate={{ scale: [1, 3.1], opacity: [0.55, 0] }}
    transition={{ duration: 2.1, repeat: Infinity, delay, ease: "easeOut" }}
    style={{ transformOrigin: "136px 70px" }}
  />
);

const Wheel = ({ cx, animating, delay = 0 }) => (
  <motion.g
    animate={animating ? { rotate: 360 } : { rotate: 0 }}
    transition={
      animating
        ? { duration: 2.6, repeat: Infinity, ease: "linear", delay }
        : { duration: 0 }
    }
    style={{ transformOrigin: `${cx}px 158px` }}
  >
    <circle cx={cx} cy="158" r="17" className="fill-foreground" />
    <circle cx={cx} cy="158" r="6" className="fill-primary-foreground/45" />
  </motion.g>
);

const RobotChassis = ({ animating }) => (
  <svg
    viewBox="42 0 218 210"
    role="img"
    aria-label="Animated robot chassis"
    className="relative z-10 h-full min-h-[10rem] w-full max-w-[15rem] sm:min-h-[12rem] sm:max-w-[16.5rem] lg:min-h-[13rem] lg:max-w-[18rem]"
  >
    <defs>
      <filter id="hero-chassis-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow
          dx="0"
          dy="12"
          stdDeviation="10"
          floodColor="#0a0908"
          floodOpacity="0.2"
        />
      </filter>
    </defs>

    {animating && (
      <>
        <SensorWave delay={0} />
        <SensorWave delay={0.7} />
      </>
    )}

    <motion.g
      filter="url(#hero-chassis-shadow)"
      animate={animating ? { y: [0, -4, 0] } : { y: 0 }}
      transition={
        animating
          ? { duration: 3.1, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0 }
      }
    >
      <rect
        x="58"
        y="68"
        width="144"
        height="78"
        rx="28"
        className="fill-foreground"
      />
      <rect
        x="50"
        y="95"
        width="16"
        height="24"
        rx="8"
        className="fill-foreground"
      />
      <motion.circle
        cx="56"
        cy="107"
        r="3.5"
        className="fill-background"
        animate={animating ? { opacity: [0.35, 1, 0.35] } : { opacity: 0.9 }}
        transition={animating ? { duration: 1.2, repeat: Infinity } : { duration: 0 }}
      />
      <rect
        x="81"
        y="91"
        width="98"
        height="31"
        rx="15.5"
        className="fill-background"
      />
      <motion.circle
        cx="111"
        cy="106"
        r="6.5"
        className="fill-foreground"
        animate={animating ? { scaleY: [1, 0.14, 1] } : { scaleY: 1 }}
        transition={
          animating
            ? { duration: 2.8, repeat: Infinity, delay: 1 }
            : { duration: 0 }
        }
        style={{ transformOrigin: "111px 106px" }}
      />
      <motion.circle
        cx="150"
        cy="106"
        r="6.5"
        className="fill-foreground"
        animate={animating ? { scaleY: [1, 0.14, 1] } : { scaleY: 1 }}
        transition={
          animating
            ? { duration: 2.8, repeat: Infinity, delay: 1.08 }
            : { duration: 0 }
        }
        style={{ transformOrigin: "150px 106px" }}
      />
      <path
        d="M106 128 Q130 139 154 128"
        className="stroke-primary-foreground/22"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <line
        x1="130"
        y1="47"
        x2="130"
        y2="68"
        className="stroke-foreground"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <motion.circle
        cx="130"
        cy="38"
        r="11"
        className="fill-primary stroke-foreground"
        strokeWidth="4"
        animate={animating ? { opacity: [1, 0.55, 1] } : { opacity: 1 }}
        transition={animating ? { duration: 1.4, repeat: Infinity } : { duration: 0 }}
      />
    </motion.g>

    <line
      x1="78"
      y1="151"
      x2="182"
      y2="151"
      className="stroke-foreground"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <Wheel cx={91} animating={animating} />
    <Wheel cx={169} animating={animating} delay={0.05} />

    <motion.g
      animate={animating ? { x: [-12, 0, 0], opacity: [0, 1, 1] } : { x: 0, opacity: 1 }}
      transition={
        animating
          ? { duration: 2.8, repeat: Infinity, repeatDelay: 1, ease: easeOut }
          : { duration: 0 }
      }
    >
      <rect
        x="196"
        y="82"
        width="32"
        height="28"
        rx="8"
        className="fill-background stroke-foreground"
        strokeWidth="4"
      />
      <path
        d="M204 91h16M204 101h16"
        className="stroke-foreground"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </motion.g>
  </svg>
);

export const HeroBuildLab = ({ className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "120px" });
  const reduced = useReducedMotion();
  const animating = inView && !reduced;

  return (
    <div
      ref={ref}
      className={cn(
        "relative grid min-h-[27rem] min-w-0 w-full place-items-center overflow-hidden rounded-3xl bg-primary p-4 text-primary-foreground shadow-xl sm:aspect-[4/5] sm:min-h-0 sm:p-5 lg:aspect-auto lg:h-[32rem] lg:p-6 xl:h-[34rem] xl:p-7",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 top-20 h-64 w-64 rounded-full bg-primary-foreground/16 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-foreground/14 blur-3xl"
      />

      <div className="relative z-10 grid min-w-0 items-center justify-items-center gap-0 md:grid-cols-[max-content_6rem_max-content]">
        <CodePanel animating={animating} />
        <UploadConnector animating={animating} />
        <RobotChassis animating={animating} />
      </div>
    </div>
  );
};
