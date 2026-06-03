import PropTypes from "prop-types";

import OrderSummaryLine from "./OrderSummaryLine";
import { Text } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { useFormatMoney } from "@/utils/formatPrice";

const quoteValue = ({
  value,
  formatMoney,
  isLoading,
  isError,
  isDiscount = false,
}) => {
  if (isLoading) return "Updating...";
  if (isError || value === undefined || value === null) return "Unavailable";

  const formatted = formatMoney(value);
  return isDiscount ? `- ${formatted}` : formatted;
};

const ShopOrderSummary = ({
  pricing,
  isLoading = false,
  isError = false,
  showSeparator = false,
}) => {
  const formatMoney = useFormatMoney();

  return (
    <div className="flex flex-col gap-3">
      <OrderSummaryLine
        label="Subtotal"
        value={quoteValue({ value: pricing?.subtotal, formatMoney, isLoading, isError })}
        labelClassName="text-body-sm text-muted-foreground"
        valueClassName="text-body font-medium"
      />
      <OrderSummaryLine
        label="Discount"
        value={quoteValue({
          value: pricing?.discount,
          formatMoney,
          isLoading,
          isError,
          isDiscount: true,
        })}
        labelClassName="text-body-sm text-muted-foreground"
        valueClassName="text-body-sm"
      />
      <OrderSummaryLine
        label="Shipping"
        value={quoteValue({ value: pricing?.shipping, formatMoney, isLoading, isError })}
        labelClassName="text-body-sm text-muted-foreground"
        valueClassName="text-body-sm"
      />
      {showSeparator && <Separator />}
      <div className={showSeparator ? "" : "border-t border-border pt-3"}>
        <OrderSummaryLine
          label="Total"
          value={quoteValue({ value: pricing?.total, formatMoney, isLoading, isError })}
          labelClassName="text-body-sm text-muted-foreground"
          valueClassName="text-h5 font-semibold text-primary"
        />
      </div>
      {isError && (
        <Text size="xs" className="text-destructive">
          Current cart pricing could not be confirmed.
        </Text>
      )}
    </div>
  );
};

ShopOrderSummary.propTypes = {
  pricing: PropTypes.shape({
    subtotal: PropTypes.number,
    discount: PropTypes.number,
    shipping: PropTypes.number,
    total: PropTypes.number,
  }),
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  showSeparator: PropTypes.bool,
};

export default ShopOrderSummary;
