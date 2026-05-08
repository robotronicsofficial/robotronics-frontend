import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const OrderSummaryLine = ({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
}) => (
  <div className={cn("flex justify-between", className)}>
    <span className={labelClassName}>{label}</span>
    <span className={valueClassName}>{value}</span>
  </div>
);

OrderSummaryLine.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  valueClassName: PropTypes.string,
};

export default OrderSummaryLine;
