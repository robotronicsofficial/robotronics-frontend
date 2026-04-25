import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import YtVideos from "../../../component/course/courseDetailPage/ytVideos";
import { useActivateSubscriptionMutation } from "../../../hooks/useAccount";
import { formatDisplayDate } from "../../../lib/subscription";
import {
  formatCheckoutCurrency,
  loadSubscriptionCheckout,
  updateSubscriptionCheckout,
} from "../../../lib/subscriptionCheckout";
import { Button } from "@/components/ui/button";

const SummaryLine = ({ label, value, highlight = false }) => (
  <div className="flex items-start justify-between gap-4">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p
      className={`text-right text-sm ${
        highlight ? "font-bold text-foreground" : "text-foreground"
      }`}
    >
      {value}
    </p>
  </div>
);

SummaryLine.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  highlight: PropTypes.bool,
};

const SubscriptionReviewCustomer = () => {
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(() => loadSubscriptionCheckout());
  const [activationError, setActivationError] = useState("");
  const activateSubscriptionMutation = useActivateSubscriptionMutation(
    checkout?.parent?.userId
  );

  if (!checkout) {
    return (
      <div className="px-6 py-12 text-center text-foreground">
        Loading checkout...
      </div>
    );
  }

  const isActive = checkout.status === "active";

  const handleConfirmOrder = async () => {
    try {
      setActivationError("");

      if (!checkout.plan?.planId || !checkout.plan?.billingCycle) {
        throw new Error(
          "Subscription plan is missing. Start the subscription checkout again."
        );
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

  const childrenLabel = checkout.children
    .map((child) =>
      [child.firstName, child.lastName].filter(Boolean).join(" ")
    )
    .filter(Boolean)
    .join(", ");

  const addressLine =
    [
      checkout.parent.streetAddress,
      checkout.parent.city,
      checkout.parent.state,
      checkout.parent.postalCode,
      checkout.parent.country,
    ]
      .filter(Boolean)
      .join(", ") || "N/A";

  if (isActive) {
    return (
      <div>
        <div className="flex justify-center px-4 py-10 md:px-10">
          <div className="flex w-full max-w-xl flex-col gap-y-6 rounded-3xl border border-border bg-card p-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-success" />
              <p className="text-2xl font-bold text-foreground">
                Subscription active
              </p>
            </div>
            <p className="text-sm text-muted-foreground poppins-light">
              The subscription is active and course access has been assigned to
              the registered children.
            </p>
            <div className="flex flex-col gap-y-3 rounded-2xl bg-muted p-5">
              <SummaryLine label="Order code" value={checkout.orderCode} />
              <SummaryLine label="Children" value={checkout.totalChildren} />
              <SummaryLine
                label="Payment method"
                value={checkout.payment.label || "Not selected"}
              />
              <SummaryLine
                label="Checkout total"
                value={formatCheckoutCurrency(checkout.totalPrice)}
                highlight
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                className="h-auto rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-primary"
                onClick={() => navigate({ to: "/Dashboard/ChildProfile" })}
              >
                Open Child Dashboard
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-auto rounded-full border-foreground px-5 py-3 text-sm font-semibold text-foreground"
                onClick={() => navigate({ to: "/" })}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
        <YtVideos />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center px-4 py-8 md:px-10">
        <div className="flex w-full max-w-2xl flex-col gap-y-6 rounded-3xl border border-border bg-card p-6 md:p-10">
          <div className="flex flex-col gap-y-2">
            <p className="text-2xl md:text-3xl font-bold text-foreground poppins-bold">
              Confirm your subscription
            </p>
            <p className="text-sm text-muted-foreground poppins-light">
              Everything looks right? Confirm to activate access for your child.
            </p>
          </div>

          <div className="flex flex-col gap-y-4 rounded-2xl bg-muted p-5">
	            <SummaryLine
	              label="Subscription plan"
	              value={checkout.plan.name || "Subscription"}
	            />
            <SummaryLine
              label="Billing cycle"
              value={checkout.plan.billingCycle || "N/A"}
            />
            <SummaryLine label="Order code" value={checkout.orderCode} />
            <SummaryLine
              label="Order date"
              value={formatDisplayDate(checkout.orderDate)}
            />
            <SummaryLine
              label="Children"
              value={childrenLabel || checkout.totalChildren}
            />
            <SummaryLine
              label="Parent"
              value={
                [checkout.parent.firstName, checkout.parent.lastName]
                  .filter(Boolean)
                  .join(" ") || "N/A"
              }
            />
            <SummaryLine
              label="Contact"
              value={checkout.parent.email || checkout.parent.phone || "N/A"}
            />
            <SummaryLine label="Billing address" value={addressLine} />
            <SummaryLine
              label="Payment method"
              value={
                checkout.payment.cardLast4
                  ? `${checkout.payment.label || "Card"} •••• ${checkout.payment.cardLast4}`
                  : checkout.payment.label || "Not selected"
              }
            />
            <div className="border-t border-border pt-4">
              <SummaryLine
                label="Total"
                value={formatCheckoutCurrency(checkout.totalPrice)}
                highlight
              />
            </div>
          </div>

          {activationError ? (
            <p className="rounded-2xl bg-destructive/10 p-3 text-sm font-semibold text-destructive">
              {activationError}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              className="text-sm font-semibold text-foreground underline underline-offset-4 poppins-light"
              onClick={() => navigate({ to: "/subscriptions/payment" })}
            >
              Edit details
            </button>
            <Button
              type="button"
              className="h-auto rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-primary"
              onClick={handleConfirmOrder}
              disabled={activateSubscriptionMutation.isPending}
            >
              {activateSubscriptionMutation.isPending
                ? "Confirming..."
                : "Confirm subscription"}
            </Button>
          </div>
        </div>
      </div>

      <YtVideos />
    </div>
  );
};

export default SubscriptionReviewCustomer;
