import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck } from "lucide-react";

import {
  CHECKOUT_PATH,
  buildCheckoutSearch,
} from "@/lib/checkoutFlow";
import CheckoutShell from "@/components/checkout/CheckoutShell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { useAuth } from "@/contexts/useAuth";
import { useCreateSubscriptionCheckoutIntentMutation } from "@/hooks/useAccount";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { useFormatMoney } from "@/utils/formatPrice";
import { formatDisplayDate } from "@/lib/subscription";

const SummaryRow = ({ label, value, highlight = false }) => (
  <div className="flex items-start justify-between gap-4">
    <Text size="sm" tone="muted">
      {label}
    </Text>
    <Text
      size="sm"
      weight={highlight ? "semibold" : "regular"}
      className="text-right"
    >
      {value}
    </Text>
  </div>
);

const ConfirmStep = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const formatMoney = useFormatMoney();
  const plan = useCheckoutStore((state) => state.plan);
  const children = useCheckoutStore((state) => state.children);
  const persistedChildren = useCheckoutStore((state) => state.persistedChildren);
  const parent = useCheckoutStore((state) => state.parent);
  const payment = useCheckoutStore((state) => state.payment);
  const orderCode = useCheckoutStore((state) => state.orderCode);
  const ensureOrderCode = useCheckoutStore((state) => state.ensureOrderCode);
  const setStatus = useCheckoutStore((state) => state.setStatus);
  const createCheckoutIntent = useCreateSubscriptionCheckoutIntentMutation(currentUser?._id);
  const [error, setError] = useState("");

  const total = (plan?.price || 0) * children.length;
  const cycleLabel = plan?.billingCycle === "annual" ? "/year" : "/month";

  useEffect(() => {
    ensureOrderCode();
  }, [ensureOrderCode]);

  const childIds = persistedChildren
    .map((child) => child.childCode || child._id)
    .filter(Boolean);

  const billingAddress =
    [parent.streetAddress, parent.city, parent.state, parent.postalCode, parent.country]
      .filter(Boolean)
      .join(", ") || "—";

  const handleConfirm = async () => {
    setError("");
    if (!plan?.planId) {
      setError("Please pick a plan before confirming.");
      return;
    }
    if (!childIds.length) {
      setError("We couldn't find your saved kids. Please go back to the billing step.");
      return;
    }

    try {
      const checkoutReference = ensureOrderCode();
      await createCheckoutIntent.mutateAsync({
        planId: plan.planId,
        billingCycle: plan.billingCycle,
        childIds,
        payment: {
          method: payment.method,
          label: payment.method === "invoice" ? "Invoice / bank transfer" : "EasyPaisa",
          email: payment.email,
          contactName: payment.accountName,
          contactPhone: payment.accountPhone,
          reference: payment.reference,
        },
        checkoutReference,
      });
      setStatus("submitted");
      navigate({ to: CHECKOUT_PATH, search: buildCheckoutSearch("welcome") });
    } catch (mutationError) {
      setError(mutationError.message || "We couldn't create your checkout request.");
    }
  };

  return (
    <CheckoutShell
      step="confirm"
      title="One last look before we send the request"
      subtitle="Your child accounts are saved. Courses unlock after payment is recorded."
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <Card>
          <CardContent className="flex flex-col gap-5">
            <Heading level={3} className="text-h5">
              Order recap
            </Heading>

            <div className="flex flex-col gap-4 rounded-2xl bg-muted/60 p-5">
              <SummaryRow label="Plan" value={plan?.name || "Subscription"} />
              <SummaryRow
                label="Billing"
                value={plan?.billingCycle === "annual" ? "Annual" : "Monthly"}
              />
              <SummaryRow label="Children" value={children.length} />
              <SummaryRow label="Order code" value={orderCode} />
              <SummaryRow
                label="Order date"
                value={formatDisplayDate(new Date().toISOString())}
              />
              <div className="border-t border-border pt-4">
                <SummaryRow
                  label={`Total request (${plan?.billingCycle === "annual" ? "1 year" : "1 month"})`}
                  value={`${formatMoney(total)}${cycleLabel}`}
                  highlight
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <Eyebrow>Account</Eyebrow>
                <Text size="sm" weight="semibold">
                  {[currentUser?.firstName, currentUser?.lastName]
                    .filter(Boolean)
                    .join(" ") || "Your account"}
                </Text>
                <Text size="xs" tone="muted">
                  {currentUser?.email}
                </Text>
              </div>
              <div className="flex flex-col gap-1">
                <Eyebrow>Billing address</Eyebrow>
                <Text size="sm">{billingAddress}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Eyebrow>Learners</Eyebrow>
                <Text size="sm">
                  {children
                    .map((child) =>
                      [child.firstName, child.lastName]
                        .filter(Boolean)
                        .join(" "),
                    )
                    .filter(Boolean)
                    .join(", ")}
                </Text>
              </div>
              <div className="flex flex-col gap-1">
                <Eyebrow>Payment</Eyebrow>
                <Text size="sm">
                  {payment.method === "invoice"
                    ? "Invoice / bank transfer"
                    : "EasyPaisa follow-up"}
                </Text>
                <Text size="xs" tone="muted">
                  Receipt to {payment.email || currentUser?.email}
                </Text>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-primary-soft p-4">
              <ShieldCheck
                aria-hidden="true"
                className="size-5 shrink-0 text-primary"
              />
              <Text size="sm">
                By confirming, you ask Robotronics to prepare a payment request for{" "}
                <span className="font-semibold">
                  {formatMoney(total)}
                  {cycleLabel}
                </span>{" "}
                . Subscription access stays locked until the payment is recorded.
              </Text>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  navigate({
                    to: CHECKOUT_PATH,
                    search: buildCheckoutSearch("payment"),
                  })
                }
                disabled={createCheckoutIntent.isPending}
              >
                Back to payment
              </Button>
              <Button
                type="button"
                size="marketing"
                onClick={handleConfirm}
                disabled={createCheckoutIntent.isPending}
              >
                {createCheckoutIntent.isPending ? (
                  "Submitting…"
                ) : (
                  <>
                    Submit request
                    <CheckCircle2 className="size-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CheckoutShell>
  );
};

export default ConfirmStep;
