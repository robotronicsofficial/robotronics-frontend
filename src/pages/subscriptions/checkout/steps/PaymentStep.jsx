import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ReceiptText, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import {
  CHECKOUT_PATH,
  buildCheckoutSearch,
} from "@/components/checkout/checkoutNav";
import CheckoutShell from "@/components/checkout/CheckoutShell";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eyebrow, Text } from "@/components/ui/typography";
import { FormInput, FormTextarea } from "@/components/forms/FormControls";
import { useAuth } from "@/contexts/useAuth";
import { useCheckoutStore, selectIsPaymentComplete } from "@/stores/checkoutStore";
import { cn } from "@/lib/utils";
import { useFormatMoney } from "@/utils/formatPrice";

const PAYMENT_OPTIONS = [
  {
    value: "easypaisa",
    title: "EasyPaisa follow-up",
    description: "Robotronics confirms the wallet payment before activating access.",
  },
  {
    value: "invoice",
    title: "Invoice / bank transfer",
    description: "Best for schools and parents who need a payment reference first.",
  },
];

const PaymentStep = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const formatMoney = useFormatMoney();
  const plan = useCheckoutStore((state) => state.plan);
  const children = useCheckoutStore((state) => state.children);
  const payment = useCheckoutStore((state) => state.payment);
  const setPayment = useCheckoutStore((state) => state.setPayment);
  const isComplete = useCheckoutStore(selectIsPaymentComplete);

  const total = (plan?.price || 0) * children.length;
  const cycleLabel = plan?.billingCycle === "annual" ? "/year" : "/month";
  const accountName = [currentUser?.firstName, currentUser?.lastName]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    setPayment({
      accountName: payment.accountName || accountName,
      accountPhone: payment.accountPhone || currentUser?.phone || "",
      email: payment.email || currentUser?.email || "",
    });
  }, [accountName, currentUser, payment.accountName, payment.accountPhone, payment.email, setPayment]);

  const handleChange = (field) => (event) => {
    setPayment({ [field]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isComplete) {
      toast.error("Please add the billing contact for payment follow-up.");
      return;
    }
    navigate({ to: CHECKOUT_PATH, search: buildCheckoutSearch("confirm") });
  };

  return (
    <CheckoutShell
      step="payment"
      title="Choose how payment should be confirmed"
      subtitle="We create a checkout request now. Learning access turns on only after Robotronics records the payment."
    >
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
      >
        <div className="flex flex-col gap-5">
          <Card>
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-start gap-3 rounded-2xl bg-muted p-4">
                <ShieldCheck
                  className="size-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1">
                  <Text size="sm" weight="semibold">
                    No card details are stored here
                  </Text>
                  <Text size="xs" tone="muted">
                    This checkout records the subscription request. Payment is confirmed through the selected method before courses are activated.
                  </Text>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Eyebrow>Payment method</Eyebrow>
                <RadioGroup
                  value={payment.method}
                  onValueChange={(method) => setPayment({ method })}
                  className="grid gap-3 md:grid-cols-2"
                >
                  {PAYMENT_OPTIONS.map((option) => {
                    const isSelected = payment.method === option.value;
                    return (
                      <label
                        key={option.value}
                        className={cn(
                          "cursor-pointer rounded-2xl border p-4 transition-colors",
                          isSelected
                            ? "border-primary bg-primary-soft"
                            : "border-border bg-card hover:border-foreground",
                        )}
                      >
                        <RadioGroupItem value={option.value} className="sr-only" />
                        <Text weight="semibold">{option.title}</Text>
                        <Text size="sm" tone="muted" className="mt-1">
                          {option.description}
                        </Text>
                      </label>
                    );
                  })}
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                  id="payment-accountName"
                  name="accountName"
                  label="Billing contact"
                  value={payment.accountName}
                  onChange={handleChange("accountName")}
                  autoComplete="name"
                  required
                />
                <FormInput
                  id="payment-email"
                  name="email"
                  label="Receipt email"
                  type="email"
                  value={payment.email}
                  onChange={handleChange("email")}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                  id="payment-accountPhone"
                  name="accountPhone"
                  label="Payment phone (optional)"
                  value={payment.accountPhone}
                  onChange={handleChange("accountPhone")}
                  autoComplete="tel"
                />
                <FormInput
                  id="payment-reference"
                  name="reference"
                  label="Reference note (optional)"
                  value={payment.reference}
                  onChange={handleChange("reference")}
                  placeholder="Wallet number, PO number, or invoice note"
                />
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                <ReceiptText className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <Text size="sm" tone="muted">
                  Total request: <span className="font-semibold text-foreground">{formatMoney(total)}{cycleLabel}</span>. Courses stay locked until payment is recorded by Robotronics.
                </Text>
              </div>

              {payment.method === "invoice" && (
                <FormTextarea
                  id="payment-invoice-notes"
                  name="invoiceNotes"
                  label="Invoice details (optional)"
                  value={payment.reference}
                  onChange={handleChange("reference")}
                  placeholder="School name, tax details, purchase order number, or billing instructions."
                />
              )}
            </CardContent>
          </Card>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate({
                  to: CHECKOUT_PATH,
                  search: buildCheckoutSearch("parent"),
                })
              }
            >
              Back to billing
            </Button>
            <Button type="submit" size="marketing" disabled={!isComplete}>
              Review request
            </Button>
          </div>
        </div>

        <CheckoutSummary plan={plan} learners={children} totalLabel="Total request" />
      </form>
    </CheckoutShell>
  );
};

export default PaymentStep;
