import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

const getPercent = (value, min, max) => ((value - min) / (max - min)) * 100;

const getNearestValue = (value, snapValues) => {
  if (!snapValues?.length) return value;

  return snapValues.reduce((nearest, candidate) => (
    Math.abs(candidate - value) < Math.abs(nearest - value) ? candidate : nearest
  ), snapValues[0]);
};

const rangeInputClassName =
  "range-slider-input absolute inset-0 h-2 w-full appearance-none bg-transparent accent-foreground";

const RangeSlider = ({
  min,
  max,
  value,
  onChange,
  step = 1,
  marks = [],
  snapValues,
  className,
}) => {
  const isRange = Array.isArray(value);
  const lowValue = isRange ? value[0] : min;
  const highValue = isRange ? value[1] : value;
  const lowPercent = getPercent(lowValue, min, max);
  const highPercent = getPercent(highValue, min, max);

  const commitSingleValue = (nextValue) => {
    onChange(getNearestValue(Number(nextValue), snapValues));
  };

  const commitLowValue = (nextValue) => {
    const nextLowValue = Math.min(Number(nextValue), highValue);
    onChange([nextLowValue, highValue]);
  };

  const commitHighValue = (nextValue) => {
    const nextHighValue = Math.max(Number(nextValue), lowValue);
    onChange([lowValue, nextHighValue]);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="relative h-6">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-border" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-foreground"
          style={{
            left: `${isRange ? lowPercent : 0}%`,
            right: `${100 - highPercent}%`,
          }}
        />
        {isRange ? (
          <>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={lowValue}
              onChange={(event) => commitLowValue(event.target.value)}
              className={rangeInputClassName}
              aria-label="Minimum value"
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={highValue}
              onChange={(event) => commitHighValue(event.target.value)}
              className={rangeInputClassName}
              aria-label="Maximum value"
            />
          </>
        ) : (
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={highValue}
            onChange={(event) => commitSingleValue(event.target.value)}
            className={rangeInputClassName}
            aria-label="Selected value"
          />
        )}
      </div>
      {marks.length > 0 ? (
        <div className="flex justify-between text-xs text-muted-foreground">
          {marks.map((mark) => (
            <span key={mark.value}>{mark.label}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  marks: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  })),
  snapValues: PropTypes.arrayOf(PropTypes.number),
  className: PropTypes.string,
};

export default RangeSlider;
