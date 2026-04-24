import PropTypes from "prop-types";
import { useRef } from "react";

import { cn } from "@/lib/utils";

const digitClassName =
  "size-12 rounded-lg border border-input bg-background text-center text-lg text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30";

const PinDigitFields = ({
  idPrefix,
  label,
  value,
  onChange,
  type = "password",
  hideLabel = false,
  autoFocus = false,
}) => {
  const inputRefs = useRef([]);

  const handleChange = (index, nextValue) => {
    const digit = nextValue.slice(-1);
    if (digit && !/^[0-9]$/.test(digit)) return;

    const nextPin = [...value];
    nextPin[index] = digit;
    onChange(nextPin);

    if (digit && index < value.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className={cn("block text-sm text-muted-foreground", hideLabel && "sr-only")}>
        {label}
      </label>
      <div className="flex justify-center gap-3 sm:gap-4">
        {value.map((digit, index) => (
          <input
            key={`${idPrefix}-${index}`}
            ref={(input) => {
              inputRefs.current[index] = input;
            }}
            id={`${idPrefix}-${index}`}
            type={type}
            maxLength="1"
            value={digit}
            onChange={(event) => handleChange(index, event.target.value)}
            className={digitClassName}
            inputMode="numeric"
            pattern="[0-9]*"
            autoFocus={autoFocus && index === 0}
            aria-label={`${label} digit ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

PinDigitFields.propTypes = {
  idPrefix: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["password", "text"]),
  hideLabel: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

export default PinDigitFields;
