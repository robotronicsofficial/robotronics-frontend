import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Clock3, ReceiptText } from "lucide-react";

import CheckoutShell from "@/components/checkout/CheckoutShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { useAuth } from "@/contexts/useAuth";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { useFormatMoney } from "@/utils/formatPrice";

const WelcomeStep = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const formatMoney = useFormatMoney();
  const plan = useCheckoutStore((state) => state.plan);
  const children = useCheckoutStore((state) => state.children);
  const payment = useCheckoutStore((state) => state.payment);
  const orderCode = useCheckoutStore((state) => state.orderCode);
  const reset = useCheckoutStore((state) => state.reset);

  const total = (plan?.price || 0) * children.length;
  const cycleLabel = plan?.billingCycle === "annual" ? "/year" : "/month";

  const handleDashboard = () => {
    reset();
    navigate({ to: "/Dashboard/ChildProfile", replace: true });
  };

  return (
    <CheckoutShell
      step="welcome"
      title="Checkout request sent"
      subtitle="Your child details are saved. Robotronics will confirm payment, then activate course access."
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <Card className="border-success bg-success/5">
          <CardContent className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="grid size-12 shrink-0 place-items-center rounded-full bg-success/15 text-success"
            >
              <CheckCircle2 className="size-6" />
            </span>
            <div className="flex flex-col gap-1">
              <Eyebrow tone="brand">Submitted</Eyebrow>
              <Heading level={3} className="text-h5">
                Payment confirmation is the next step
              </Heading>
              <Text size="sm" tone="muted">
                We sent the request under{" "}
                <span className="font-semibold text-foreground">
                  {currentUser?.email || payment.email}
                </span>
                . Courses and child PIN setup unlock after the payment is recorded.
              </Text>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="grid gap-5 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <ReceiptText className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                <Text weight="semibold" size="sm">
                  Request total
                </Text>
                <Text size="sm" tone="muted">
                  {formatMoney(total)}
                  {cycleLabel} for {children.length} child{children.length === 1 ? "" : "ren"}.
                </Text>
                {orderCode && (
                  <Text size="xs" tone="muted">
                    Reference: {orderCode}
                  </Text>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock3 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                <Text weight="semibold" size="sm">
                  Activation timing
                </Text>
                <Text size="sm" tone="muted">
                  Once payment is recorded, the subscription becomes active and the child dashboard will let you set login PINs.
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" size="marketing" onClick={handleDashboard}>
            Open child dashboard
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              navigate({ to: "/" });
            }}
          >
            Back to home
          </Button>
        </div>
      </div>
    </CheckoutShell>
  );
};

export default WelcomeStep;
