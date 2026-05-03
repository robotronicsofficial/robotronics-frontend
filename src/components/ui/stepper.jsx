import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

/* Horizontal stepper. Each step is a column with a centered circle on top
   and label/description beneath. The connecting rule is built from two
   half-segments per step (left half + right half), so the joined line runs
   exactly between circle centers — never from the column edge.

   `activeIndex` paints that step (and everything before it) in mustard. */
export const Stepper = ({ steps, activeIndex = 0, className }) => (
  <ol
    className={cn(
      "flex w-full flex-col gap-8 md:flex-row md:items-start md:gap-0",
      className,
    )}
  >
    {steps.map((step, index) => {
      const isActive = index <= activeIndex;
      const isFirst = index === 0;
      const isLast = index === steps.length - 1;

      const lineActiveLeft = index <= activeIndex;
      const lineActiveRight = index < activeIndex;

      return (
        <li
          key={step.label}
          className="relative flex flex-1 flex-row items-start gap-4 md:flex-col md:items-center md:gap-4 md:text-center"
        >
          {/* Connector — two half-lines that meet at the circle's center.
              Hidden on mobile (vertical layout). */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-5 hidden h-px w-1/2 -translate-y-1/2 md:block",
              isFirst && "invisible",
              lineActiveLeft ? "bg-primary" : "bg-border",
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              "absolute right-0 top-5 hidden h-px w-1/2 -translate-y-1/2 md:block",
              isLast && "invisible",
              lineActiveRight ? "bg-primary" : "bg-border",
            )}
          />

          <span
            aria-hidden="true"
            className={cn(
              "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border text-body-sm font-semibold transition-colors",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground",
            )}
          >
            {index + 1}
          </span>

          <div className="flex min-w-0 flex-col gap-1 md:items-center md:px-3">
            <span className="text-body font-semibold text-foreground">
              {step.label}
            </span>
            {step.description && (
              <span className="text-body-sm text-muted-foreground md:max-w-[18rem]">
                {step.description}
              </span>
            )}
          </div>
        </li>
      );
    })}
  </ol>
);

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ).isRequired,
  activeIndex: PropTypes.number,
  className: PropTypes.string,
};
