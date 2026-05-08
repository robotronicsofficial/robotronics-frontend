import PropTypes from "prop-types";

import CustomerProduct from "@/components/site/shop/customerProduct";
import OrderSummaryLine from "./OrderSummaryLine";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { calculateCartSummary, formatShopCurrency } from "@/lib/shopCheckout";
import { getCommerceItemKey } from "@/lib/commerceItems";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { selectCart, useCartStore } from "@/stores/cartStore";

const CustomerOrder = ({
  onNext,
  buttonLabel = "Continue to shipping",
  buttonDisabled = false,
  itemsOverride = null,
  summaryOverride = null,
  showContinueButton = true,
}) => {
  const cart = useCartStore(selectCart);
  const items = Array.isArray(itemsOverride) ? itemsOverride : cart;
  const summary = summaryOverride || calculateCartSummary(items);

  return (
    <div className="flex flex-col gap-6 p-5 lg:p-8" data-aos="fade-top">
      <div className="flex flex-col gap-2">
        <Heading level={3} className="text-h4">Your order</Heading>
        <Text size="sm" tone="muted">
          Review all the products you want to buy.
        </Text>
      </div>

      <div className="flex flex-col gap-4">
        {items.length > 0 ? (
          items.map((product) => (
            <CustomerProduct
              key={getCommerceItemKey(product)}
              title={product.name}
              image={resolveBackendAssetUrl(product?.image || product?.images?.[0], "")}
              price={Number(product.price ?? product.unitPrice ?? 0).toLocaleString()}
              item={product.quantity}
            />
          ))
        ) : (
          <Text size="sm" tone="muted">Your cart is empty.</Text>
        )}
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        <OrderSummaryLine
          label="Shipping"
          value={formatShopCurrency(summary.shipping)}
          labelClassName="text-body-sm text-muted-foreground"
          valueClassName="text-body-sm"
        />
        <OrderSummaryLine
          label="Discount 10%"
          value={`- ${formatShopCurrency(summary.discount)}`}
          labelClassName="text-body-sm text-muted-foreground"
          valueClassName="text-body-sm"
        />
        <OrderSummaryLine
          label="Subtotal"
          value={formatShopCurrency(summary.subtotal)}
          labelClassName="text-body-sm text-muted-foreground"
          valueClassName="text-body font-medium"
        />
        <Separator />
        <OrderSummaryLine
          label="Total"
          value={formatShopCurrency(summary.total)}
          labelClassName="text-body-sm text-muted-foreground"
          valueClassName="text-h5 font-semibold text-primary"
        />

        {showContinueButton && (
          <Button
            type="button"
            size="marketing"
            onClick={onNext}
            disabled={buttonDisabled || !items.length}
            className="mt-2 w-full"
          >
            {buttonLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

CustomerOrder.propTypes = {
  onNext: PropTypes.func,
  buttonLabel: PropTypes.string,
  buttonDisabled: PropTypes.bool,
  itemsOverride: PropTypes.array,
  summaryOverride: PropTypes.object,
  showContinueButton: PropTypes.bool,
};

export default CustomerOrder;
