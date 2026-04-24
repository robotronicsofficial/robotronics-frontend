import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YtVideos from "../../../component/course/courseDetailPage/ytVideos";
import { useActivateSubscriptionMutation } from "../../../hooks/useAccount";
import { formatDisplayDate } from "../../../lib/subscription";
import {
  formatCheckoutCurrency,
  loadSubscriptionCheckout,
  updateSubscriptionCheckout,
} from "../../../lib/subscriptionCheckout";

const ReviewRow = ({ label, value, highlight = false }) => (
  <div className="flex items-start justify-between gap-4">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className={`text-right text-sm ${highlight ? "font-bold text-foreground" : "text-foreground"}`}>
      {value}
    </p>
  </div>
);

const SubscriptionReviewCustomer = () => {
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(() => loadSubscriptionCheckout());
  const [activationError, setActivationError] = useState("");
  const activateSubscriptionMutation = useActivateSubscriptionMutation(checkout?.parent?.userId);

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
      setActivationError("");

      if (!checkout.plan?.planId || !checkout.plan?.billingCycle) {
        throw new Error("Subscription membership is missing. Start the membership checkout again.");
      }

      const result = await activateSubscriptionMutation.mutateAsync({
        planId: checkout.plan.planId,
        billingCycle: checkout.plan.billingCycle,
        childIds: checkout.children
          .map((child) => child.childCode || child._id)
          .filter(Boolean),
        payment: checkout.payment,
        checkoutReference: checkout.orderCode,
      });

      const confirmedCheckout = updateSubscriptionCheckout({
        status: "active",
        subscription: result.subscription,
        enrolledChildren: result.enrolledChildren,
      });
      setCheckout(confirmedCheckout);
    } catch (error) {
      setActivationError(error.message || "Failed to activate subscription");
    }
  };

  return (
    <div>
      <div className="grid gap-6 px-4 py-8 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-y-6 rounded-3xl bg-card p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-y-3">
            <p className="text-4xl font-bold text-foreground">Review Your Subscription</p>
            <p className="text-sm text-muted-foreground">
              One last check before the subscription is finalized for these children.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-foreground p-6 text-background">
              <p className="text-lg font-bold">Order Summary</p>
              <div className="flex flex-col mt-4 gap-y-4">
                <ReviewRow label="Order code" value={checkout.orderCode} />
                <ReviewRow label="Created" value={formatDisplayDate(checkout.orderDate)} />
                <ReviewRow label="Membership" value={checkout.plan.name || "Subscription"} />
                <ReviewRow label="Billing cycle" value={checkout.plan.billingCycle || "N/A"} />
                <ReviewRow
                  label="Payment method"
                  value={checkout.payment.label || "Not selected"}
                />
                <div className="border-t border-card/20 pt-4">
                  <ReviewRow
                    label="Total"
                    value={formatCheckoutCurrency(checkout.totalPrice)}
                    highlight
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-muted p-6">
              <p className="text-lg font-bold text-foreground">Parent Contact</p>
              <div className="flex flex-col mt-4 gap-y-4">
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

          <div className="flex flex-col gap-y-4">
            <p className="text-lg font-bold text-foreground">Registered Children</p>
            <div className="grid gap-4 md:grid-cols-2">
              {checkout.children.map((child) => (
                <div
                  key={child.childCode || `${child.firstName}-${child.lastName}`}
                  className="rounded-2xl border border-border bg-muted p-5"
                >
                  <p className="font-bold text-foreground">
                    {[child.firstName, child.lastName].filter(Boolean).join(" ") || "Student"}
                  </p>
                  {child.childCode ? (
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-accent">{child.childCode}</p>
                  ) : null}
                  <div className="flex flex-col mt-4 gap-y-2">
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
              className="rounded-full border border-foreground px-6 py-3 text-sm font-semibold text-foreground"
              onClick={() => navigate("/subscriptions/payment")}
            >
              Back to Payment
            </button>
            <button
              type="button"
              className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-primary"
              onClick={handleConfirmOrder}
              disabled={activateSubscriptionMutation.isPending}
            >
              {activateSubscriptionMutation.isPending ? "Activating..." : "Activate Subscription"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-y-6 rounded-3xl bg-muted p-6 shadow-sm md:p-10">
          <p className="text-2xl font-bold text-foreground">Subscription Status</p>
          {checkout.status === "active" ? (
            <div className="flex flex-col gap-y-4 rounded-2xl bg-card p-6">
              <p className="text-xl font-bold text-foreground">Subscription active</p>
              <p className="text-sm text-muted-foreground">
                The subscription is active and course access has been assigned to the registered children.
              </p>
              <div className="flex flex-col gap-y-3">
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
                  className="rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-primary"
                  onClick={() => navigate("/Dashboard/ChildProfile")}
                >
                  Open Child Dashboard
                </button>
                <button
                  type="button"
                  className="rounded-full border border-foreground px-5 py-3 text-sm font-semibold text-foreground"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-y-4 rounded-2xl bg-card p-6">
              <p className="text-lg font-bold text-foreground">Ready for confirmation</p>
              <p className="text-sm text-muted-foreground">
                Review the child and billing details on the left, then activate the subscription once everything matches.
              </p>
              <div className="flex flex-col gap-y-3">
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
                <p className="rounded-2xl bg-destructive/10 p-3 text-sm font-semibold text-destructive">
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
