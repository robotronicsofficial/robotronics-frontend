import { motion, useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

/* Word-by-word blur-to-clear reveal on viewport entry. Subtler than a
   y-translate fade — reads as the text coming into focus. Triggers once
   at 40% in view. Reduced-motion users see static text. */
export const BlurText = ({ text, className, delay = 0, stagger = 0.06 }) => {
  const reduced = useReducedMotion();

  if (reduced) return <span className={className}>{text}</span>;

  const words = text.split(" ");

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delayChildren: delay, staggerChildren: stagger }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, filter: "blur(8px)", y: 6 },
            visible: { opacity: 1, filter: "blur(0px)", y: 0 },
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
};

BlurText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  stagger: PropTypes.number,
};
