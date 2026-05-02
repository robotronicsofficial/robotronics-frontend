import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

/* Horizontal stepper. Each step renders an outlined circle with its index
   and a label beneath; the connecting line between steps is a thin rule.
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
      const isLast = index === steps.length - 1;
      return (
        <li
          key={step.label}
          className="flex flex-1 flex-row items-start gap-4 md:flex-col md:items-center md:gap-3 md:text-center"
        >
          <div className="flex shrink-0 flex-col items-center md:w-full md:flex-row md:items-center">
            <span
              aria-hidden="true"
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-full border text-body-sm font-semibold transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground",
              )}
            >
              {index + 1}
            </span>
            {!isLast && (
              <span
                aria-hidden="true"
                className={cn(
                  "hidden h-px flex-1 md:block",
                  isActive && index < activeIndex ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </div>
          <div className="flex min-w-0 flex-col gap-1 md:items-center">
            <span className="text-body font-semibold text-foreground">
              {step.label}
            </span>
            {step.description && (
              <span className="text-body-sm text-muted-foreground md:max-w-[16rem]">
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
