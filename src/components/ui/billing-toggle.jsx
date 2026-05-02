import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual" },
];

export const BillingToggle = ({
  value,
  onChange,
  savingsLabel,
  className,
}) => (
  <div
    role="radiogroup"
    aria-label="Billing cycle"
    className={cn(
      "inline-flex items-center gap-1 rounded-full border border-border bg-card p-1",
      className,
    )}
  >
    {OPTIONS.map((option) => {
      const selected = value === option.value;
      return (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={selected}
          onClick={() => onChange(option.value)}
          className={cn(
            "inline-flex h-9 items-center gap-2 rounded-full px-4 text-body-sm font-medium transition-colors",
            selected
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.label}
          {option.value === "annual" && savingsLabel && (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-caption font-semibold",
                selected
                  ? "bg-primary-foreground/15 text-primary-foreground"
                  : "bg-primary-soft text-primary",
              )}
            >
              {savingsLabel}
            </span>
          )}
        </button>
      );
    })}
  </div>
);

BillingToggle.propTypes = {
  value: PropTypes.oneOf(["monthly", "annual"]).isRequired,
  onChange: PropTypes.func.isRequired,
  savingsLabel: PropTypes.string,
  className: PropTypes.string,
};
