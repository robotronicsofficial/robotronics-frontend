import PropTypes from "prop-types";

import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

const getNearestValue = (value, snapValues) => {
  if (!snapValues?.length) return value;

  return snapValues.reduce((nearest, candidate) => (
    Math.abs(candidate - value) < Math.abs(nearest - value) ? candidate : nearest
  ), snapValues[0]);
};

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
  const sliderValue = isRange ? value : [value];

  const handleValueChange = (nextValue) => {
    if (isRange) {
      onChange(nextValue);
      return;
    }

    onChange(getNearestValue(nextValue[0], snapValues));
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Slider
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onValueChange={handleValueChange}
        aria-label={isRange ? "Selected range" : "Selected value"}
      />
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
