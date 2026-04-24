import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YtVideos from "../../../component/course/courseDetailPage/ytVideos";
import { sendSessionJson } from "../../../lib/api";
import { formatDisplayDate } from "../../../lib/subscription";
import {
  formatCheckoutCurrency,
  loadSubscriptionCheckout,
  updateSubscriptionCheckout,
} from "../../../lib/subscriptionCheckout";

const ReviewRow = ({ label, value, highlight = false }) => (
  <div className="flex items-start justify-between gap-4">
    <p className="text-sm text-[#7E7F7C]">{label}</p>
    <p className={`text-right text-sm ${highlight ? "font-bold text-[#362D2C]" : "text-[#362D2C]"}`}>
      {value}
    </p>
  </div>
);

const SubscriptionReviewCustomer = () => {
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(() => loadSubscriptionCheckout());
  const [activating, setActivating] = useState(false);
  const [activationError, setActivationError] = useState("");

  useEffect(() => {
    const savedCheckout = loadSubscriptionCheckout();
    if (!savedCheckout?.children?.length || !savedCheckout?.plan?.name) {
      navigate("/subscriptions/register", { replace: true });
      return;
    }

    setCheckout(savedCheckout);
  }, [navigate]);

  if (!checkout) {
    return null;
  }

  const handleConfirmOrder = async () => {
    try {
      setActivating(true);
      setActivationError("");

      if (!checkout.plan?.planId || !checkout.plan?.billingCycle) {
        throw new Error("Subscription membership is missing. Start the membership checkout again.");
      }

      const result = await sendSessionJson("/api/subscriptions/activate", {
        method: "POST",
        body: {
          planId: checkout.plan.planId,
          billingCycle: checkout.plan.billingCycle,
          childIds: checkout.children
            .map((child) => child.childCode || child._id)
            .filter(Boolean),
          payment: checkout.payment,
          checkoutReference: checkout.orderCode,
        },
      });

      const confirmedCheckout = updateSubscriptionCheckout({
        status: "active",
        subscription: result.subscription,
        enrolledChildren: result.enrolledChildren,
      });
      setCheckout(confirmedCheckout);
    } catch (error) {
      setActivationError(error.message || "Failed to activate subscription");
    } finally {
      setActivating(false);
    }
  };

  return (
    <div>
      <div className="grid gap-6 px-4 py-8 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-[24px] bg-white p-6 shadow-sm md:p-10">
          <div className="space-y-3">
            <p className="text-4xl font-bold text-brown">Review Your Subscription</p>
            <p className="text-sm text-[#7E7F7C]">
              One last check before the subscription is finalized for these children.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[20px] bg-[#362D2C] p-6 text-white">
              <p className="text-lg font-bold">Order Summary</p>
              <div className="mt-4 space-y-4">
                <ReviewRow label="Order code" value={checkout.orderCode} />
                <ReviewRow label="Created" value={formatDisplayDate(checkout.orderDate)} />
                <ReviewRow label="Membership" value={checkout.plan.name || "Subscription"} />
                <ReviewRow label="Billing cycle" value={checkout.plan.billingCycle || "N/A"} />
                <ReviewRow
                  label="Payment method"
                  value={checkout.payment.label || "Not selected"}
                />
                <div className="border-t border-white/20 pt-4">
                  <ReviewRow
                    label="Total"
                    value={formatCheckoutCurrency(checkout.totalPrice)}
                    highlight
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[20px] bg-[#F5F3F1] p-6">
              <p className="text-lg font-bold text-[#362D2C]">Parent Contact</p>
              <div className="mt-4 space-y-4">
                <ReviewRow
                  label="Name"
                  value={[checkout.parent.firstName, checkout.parent.lastName].filter(Boolean).join(" ") || "N/A"}
                />
                <ReviewRow label="Email" value={checkout.parent.email || "N/A"} />
                <ReviewRow label="Phone" value={checkout.parent.phone || "N/A"} />
                <ReviewRow
                  label="Address"
                  value={[
                    checkout.parent.streetAddress,
                    checkout.parent.city,
                    checkout.parent.state,
                    checkout.parent.postalCode,
                    checkout.parent.country,
                  ]
                    .filter(Boolean)
                    .join(", ") || "N/A"}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-lg font-bold text-[#362D2C]">Registered Children</p>
            <div className="grid gap-4 md:grid-cols-2">
              {checkout.children.map((child) => (
                <div
                  key={child.childCode || `${child.firstName}-${child.lastName}`}
                  className="rounded-[20px] border border-[#E6E0DA] bg-[#FAF8F6] p-5"
                >
                  <p className="font-bold text-[#362D2C]">
                    {[child.firstName, child.lastName].filter(Boolean).join(" ") || "Student"}
                  </p>
                  {child.childCode ? (
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#9E7A3A]">{child.childCode}</p>
                  ) : null}
                  <div className="mt-4 space-y-2">
                    <ReviewRow label="Email" value={child.email || "N/A"} />
                    <ReviewRow label="School" value={child.schoolName || "N/A"} />
                    <ReviewRow label="Membership" value={child.plan?.name || checkout.plan.name || "N/A"} />
                    <ReviewRow
                      label="Charge"
                      value={formatCheckoutCurrency(child.plan?.price || checkout.plan.price)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-full border border-[#362D2C] px-6 py-3 text-sm font-semibold text-[#362D2C]"
              onClick={() => navigate("/subscriptions/payment")}
            >
              Back to Payment
            </button>
            <button
              type="button"
              className="rounded-full bg-[#362D2C] px-6 py-3 text-sm font-semibold text-[#F5AB34]"
              onClick={handleConfirmOrder}
              disabled={activating}
            >
              {activating ? "Activating..." : "Activate Subscription"}
            </button>
          </div>
        </div>

        <div className="space-y-6 rounded-[24px] bg-[#EEE8E4] p-6 shadow-sm md:p-10">
          <p className="text-2xl font-bold text-[#362D2C]">Subscription Status</p>
          {checkout.status === "active" ? (
            <div className="space-y-4 rounded-[20px] bg-white p-6">
              <p className="text-xl font-bold text-[#362D2C]">Subscription active</p>
              <p className="text-sm text-[#7E7F7C]">
                The subscription is active and course access has been assigned to the registered children.
              </p>
              <div className="space-y-3">
                <ReviewRow label="Order code" value={checkout.orderCode} />
                <ReviewRow label="Children" value={checkout.totalChildren} />
                <ReviewRow
                  label="Payment method"
                  value={checkout.payment.label || "Not selected"}
                />
                <ReviewRow
                  label="Checkout total"
                  value={formatCheckoutCurrency(checkout.totalPrice)}
                  highlight
                />
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  className="rounded-full bg-[#362D2C] px-5 py-3 text-sm font-semibold text-[#F5AB34]"
                  onClick={() => navigate("/Dashboard/ChildProfile")}
                >
                  Open Child Dashboard
                </button>
                <button
                  type="button"
                  className="rounded-full border border-[#362D2C] px-5 py-3 text-sm font-semibold text-[#362D2C]"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 rounded-[20px] bg-white p-6">
              <p className="text-lg font-bold text-[#362D2C]">Ready for confirmation</p>
              <p className="text-sm text-[#7E7F7C]">
                Review the child and billing details on the left, then activate the subscription once everything matches.
              </p>
              <div className="space-y-3">
                <ReviewRow
                  label="Payment method"
                  value={checkout.payment.label || "Not selected"}
                />
                <ReviewRow
                  label="Billing email"
                  value={checkout.payment.email || checkout.parent.email || "N/A"}
                />
                <ReviewRow
                  label="Saved account"
                  value={
                    checkout.payment.cardLast4
                      ? `•••• ${checkout.payment.cardLast4}`
                      : "No billing account saved"
                  }
                />
              </div>
              {activationError ? (
                <p className="rounded-[16px] bg-red-50 p-3 text-sm font-semibold text-red-700">
                  {activationError}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <YtVideos />
    </div>
  );
};

export default SubscriptionReviewCustomer;
