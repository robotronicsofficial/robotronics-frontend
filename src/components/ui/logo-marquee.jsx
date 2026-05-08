import { motion, useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

/* Infinite horizontal logo strip. The rail renders the logo set twice and
   slides from 0% to -50%; at -50%, the second copy sits exactly where the
   first started, so the loop is visually seamless. Edge masks fade the rail
   ends so the wrap is hidden. `mix-blend-multiply` against the card surface
   neutralizes the white backgrounds on the mixed jpg/png set, so a row of
   inconsistent assets reads as one quiet, monochrome strip — color returns
   on hover. */
export const LogoMarquee = ({
  logos,
  speed = 40,
  className,
  itemClassName,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const items = [...logos, ...logos];

  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden bg-card",
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        "[-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
    >
      <motion.ul
        className="flex w-max items-center gap-12 py-2 md:gap-20"
        initial={{ x: "0%" }}
        animate={prefersReducedMotion ? { x: "0%" } : { x: "-50%" }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { ease: "linear", duration: speed, repeat: Infinity }
        }
        style={{ willChange: prefersReducedMotion ? "auto" : "transform" }}
      >
        {items.map((logo, i) => (
          <li key={i} className="flex items-center">
            <img
              src={logo.src}
              alt={i < logos.length ? (logo.alt ?? "") : ""}
              aria-hidden={i >= logos.length}
              className={cn(
                "h-10 w-auto max-w-[10rem] select-none object-contain opacity-60 grayscale transition duration-300 ease-out hover:opacity-100 hover:grayscale-0 md:h-12",
                "mix-blend-multiply",
                itemClassName,
              )}
              draggable={false}
              loading="lazy"
            />
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

LogoMarquee.propTypes = {
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
  ).isRequired,
  speed: PropTypes.number,
  className: PropTypes.string,
  itemClassName: PropTypes.string,
};
