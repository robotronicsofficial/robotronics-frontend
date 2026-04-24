import CustomerProduct from "../../component/shop/customerProduct";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { calculateCartSummary, formatShopCurrency } from "../../lib/shopCheckout";
import { getCommerceItemKey } from "../../lib/commerceItems";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";

const CustomerOrderSummaryLine = ({ label, value, valueClassName = "text-sm poppins-bold" }) => (
  <div className="flex justify-between">
    <p className="text-sm poppins-light">{label}</p>
    <p className={valueClassName}>{value}</p>
  </div>
);

const CustomerOrder = ({
  onNext,
  buttonLabel = "CONTINUE TO SHIPPING",
  buttonDisabled = false,
  itemsOverride = null,
  summaryOverride = null,
  showContinueButton = true,
}) => {
  const { cart } = useSelector((state) => state.cart);
  const items = Array.isArray(itemsOverride) ? itemsOverride : cart;
  const summary = summaryOverride || calculateCartSummary(items);

  return (
    <div
      className="flex flex-col gap-8 p-4 px-5 lg:gap-20 lg:p-8 lg:px-14"
      data-aos="fade-top"
    >
      <div className="flex flex-col gap-4 lg:gap-8">
        <p className="md:text-4xl text-2xl poppins-bold">YOUR ORDER</p>
        <p className="text-sm text-line poppins-regular">
          Review all the products you want to buy
        </p>
      </div>

      <div className="flex flex-col gap-2 poppins-extralight lg:gap-5">
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
          <p className="text-sm text-[#7E7F7C]">Your cart is empty.</p>
        )}
      </div>

      <div className="flex flex-col py-2 lg:py-5">
        <div className="h-0 border border-lightgray"></div>
      </div>

      <div className="flex flex-col gap-2 lg:gap-5">
        <CustomerOrderSummaryLine
          label="Shipping"
          value={formatShopCurrency(summary.shipping)}
          valueClassName="text-sm poppins-bold lg:text-xl"
        />
        <CustomerOrderSummaryLine label="Discount 10%" value={`- ${formatShopCurrency(summary.discount)}`} />
        <CustomerOrderSummaryLine
          label="Price"
          value={formatShopCurrency(summary.subtotal)}
          valueClassName="text-xl poppins-bold"
        />
        <CustomerOrderSummaryLine
          label="Total Price"
          value={formatShopCurrency(summary.total)}
          valueClassName="text-xl text-yellow poppins-bold"
        />
        <div className="flex flex-col gap-1 py-2 lg:gap-3 lg:py-4">
          <div className="h-0 border border-lightgray"></div>
        </div>
        {showContinueButton ? (
          <div className="flex justify-center py-2 lg:py-4">
            <button
              type="button"
              className="text-center lg:text-xl text-sm poppins-bold text-gold bg-brown py-2 lg:px-20 px-5"
              onClick={onNext}
              disabled={buttonDisabled || !items.length}
            >
              {buttonLabel}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

CustomerOrderSummaryLine.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  valueClassName: PropTypes.string,
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
