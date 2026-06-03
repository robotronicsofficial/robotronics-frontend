import PropTypes from "prop-types";

import CustomerProduct from "@/components/site/shop/customerProduct";
import ShopOrderSummary from "./ShopOrderSummary";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { EMPTY_SHOP_CART_QUOTE } from "@/lib/shopCheckout";
import { getCommerceItemKey } from "@/lib/commerceItems";
import { useShopCartQuoteQuery } from "@/hooks/useShopOrders";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { useFormatMoney } from "@/utils/formatPrice";
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
  const formatMoney = useFormatMoney();
  const items = Array.isArray(itemsOverride) ? itemsOverride : cart;
  const quoteQuery = useShopCartQuoteQuery(summaryOverride ? [] : items);
  const quote = items.length ? quoteQuery.data : EMPTY_SHOP_CART_QUOTE;
  const hasBackendItems = Boolean(summaryOverride || quote?.items);
  const displayItems = hasBackendItems ? (quote?.items || items) : items;
  const pricing = summaryOverride || quote?.pricing || null;
  const isQuoteLoading = !summaryOverride && items.length > 0 && quoteQuery.isLoading;
  const isQuoteError = !summaryOverride && items.length > 0 && quoteQuery.isError;

  return (
    <div className="flex flex-col gap-6 p-5 lg:p-8" data-aos="fade-top">
      <div className="flex flex-col gap-2">
        <Heading level={3} className="text-h4">Your order</Heading>
        <Text size="sm" tone="muted">
          Review all the products you want to buy.
        </Text>
      </div>

      <div className="flex flex-col gap-4">
        {displayItems.length > 0 ? (
          displayItems.map((product) => (
            <CustomerProduct
              key={getCommerceItemKey(product)}
              title={product.name}
              image={resolveBackendAssetUrl(product?.image || product?.images?.[0], "")}
              price={hasBackendItems ? formatMoney(product.price ?? product.unitPrice) : "Updating..."}
              priceLabel=""
              item={product.quantity}
            />
          ))
        ) : (
          <Text size="sm" tone="muted">Your cart is empty.</Text>
        )}
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        <ShopOrderSummary
          pricing={pricing}
          isLoading={isQuoteLoading}
          isError={isQuoteError}
          showSeparator
        />

        {showContinueButton && (
          <Button
            type="button"
            size="marketing"
            onClick={onNext}
            disabled={buttonDisabled || !items.length || isQuoteLoading || isQuoteError}
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
