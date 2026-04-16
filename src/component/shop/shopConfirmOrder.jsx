import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  calculateCartSummary,
  formatShopCurrency,
  hasCheckoutAddress,
  hasCheckoutPayment,
  loadShopCheckout,
} from "../../lib/shopCheckout";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";

const ShopConfirmOrder = ({ onNext, buttonLabel = "CONTINUE TO SHIPPING" }) => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const checkout = useMemo(() => loadShopCheckout(), []);
  const summary = calculateCartSummary(cart);
  const hasAddress = hasCheckoutAddress(checkout.address);
  const hasPayment = hasCheckoutPayment(checkout.payment);

  const handleContinue = () => {
    if (onNext) {
      onNext();
      return;
    }

    navigate("/Shipping");
  };

  return (
    <div className="lg:px-14 px-5 lg:py-8 py-4 lg:w-1/3 space-y-8 w-full">
      <div className="space-y-4 text-center lg:text-left">
        <p className="lg:text-4xl text-2xl font-bold">ORDER REVIEW</p>
        <p className="text-sm text-gray-600">
          Review the live cart, address, and payment details before continuing.
        </p>
      </div>

      <div className="space-y-6">
        {cart.length > 0 ? (
          cart.map((product) => (
            <div key={product._id || product.id} className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
              <img
                src={resolveBackendAssetUrl(product?.images?.[0], "https://via.placeholder.com/300x200")}
                alt={product?.name || "Product"}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded object-cover"
              />
              <div className="text-center sm:text-left">
                <p className="font-bold">{product?.name || "Product"}</p>
                <p className="text-sm">Quantity: {product?.quantity || 1}</p>
                <p className="text-sm">Price: {formatShopCurrency(product?.price)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-600">
            Your cart is empty.
          </div>
        )}
      </div>

      <div className="border-t border-gray-300 py-2" />

      <div className="space-y-4">
        <SummaryLine label="Shipping" value={formatShopCurrency(summary.shipping)} />
        <SummaryLine label="Discount 10%" value={`- ${formatShopCurrency(summary.discount)}`} />
        <SummaryLine label="Price" value={formatShopCurrency(summary.subtotal)} />
        <SummaryLine label="Total Price" value={formatShopCurrency(summary.total)} highlight />
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm font-bold text-brown">Saved checkout details</p>
        {hasAddress ? (
          <div className="text-sm text-gray-700">
            <p className="font-semibold">
              {checkout.address.firstName} {checkout.address.lastName}
            </p>
            <p>{checkout.address.phone}</p>
            <p>{checkout.address.streetAddress}</p>
            <p>
              {checkout.address.city}, {checkout.address.state}, {checkout.address.country}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-600">No shipping address is saved yet.</p>
        )}
        {hasPayment ? (
          <div className="text-sm text-gray-700">
            <p>{checkout.payment.shippingService}</p>
            <p>{checkout.payment.paymentMethod}</p>
            <p>{checkout.payment.billingEmail}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-600">No payment method is saved yet.</p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleContinue}
          className="bg-brown text-white px-6 py-2 text-sm lg:text-lg rounded-lg"
          disabled={!cart.length}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

const SummaryLine = ({ label, value, highlight = false }) => (
  <div className="flex justify-between">
    <p className="text-sm">{label}</p>
    <p className={`font-bold ${highlight ? "text-yellow-600" : ""}`}>{value}</p>
  </div>
);

export default ShopConfirmOrder;
