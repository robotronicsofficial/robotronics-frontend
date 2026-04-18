import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YtVideos from "../../../component/course/courseDetailPage/ytVideos";
import { formatDisplayDate } from "../../../lib/robogenius";
import {
  formatCheckoutCurrency,
  loadRobogeniusCheckout,
  updateRobogeniusCheckout,
} from "../../../lib/robogeniusCheckout";

const ReviewRow = ({ label, value, highlight = false }) => (
  <div className="flex items-start justify-between gap-4">
    <p className="text-sm text-[#7E7F7C]">{label}</p>
    <p className={`text-right text-sm ${highlight ? "font-bold text-[#362D2C]" : "text-[#362D2C]"}`}>
      {value}
    </p>
  </div>
);

const Robogeniusreviewcustomer = () => {
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(() => loadRobogeniusCheckout());

  useEffect(() => {
    const savedCheckout = loadRobogeniusCheckout();
    if (!savedCheckout?.children?.length || !savedCheckout?.plan?.name) {
      navigate("/Robogeniushome/Register", { replace: true });
      return;
    }

    setCheckout(savedCheckout);
  }, [navigate]);

  if (!checkout) {
    return null;
  }

  const handleConfirmOrder = () => {
    const confirmedCheckout = updateRobogeniusCheckout({ status: "details-confirmed" });
    setCheckout(confirmedCheckout);
  };

  return (
    <div>
      <div className="grid gap-6 px-4 py-8 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-[24px] bg-white p-6 shadow-sm md:p-10">
          <div className="space-y-3">
            <p className="text-4xl font-bold text-brown">Review Your Subscription</p>
            <p className="text-sm text-[#7E7F7C]">
              One last check before the RoboGenius subscription is finalized for these children.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[20px] bg-[#362D2C] p-6 text-white">
              <p className="text-lg font-bold">Order Summary</p>
              <div className="mt-4 space-y-4">
                <ReviewRow label="Order code" value={checkout.orderCode} />
                <ReviewRow label="Created" value={formatDisplayDate(checkout.orderDate)} />
                <ReviewRow label="Plan" value={checkout.plan.name || "Subscription"} />
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
                  key={child.roboChildId || `${child.firstName}-${child.lastName}`}
                  className="rounded-[20px] border border-[#E6E0DA] bg-[#FAF8F6] p-5"
                >
                  <p className="font-bold text-[#362D2C]">
                    {[child.firstName, child.lastName].filter(Boolean).join(" ") || "Student"}
                  </p>
                  {child.roboChildId ? (
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#9E7A3A]">{child.roboChildId}</p>
                  ) : null}
                  <div className="mt-4 space-y-2">
                    <ReviewRow label="Email" value={child.email || "N/A"} />
                    <ReviewRow label="School" value={child.schoolName || "N/A"} />
                    <ReviewRow label="Plan" value={child.plan?.name || checkout.plan.name || "N/A"} />
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
              onClick={() => navigate("/Robogeniushome/Payment")}
            >
              Back to Payment
            </button>
            <button
              type="button"
              className="rounded-full bg-[#362D2C] px-6 py-3 text-sm font-semibold text-[#F5AB34]"
              onClick={handleConfirmOrder}
            >
              Save Review Details
            </button>
          </div>
        </div>

        <div className="space-y-6 rounded-[24px] bg-[#EEE8E4] p-6 shadow-sm md:p-10">
          <p className="text-2xl font-bold text-[#362D2C]">Subscription Status</p>
          {checkout.status === "details-confirmed" ? (
            <div className="space-y-4 rounded-[20px] bg-white p-6">
              <p className="text-xl font-bold text-[#362D2C]">Review details saved</p>
              <p className="text-sm text-[#7E7F7C]">
                These billing details are saved in this browser for review. This step does not create a backend payment record or invoice.
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
                Review the child and billing details on the left, then save this review state once everything matches.
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
            </div>
          )}
        </div>
      </div>

      <YtVideos />
    </div>
  );
};

export default Robogeniusreviewcustomer;
