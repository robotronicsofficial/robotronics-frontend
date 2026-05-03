import { useInView, useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/* Typewriter that types `text` character-by-character once the element is
   in view. A blinking cursor trails the active character; it disappears
   when typing completes by default. Reduced-motion users see the full
   text from the start. */
export const TextType = ({
  text,
  speed = 45,
  startDelay = 0,
  cursor = true,
  hideCursorWhenDone = true,
  className,
  onComplete,
}) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [shown, setShown] = useState(reduced ? text : "");
  const completedRef = useRef(reduced);

  useEffect(() => {
    if (reduced || !inView) return;
    if (shown.length === 0 && startDelay > 0) {
      const t = setTimeout(() => setShown(text.slice(0, 1)), startDelay);
      return () => clearTimeout(t);
    }
    if (shown.length >= text.length) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
      return;
    }
    const t = setTimeout(
      () => setShown(text.slice(0, shown.length + 1)),
      speed,
    );
    return () => clearTimeout(t);
  }, [reduced, inView, shown, text, speed, startDelay, onComplete]);

  const done = shown.length === text.length;
  const showCursor = cursor && !(hideCursorWhenDone && done);

  return (
    <span ref={ref} className={cn("inline", className)}>
      {shown}
      {showCursor && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-current align-middle motion-safe:animate-pulse"
        />
      )}
    </span>
  );
};

TextType.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
  startDelay: PropTypes.number,
  cursor: PropTypes.bool,
  hideCursorWhenDone: PropTypes.bool,
  className: PropTypes.string,
  onComplete: PropTypes.func,
};
