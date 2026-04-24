import PropTypes from "prop-types";
import { forwardRef } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const fieldWrapperClassName = "flex flex-col gap-2";
const labelClassName = "text-sm poppins-light text-muted-foreground";
const controlClassName = "min-h-11 rounded-xl bg-background px-4 py-3 poppins-light";

const emitChange = (name, value, onChange) => {
  onChange({
    target: {
      name,
      value,
    },
  });
};

export const FormInput = forwardRef(({
  className,
  controlClassName: inputClassName,
  id,
  label,
  name,
  ...props
}, ref) => {
  const inputId = id || name;

  return (
    <div className={cn(fieldWrapperClassName, className)}>
      {label && (
        <Label htmlFor={inputId} className={labelClassName}>
          {label}
        </Label>
      )}
      <Input
        id={inputId}
        name={name}
        ref={ref}
        className={cn(controlClassName, inputClassName)}
        {...props}
      />
    </div>
  );
});

FormInput.displayName = "FormInput";

export const FormTextarea = ({
  className,
  controlClassName: textareaClassName,
  id,
  label,
  name,
  ...props
}) => {
  const textareaId = id || name;

  return (
    <div className={cn(fieldWrapperClassName, className)}>
      {label && (
        <Label htmlFor={textareaId} className={labelClassName}>
          {label}
        </Label>
      )}
      <Textarea
        id={textareaId}
        name={name}
        className={cn(controlClassName, "min-h-28", textareaClassName)}
        {...props}
      />
    </div>
  );
};

export const FormSelect = ({
  className,
  controlClassName: selectClassName,
  id,
  label,
  name,
  onChange,
  options,
  placeholder,
  value,
  ...props
}) => {
  const selectId = id || name;

  return (
    <div className={cn(fieldWrapperClassName, className)}>
      {label && (
        <Label htmlFor={selectId} className={labelClassName}>
          {label}
        </Label>
      )}
      <Select
        value={value}
        onValueChange={(nextValue) => emitChange(name, nextValue, onChange)}
        {...props}
      >
        <SelectTrigger id={selectId} className={cn("min-h-11 w-full rounded-xl bg-background px-4 py-3", selectClassName)}>
          <SelectValue placeholder={placeholder || `Select ${String(label || name).toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const sharedFieldPropTypes = {
  className: PropTypes.string,
  controlClassName: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
};

FormInput.propTypes = {
  ...sharedFieldPropTypes,
};

FormTextarea.propTypes = {
  ...sharedFieldPropTypes,
};

FormSelect.propTypes = {
  ...sharedFieldPropTypes,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};
