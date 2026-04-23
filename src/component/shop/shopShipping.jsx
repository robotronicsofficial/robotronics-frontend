import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CustomerOrder from "./customerOrder";
import {
  buildShopCheckoutIntentRequest,
  calculateCartSummary,
  clearShopCheckout,
  formatShopCurrency,
  hasCheckoutCustomer,
  hasCheckoutAddress,
  hasCheckoutPayment,
  loadShopCheckout,
} from "../../lib/shopCheckout";
import { hasShippableCommerceItems } from "../../lib/commerceItems";
import { clearCart } from "../../store/cart/cartSlice";
import { useAuth } from "../../contexts/AuthContext";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";

import { BACKEND_BASE_URL } from "../../lib/api";
const ShopShipping = ({ onEditCustomer, onEditPayment }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { cart } = useSelector((state) => state.cart);
  const checkout = useMemo(() => loadShopCheckout(), []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [submittedIntent, setSubmittedIntent] = useState(null);
  const summary = calculateCartSummary(cart);
  const requiresShipping = submittedIntent
    ? hasShippableCommerceItems(submittedIntent.items)
    : summary.requiresShipping;
  const customerReady = hasCheckoutCustomer(checkout.customer);
  const addressReady = hasCheckoutAddress(checkout.address, { requiresShipping });
  const paymentReady = hasCheckoutPayment(checkout.payment, { requiresShipping });
  const displayItems = submittedIntent?.items || cart;
  const displaySummary = submittedIntent?.pricing || summary;

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

  const handleSubmitCheckoutIntent = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (!customerReady || (requiresShipping && !addressReady)) {
      handleEditCustomer();
      return;
    }

    if (!paymentReady) {
      handleEditPayment();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/api/shop-checkout-intents`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            buildShopCheckoutIntentRequest({
              checkout,
              cart,
            }),
          ),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit checkout intent");
      }

      setSubmittedIntent(data.checkoutIntent || null);
      setSubmitStatus({
        type: "success",
        message: data.message || "Checkout intent submitted successfully.",
      });
      clearShopCheckout();
      dispatch(clearCart());
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to submit checkout intent.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:flex flex-row bg-gray gap-6">
      <div className="lg:pt-8 pt-4 lg:space-y-12 space-y-8 lg:w-2/3">
        <div className="lg:space-y-6 space-y-4">
          <p className="lg:text-4xl text-2xl poppins-bold text-brown">CHECKOUT SUMMARY</p>
          <p className="font-lato font-medium text-base leading-5 text-[#7E7F7C]">
            Review the saved customer details, fulfillment requirements, locally saved payment reference, and items for this checkout draft.
          </p>
        </div>

        <div className="rounded-[20px] border border-[#E6D7B8] bg-[#FFF8E8] p-4 text-sm text-brown">
          {submittedIntent
            ? "This checkout request has been submitted to Robotronics for follow-up and CRM handling."
            : "Review the saved checkout details, then submit the order request so Robotronics can process it in CRM."}
        </div>

        {submitStatus.message ? (
          <div
            className={`rounded-[20px] border p-4 text-sm ${
              submitStatus.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {submitStatus.message}
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="bg-brown p-5 space-y-4 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg poppins-extrabold">
                  {requiresShipping ? "DELIVERY DETAILS" : "CUSTOMER DETAILS"}
                </p>
                <p className="text-sm poppins-light">
                  {requiresShipping
                    ? "Saved customer and delivery details for this order."
                    : "Saved customer details for this digital order."}
                </p>
              </div>
              <button
                type="button"
                className="border border-white px-3 py-2 text-xs uppercase tracking-wide"
                onClick={handleEditCustomer}
              >
                Edit
              </button>
            </div>

            {customerReady || submittedIntent ? (
              <div className="space-y-2 text-sm poppins-light">
                <p className="text-base poppins-extrabold">
                  {submittedIntent?.customer?.name || `${checkout.customer?.firstName || ""} ${checkout.customer?.lastName || ""}`.trim()}
                </p>
                <p>{submittedIntent?.customer?.phone || checkout.customer?.phone}</p>
                {requiresShipping ? (
                  <>
                    <p>{submittedIntent?.address?.streetAddress || checkout.address?.streetAddress}</p>
                    {(submittedIntent?.address?.aptSuite || checkout.address?.aptSuite) ? (
                      <p>{submittedIntent?.address?.aptSuite || checkout.address?.aptSuite}</p>
                    ) : null}
                    <p>
                      {submittedIntent?.address?.city || checkout.address?.city},{" "}
                      {submittedIntent?.address?.state || checkout.address?.state},{" "}
                      {submittedIntent?.address?.country || checkout.address?.country}
                    </p>
                    <p>{submittedIntent?.address?.postalCode || checkout.address?.postalCode}</p>
                    {(submittedIntent?.address?.deliveryInstruction || checkout.address?.deliveryInstruction) ? (
                      <p>
                        Instruction:{" "}
                        {submittedIntent?.address?.deliveryInstruction || checkout.address?.deliveryInstruction}
                      </p>
                    ) : null}
                  </>
                ) : (
                  <p>No shipping address is required for this order.</p>
                )}
              </div>
            ) : (
              <p className="text-sm poppins-light">
                No customer details are saved yet for this checkout.
              </p>
            )}
          </section>

          <section className="bg-white p-5 space-y-4 border border-lightgray text-brown">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg poppins-extrabold">PAYMENT DETAILS</p>
                <p className="text-sm poppins-light">Saved locally in this browser for the current checkout draft.</p>
              </div>
              <button
                type="button"
                className="bg-brown px-3 py-2 text-xs uppercase tracking-wide text-gold"
                onClick={handleEditPayment}
              >
                Edit
              </button>
            </div>

            {paymentReady || submittedIntent ? (
              <div className="space-y-2 text-sm poppins-light">
                {requiresShipping ? (
                  <p>
                    <span className="font-semibold">Shipping service:</span>{" "}
                    {submittedIntent?.payment?.shippingService || checkout.payment.shippingService}
                  </p>
                ) : null}
                <p>
                  <span className="font-semibold">Payment method:</span>{" "}
                  {submittedIntent?.payment?.paymentMethod || checkout.payment.paymentMethod}
                </p>
                <p>
                  <span className="font-semibold">Billing email:</span>{" "}
                  {submittedIntent?.payment?.billingEmail || checkout.payment.billingEmail}
                </p>
                <p>
                  <span className="font-semibold">Account ending:</span>{" "}
                  **** {submittedIntent?.payment?.accountLast4 || checkout.payment.accountLast4}
                </p>
                {(submittedIntent?.payment?.expiryMonth || checkout.payment.expiryMonth) &&
                (submittedIntent?.payment?.expiryYear || checkout.payment.expiryYear) ? (
                  <p>
                    <span className="font-semibold">Expiry:</span>{" "}
                    {submittedIntent?.payment?.expiryMonth || checkout.payment.expiryMonth}/
                    {submittedIntent?.payment?.expiryYear || checkout.payment.expiryYear}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="text-sm poppins-light">
                No local payment details are saved yet for this checkout.
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
            {displayItems.length > 0 ? (
              displayItems.map((product) => (
                <div
                  className="flex flex-row space-x-3 border border-lightgray bg-white p-4"
                  key={`${product.itemType}:${product.itemId}`}
                >
                  <img
                    className="lg:h-24 lg:w-28 object-cover"
                    src={resolveBackendAssetUrl(
                      product?.image || product?.images?.[0],
                      "https://via.placeholder.com/300x200"
                    )}
                    alt={product.name}
                  />
                  <div className="flex flex-col gap-1 text-sm text-brown">
                    <p className="font-bold">{product.name}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>{formatShopCurrency(product.price ?? product.unitPrice)}</p>
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
          <SummaryRow label="Shipping" value={formatShopCurrency(displaySummary.shipping)} />
          <SummaryRow label="Discount 10%" value={`- ${formatShopCurrency(displaySummary.discount)}`} />
          <SummaryRow label="Price" value={formatShopCurrency(displaySummary.subtotal)} />
          <SummaryRow label="Total Price" value={formatShopCurrency(displaySummary.total)} highlight />
        </section>
      </div>

      <div className="pt-4">
        <div className="h-full w-0 border border-[#D4D4D4]"></div>
      </div>

      <div className="lg:w-1/3">
        <CustomerOrder
          onNext={handleSubmitCheckoutIntent}
          buttonDisabled={isSubmitting || Boolean(submittedIntent)}
          buttonLabel={
            submittedIntent
              ? "ORDER REQUEST SUBMITTED"
              : isSubmitting
                ? "SUBMITTING ORDER REQUEST..."
                : paymentReady
                  ? "SUBMIT ORDER REQUEST"
                  : "ADD PAYMENT DETAILS"
          }
          itemsOverride={displayItems}
          summaryOverride={displaySummary}
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
