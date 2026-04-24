// marquee.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MARQUEE_DURATION_SECONDS } from "../utils/motion";

const getMarqueeOffsets = (direction) => {
  if (direction === "left") {
    return {
      initial: "0%",
      animate: "-100%",
    };
  }

  return {
    initial: "-100%",
    animate: "0%",
  };
};

function Marquee({ imagesurls, direction }) {
  const prefersReducedMotion = useReducedMotion();
  const offsets = getMarqueeOffsets(direction);
  const animationTarget = prefersReducedMotion ? "0%" : offsets.animate;
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : {
        ease: "linear",
        duration: MARQUEE_DURATION_SECONDS,
        repeat: Infinity,
      };

  return (
    <div className="flex gap-6 w-full overflow-hidden ">
      <motion.div
        initial={{ x: offsets.initial }}
        animate={{ x: animationTarget }}
        transition={transition}
        className="flex py-6 gap-10 whitespace-nowrap overflow-hidden flex-shrink-0 bg-"
        style={{ willChange: prefersReducedMotion ? "auto" : "transform" }}
      >
        {imagesurls.map((url, index) => (
          <img
            key={index}
            src={url}
            className=" select-none w-[10vw] h-[10vw] rounded-3xl"
            alt={`Marquee image ${index + 1}`}
          />
        ))}
      </motion.div>
      <motion.div
        initial={{ x: offsets.initial }}
        animate={{ x: animationTarget }}
        transition={transition}
        className="flex py-6 gap-10 whitespace-nowrap overflow-hidden flex-shrink-0"
        style={{ willChange: prefersReducedMotion ? "auto" : "transform" }}
      >
        {imagesurls.map((url, index) => (
          <img
            key={index}
            src={url}
            className="select-none w-[10vw] h-[10vw]  rounded-3xl"
          />
        ))}
      </motion.div>
    </div>
  );
}

export default Marquee;
