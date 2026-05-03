import { motion, useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";
import { Children, createElement } from "react";

import { cn } from "@/lib/utils";

/* Stagger-reveal children on viewport entry. Each direct child is wrapped
   in a motion shell. `as` controls the parent tag, `itemAs` the per-item
   wrapper. Reduced-motion users see the list rendered instantly without a
   motion wrapper. */
export const AnimatedList = ({
  children,
  as: Tag = "div",
  itemAs = "div",
  className,
  itemClassName,
  stagger = 0.06,
  delay = 0,
  amount = 0.3,
}) => {
  const reduced = useReducedMotion();
  const items = Children.toArray(children);

  if (reduced) {
    return createElement(
      Tag,
      { className },
      items.map((c, i) =>
        createElement(itemAs, { key: i, className: itemClassName }, c),
      ),
    );
  }

  const ParentMotion = motion[Tag] ?? motion.div;
  const ItemMotion = motion[itemAs] ?? motion.div;

  return (
    <ParentMotion
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delayChildren: delay, staggerChildren: stagger }}
    >
      {items.map((child, i) => (
        <ItemMotion
          key={i}
          className={itemClassName}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </ItemMotion>
      ))}
    </ParentMotion>
  );
};

AnimatedList.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.elementType,
  itemAs: PropTypes.elementType,
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  stagger: PropTypes.number,
  delay: PropTypes.number,
  amount: PropTypes.number,
};
