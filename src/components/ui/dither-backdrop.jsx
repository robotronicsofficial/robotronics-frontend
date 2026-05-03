import { Suspense, lazy, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/* The shader bundle (three + r3f + postprocessing) is ~220 kB gzipped, so
   the heavy import lives behind React.lazy. The Suspense fallback is null —
   the surface this lays over is already styled enough to look complete
   without the dither pass. */
const Dither = lazy(() => import("@/components/ui/dither-background"));

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
};

/* Pause when the host element scrolls out of view. Saves the GPU on long
   pages and on tabs the user has scrolled past the hero. */
const useInView = (ref) => {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
};

/*
 * DitherBackdrop — drop-in absolutely-positioned dither shader for marketing
 * surfaces. Defaults are tuned for our white + mustard brand:
 *   • baseColor white, waveColor brand-500 mustard
 *   • slow waveSpeed, large pixelSize → cheap to render and reads as a
 *     subtle grain rather than an animation
 *   • opacity 0.18 default → present but never overwhelming
 *
 * Pauses on prefers-reduced-motion and when scrolled out of viewport.
 */
export const DitherBackdrop = ({
  className,
  opacity = 0.4,
  waveSpeed = 0.06,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  /* Dithered patterns only read when base ↔ wave have real luminance contrast.
     White base + brand-700 mustard (#927426) gives us a visible grain on a
     light hero without going gray. */
  waveColor = [0.572, 0.455, 0.149],
  baseColor = [1, 1, 1],
  colorNum = 4,
  pixelSize = 2,
}) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref);
  const paused = reduced || !inView;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={{ opacity }}
    >
      <Suspense fallback={null}>
        <Dither
          waveSpeed={paused ? 0 : waveSpeed}
          waveFrequency={waveFrequency}
          waveAmplitude={waveAmplitude}
          waveColor={waveColor}
          baseColor={baseColor}
          colorNum={colorNum}
          pixelSize={pixelSize}
          disableAnimation={paused}
          paused={paused}
          enableMouseInteraction={false}
        />
      </Suspense>
    </div>
  );
};
