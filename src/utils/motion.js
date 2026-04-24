const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const AOS_DURATION_MS = 260;
export const AOS_STAGGER_MS = 55;
export const MARQUEE_DURATION_SECONDS = 18;

const normalizeIndex = (value) => {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, value);
};

export const shouldDisableAnimations = () =>
  typeof window !== "undefined" &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

export const AOS_OPTIONS = {
  duration: AOS_DURATION_MS,
  delay: 0,
  once: true,
  easing: "ease-out-cubic",
  offset: 24,
  disable: shouldDisableAnimations,
};

export const getAosStaggerDelay = (index, step = AOS_STAGGER_MS) =>
  normalizeIndex(index) * step;
