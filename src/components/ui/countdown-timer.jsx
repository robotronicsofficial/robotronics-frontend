import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

const computeRemaining = (targetMs) => {
  const ms = targetMs - Date.now();
  if (!Number.isFinite(targetMs) || ms <= 0) return null;
  const totalSeconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
};

const Unit = ({ value, label }) => (
  <div className="flex flex-col items-center gap-1">
    <span className="rounded-md bg-foreground px-2.5 py-1 text-body-sm font-bold tabular-nums text-background">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-caption uppercase tracking-wider text-muted-foreground">
      {label}
    </span>
  </div>
);

Unit.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

/* Renders nothing once the deadline has passed, so the consumer can drop
   it inline without guarding visibility themselves. Tick interval is
   1s — fine for promo timers; granularity below that is theatre. The
   optional onExpire callback fires once when the deadline crosses, so a
   wrapper component can hide its surrounding chrome (label, container,
   etc) instead of leaving an orphan when the timer disappears. */
export const CountdownTimer = ({ endsAt, className, onExpire }) => {
  const targetMs = new Date(endsAt).getTime();
  const [remaining, setRemaining] = useState(() => computeRemaining(targetMs));

  useEffect(() => {
    const next = computeRemaining(targetMs);
    setRemaining(next);
    if (!next) {
      onExpire?.();
      return;
    }
    const interval = setInterval(() => {
      const tick = computeRemaining(targetMs);
      setRemaining(tick);
      if (!tick) {
        clearInterval(interval);
        onExpire?.();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetMs, onExpire]);

  if (!remaining) return null;

  return (
    <div
      role="timer"
      aria-label="Time remaining"
      className={cn("flex items-center gap-2", className)}
    >
      <Unit value={remaining.days} label="days" />
      <Unit value={remaining.hours} label="hrs" />
      <Unit value={remaining.minutes} label="min" />
      <Unit value={remaining.seconds} label="sec" />
    </div>
  );
};

CountdownTimer.propTypes = {
  endsAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  className: PropTypes.string,
  onExpire: PropTypes.func,
};
