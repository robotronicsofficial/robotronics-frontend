import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

/* Cycles through `words` on a fixed interval. The longest word reserves line
   width so headlines do not re-wrap; the current-word sizer keeps decorations
   synced to the active text width. */
export const RotatingText = ({
  words,
  interval = 2400,
  className,
  itemClassName,
  decoration,
  decorationClassName,
}) => {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [activeWidth, setActiveWidth] = useState(0);
  const activeWordRef = useRef(null);

  const measureActiveWord = useCallback((node) => {
    activeWordRef.current = node;
    if (node) setActiveWidth(node.offsetWidth);
  }, []);

  useEffect(() => {
    if (reduced || words.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => clearInterval(id);
  }, [words.length, interval, reduced]);

  useLayoutEffect(() => {
    const node = activeWordRef.current;
    if (!node) return undefined;

    const updateWidth = () => setActiveWidth(node.offsetWidth);
    updateWidth();

    if (typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);

    return () => observer.disconnect();
  }, [index]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span
      className={cn(
        "relative inline-block pb-[0.22em] align-baseline whitespace-nowrap",
        className,
      )}
    >
      <span aria-hidden="true" className="invisible">
        {longest}
      </span>
      <span
        ref={measureActiveWord}
        aria-hidden="true"
        className={cn(
          "pointer-events-none invisible absolute left-0 top-0 inline-block",
          itemClassName,
        )}
      >
        {words[index]}
      </span>
      <span className="absolute left-0 top-0 h-[1.08em] w-full overflow-hidden pb-[0.16em]">
        <AnimatePresence initial={false}>
          <motion.span
            key={words[index]}
            className={cn("absolute left-0 top-0 inline-block", itemClassName)}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      {decoration && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 block transition-[width] duration-200 ease-out",
            decorationClassName,
          )}
          style={{
            width: activeWidth ? `${activeWidth}px` : undefined,
          }}
        >
          {decoration}
        </span>
      )}
    </span>
  );
};

RotatingText.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  interval: PropTypes.number,
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  decoration: PropTypes.node,
  decorationClassName: PropTypes.string,
};
