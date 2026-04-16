import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomerOrder from "./customerOrder";
import {
  calculateCartSummary,
  formatShopCurrency,
  hasCheckoutAddress,
  hasCheckoutPayment,
  loadShopCheckout,
} from "../../lib/shopCheckout";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";

const ShopShipping = ({ onEditCustomer, onEditPayment }) => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const checkout = useMemo(() => loadShopCheckout(), []);
  const summary = calculateCartSummary(cart);
  const addressReady = hasCheckoutAddress(checkout.address);
  const paymentReady = hasCheckoutPayment(checkout.payment);

  const handleEditCustomer = () => {
    if (onEditCustomer) {
      onEditCustomer();
      return;
    }

    navigate("/CustomerInfo");
  };

  const handleEditPayment = () => {
    if (onEditPayment) {
      onEditPayment();
      return;
    }

    navigate("/ShippingService");
  };

  return (
    <div className="lg:flex flex-row bg-gray gap-6">
      <div className="lg:pt-8 pt-4 lg:space-y-12 space-y-8 lg:w-2/3">
        <div className="lg:space-y-6 space-y-4">
          <p className="lg:text-4xl text-2xl poppins-bold text-brown">CHECKOUT SUMMARY</p>
          <p className="font-lato font-medium text-base leading-5 text-[#7E7F7C]">
            Review the address, delivery service, payment reference, and products for this order.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="bg-brown p-5 space-y-4 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg poppins-extrabold">DELIVERY ADDRESS</p>
                <p className="text-sm poppins-light">Saved shipping details for this order.</p>
              </div>
              <button
                type="button"
                className="border border-white px-3 py-2 text-xs uppercase tracking-wide"
                onClick={handleEditCustomer}
              >
                Edit
              </button>
            </div>

            {addressReady ? (
              <div className="space-y-2 text-sm poppins-light">
                <p className="text-base poppins-extrabold">
                  {checkout.address.firstName} {checkout.address.lastName}
                </p>
                <p>{checkout.address.phone}</p>
                <p>{checkout.address.streetAddress}</p>
                {checkout.address.aptSuite ? <p>{checkout.address.aptSuite}</p> : null}
                <p>
                  {checkout.address.city}, {checkout.address.state}, {checkout.address.country}
                </p>
                <p>{checkout.address.postalCode}</p>
                {checkout.address.deliveryInstruction ? (
                  <p>Instruction: {checkout.address.deliveryInstruction}</p>
                ) : null}
              </div>
            ) : (
              <p className="text-sm poppins-light">
                No shipping address is saved yet for this checkout.
              </p>
            )}
          </section>

          <section className="bg-white p-5 space-y-4 border border-lightgray text-brown">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg poppins-extrabold">PAYMENT DETAILS</p>
                <p className="text-sm poppins-light">Saved billing method and courier selection.</p>
              </div>
              <button
                type="button"
                className="bg-brown px-3 py-2 text-xs uppercase tracking-wide text-gold"
                onClick={handleEditPayment}
              >
                Edit
              </button>
            </div>

            {paymentReady ? (
              <div className="space-y-2 text-sm poppins-light">
                <p>
                  <span className="font-semibold">Shipping service:</span>{" "}
                  {checkout.payment.shippingService}
                </p>
                <p>
                  <span className="font-semibold">Payment method:</span>{" "}
                  {checkout.payment.paymentMethod}
                </p>
                <p>
                  <span className="font-semibold">Billing email:</span>{" "}
                  {checkout.payment.billingEmail}
                </p>
                <p>
                  <span className="font-semibold">Account ending:</span>{" "}
                  **** {checkout.payment.accountLast4}
                </p>
                {checkout.payment.expiryMonth && checkout.payment.expiryYear ? (
                  <p>
                    <span className="font-semibold">Expiry:</span>{" "}
                    {checkout.payment.expiryMonth}/{checkout.payment.expiryYear}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="text-sm poppins-light">
                No payment method is saved yet for this checkout.
              </p>
            )}
          </section>
        </div>

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-2xl text-brown poppins-bold">ORDER ITEMS</p>
              <p className="text-sm text-[#7E7F7C]">
                These items are currently in your cart and included in the checkout summary.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {cart.length > 0 ? (
              cart.map((product) => (
                <div
                  className="flex flex-row space-x-3 border border-lightgray bg-white p-4"
                  key={product._id || product.id}
                >
                  <img
                    className="lg:h-24 lg:w-28 object-cover"
                    src={resolveBackendAssetUrl(
                      product?.images?.[0],
                      "https://via.placeholder.com/300x200"
                    )}
                    alt={product.name}
                  />
                  <div className="flex flex-col gap-1 text-sm text-brown">
                    <p className="font-bold">{product.name}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>{formatShopCurrency(product.price)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="border border-dashed border-[#BCBABA] bg-white p-4 text-sm text-brown">
                Your cart is empty.
              </div>
            )}
          </div>
        </section>

        <section className="border border-lightgray bg-white p-5 space-y-4 text-brown">
          <p className="text-xl poppins-bold">TOTALS</p>
          <SummaryRow label="Shipping" value={formatShopCurrency(summary.shipping)} />
          <SummaryRow label="Discount 10%" value={`- ${formatShopCurrency(summary.discount)}`} />
          <SummaryRow label="Price" value={formatShopCurrency(summary.subtotal)} />
          <SummaryRow label="Total Price" value={formatShopCurrency(summary.total)} highlight />
        </section>
      </div>

      <div className="pt-4">
        <div className="h-full w-0 border border-[#D4D4D4]"></div>
      </div>

      <div className="lg:w-1/3">
        <CustomerOrder
          onNext={paymentReady ? handleEditPayment : handleEditPayment}
          buttonLabel={paymentReady ? "UPDATE PAYMENT DETAILS" : "ADD PAYMENT DETAILS"}
        />
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value, highlight = false }) => (
  <div className="flex justify-between">
    <p className="text-[#7E7F7C] font-lato text-base">{label}</p>
    <p
      className={`font-lato text-[20px] font-extrabold ${
        highlight ? "text-yellow" : "text-[#362D2C]"
      }`}
    >
      {value}
    </p>
  </div>
);

export default ShopShipping;
