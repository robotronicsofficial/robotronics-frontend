import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

const fieldClassName =
  "block w-full appearance-none border-0 border-b-2 border-border bg-transparent px-0 py-2.5 text-sm text-muted-foreground-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-border-600 dark:text-foreground dark:focus:border-blue-500 peer";

const labelClassName =
  "pointer-events-none absolute top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-muted-foreground-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 peer-focus:dark:text-blue-500 dark:text-muted-foreground-400";

const FloatingField = ({
  as: Component = "input",
  children,
  className,
  id,
  label,
  labelClassName: labelClassNameOverride,
  ...props
}) => (
  <div className="relative mb-5 w-full group">
    <Component
      id={id}
      className={cn(fieldClassName, className)}
      placeholder={Component === "select" ? undefined : " "}
      {...props}
    >
      {children}
    </Component>
    <label htmlFor={id} className={cn(labelClassName, labelClassNameOverride)}>
      {label}
    </label>
  </div>
);

FloatingField.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  labelClassName: PropTypes.string,
};

export default FloatingField;
