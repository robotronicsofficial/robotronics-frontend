import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/* Cycles through `words` on a fixed interval, swapping with a vertical
   slide. The widest word reserves horizontal space (invisible sizer), so
   the surrounding line never reflows. Reduced-motion users see the first
   word, frozen. The clip box has `pb-[0.15em]` so descenders (g, y, p)
   aren't shaved by `overflow-hidden`. */
export const RotatingText = ({
  words,
  interval = 2400,
  className,
  itemClassName,
}) => {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || words.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => clearInterval(id);
  }, [words.length, interval, reduced]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span
      className={cn(
        "relative inline-block align-baseline whitespace-nowrap",
        className,
      )}
    >
      <span aria-hidden="true" className="invisible">
        {longest}
      </span>
      <span className="absolute inset-0 overflow-hidden pb-[0.15em]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            className={cn("absolute inset-0", itemClassName)}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
};

RotatingText.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  interval: PropTypes.number,
  className: PropTypes.string,
  itemClassName: PropTypes.string,
};
