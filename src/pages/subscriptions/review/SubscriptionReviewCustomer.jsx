import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Display, Heading, Text } from "@/components/ui/typography";
import { useActivateSubscriptionMutation } from "../../../hooks/useAccount";
import { formatDisplayDate } from "../../../lib/subscription";
import {
  formatCheckoutCurrency,
  loadSubscriptionCheckout,
  updateSubscriptionCheckout,
} from "../../../lib/subscriptionCheckout";

const SummaryLine = ({ label, value, highlight = false }) => (
  <div className="flex items-start justify-between gap-4">
    <Text size="sm" tone="muted">{label}</Text>
    <Text
      size="sm"
      weight={highlight ? "semibold" : "regular"}
      className="text-right"
    >
      {value}
    </Text>
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
    checkout?.parent?.userId,
  );

  if (!checkout) {
    return (
      <Container size="wide" className="py-12">
        <Text tone="muted" className="text-center">
          Loading checkout…
        </Text>
      </Container>
    );
  }

  const isActive = checkout.status === "active";

  const handleConfirmOrder = async () => {
    try {
      setActivationError("");

      if (!checkout.plan?.planId || !checkout.plan?.billingCycle) {
        throw new Error(
          "Subscription plan is missing. Start the subscription checkout again.",
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
      [child.firstName, child.lastName].filter(Boolean).join(" "),
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
      <Container size="wide" className="py-10">
        <div className="flex justify-center">
          <Card className="w-full max-w-xl">
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-7 text-success" aria-hidden="true" />
                <Display size="md">Subscription active</Display>
              </div>
              <Text tone="muted">
                The subscription is active and course access has been assigned to
                the registered children.
              </Text>
              <div className="flex flex-col gap-3 rounded-2xl bg-muted p-5">
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
                  onClick={() => navigate({ to: "/Dashboard/ChildProfile" })}
                >
                  Open child dashboard
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate({ to: "/" })}
                >
                  Back to home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

  return (
    <Container size="wide" className="py-8">
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Heading level={2} className="text-h3">
                Confirm your subscription
              </Heading>
              <Text tone="muted">
                Everything looks right? Confirm to activate access for your child.
              </Text>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl bg-muted p-5">
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

            {activationError && (
              <Alert variant="destructive">
                <AlertDescription>{activationError}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate({ to: "/subscriptions/payment" })}
                className="self-start"
              >
                Edit details
              </Button>
              <Button
                type="button"
                onClick={handleConfirmOrder}
                disabled={activateSubscriptionMutation.isPending}
              >
                {activateSubscriptionMutation.isPending
                  ? "Confirming…"
                  : "Confirm subscription"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default SubscriptionReviewCustomer;
