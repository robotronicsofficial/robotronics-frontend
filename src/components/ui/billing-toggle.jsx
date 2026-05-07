import { useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual" },
];

/* Variable-width thumb (the "Annual" pill carries the savings chip and is
   wider than "Monthly"). offsetLeft / offsetWidth are read after layout, so
   the thumb is correctly placed on first paint. */
export const BillingToggle = ({
  value,
  onChange,
  savingsLabel,
  className,
}) => {
  const containerRef = useRef(null);
  const [thumb, setThumb] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const active = containerRef.current.querySelector(
      `[data-value="${value}"]`,
    );
    if (!active) return;
    setThumb({ left: active.offsetLeft, width: active.offsetWidth });
  }, [value, savingsLabel]);

  return (
    <div
      ref={containerRef}
      aria-label="Billing cycle"
      className={cn(
        "relative inline-flex items-center rounded-full border border-border bg-card p-1",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-1 left-0 rounded-full bg-primary transition-[transform,width] duration-[var(--duration-base)] ease-out-quint motion-reduce:transition-none"
        style={{
          width: thumb.width,
          transform: `translateX(${thumb.left}px)`,
        }}
      />
      {OPTIONS.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            data-value={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative inline-flex h-9 items-center gap-2 rounded-full px-4 text-body-sm font-medium transition-colors duration-[var(--duration-fast)]",
              selected
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
            {option.value === "annual" && savingsLabel && (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-caption font-semibold transition-colors duration-[var(--duration-fast)]",
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
};

BillingToggle.propTypes = {
  value: PropTypes.oneOf(["monthly", "annual"]).isRequired,
  onChange: PropTypes.func.isRequired,
  savingsLabel: PropTypes.string,
  className: PropTypes.string,
};
