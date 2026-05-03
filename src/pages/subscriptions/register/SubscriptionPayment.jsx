import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { toast } from "react-toastify";

import AppImage from "@/components/site/AppImage";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormInput } from "@/components/forms/FormControls";
import { cn } from "@/lib/utils";
import robo from "../../../assets/child.webp";
import { formatDisplayDate } from "../../../lib/subscription";
import {
  formatCheckoutCurrency,
  getCheckoutPaymentLabel,
  loadSubscriptionCheckout,
  updateSubscriptionCheckout,
} from "../../../lib/subscriptionCheckout";

const PAYMENT_OPTIONS = [
  {
    value: "credit-card",
    title: "Credit card",
    description: "Use a bank card for recurring subscription billing.",
  },
  {
    value: "easypaisa",
    title: "EasyPaisa",
    description: "Use your EasyPaisa account and keep billing details on file.",
  },
];

const buildPaymentForm = (checkout) => ({
  method: checkout?.payment?.method || "credit-card",
  email: checkout?.payment?.email || checkout?.parent?.email || "",
  cardholderName:
    checkout?.payment?.cardholderName ||
    `${checkout?.parent?.firstName || ""} ${checkout?.parent?.lastName || ""}`.trim(),
  accountNumber: checkout?.payment?.cardLast4 || "",
  expiryMonth: checkout?.payment?.expiryMonth || "",
  expiryYear: checkout?.payment?.expiryYear || "",
});

const SummaryRow = ({ label, value, highlight = false }) => (
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

SummaryRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  highlight: PropTypes.bool,
};

const InputField = ({ label, name, value, onChange, placeholder, type = "text", maxLength }) => (
  <FormInput
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    maxLength={maxLength}
    required
  />
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
};

const SubscriptionPayment = ({ onNext }) => {
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(() => loadSubscriptionCheckout());
  const [paymentForm, setPaymentForm] = useState(() =>
    buildPaymentForm(loadSubscriptionCheckout()),
  );
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const selectedMethod = paymentForm.method;
  const accountLabel = useMemo(
    () => (selectedMethod === "credit-card" ? "Card number" : "EasyPaisa account number"),
    [selectedMethod],
  );

  if (!checkout) {
    return (
      <Text tone="muted" className="px-6 py-12 text-center">
        Loading checkout…
      </Text>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentForm((current) => ({
      ...current,
      [name]: ["accountNumber", "expiryMonth", "expiryYear"].includes(name)
        ? value.replace(/\D/g, "")
        : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    setFormError("");
    setSubmitting(true);
    try {
      if (!paymentForm.email.trim() || !paymentForm.cardholderName.trim()) {
        throw new Error("Billing email and cardholder name are required.");
      }
      if (!paymentForm.accountNumber) {
        throw new Error(
          selectedMethod === "credit-card"
            ? "Please enter your card number."
            : "Please enter your EasyPaisa account number.",
        );
      }

      const nextCheckout = updateSubscriptionCheckout({
        payment: {
          method: selectedMethod,
          label: getCheckoutPaymentLabel(selectedMethod),
          email: paymentForm.email.trim(),
          cardholderName: paymentForm.cardholderName.trim(),
          cardLast4: paymentForm.accountNumber.slice(-4),
          expiryMonth: selectedMethod === "credit-card" ? paymentForm.expiryMonth : "",
          expiryYear: selectedMethod === "credit-card" ? paymentForm.expiryYear : "",
        },
        status: "payment-selected",
      });

      setCheckout(nextCheckout);
      onNext?.(nextCheckout);
      navigate({ to: "/subscriptions/review" });
    } catch (error) {
      const message = error?.message || "Could not save payment details.";
      setFormError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const parentName =
    [checkout.parent.firstName, checkout.parent.lastName].filter(Boolean).join(" ") ||
    "Parent account";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
      <Card>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Heading level={3} className="text-h4">Checkout summary</Heading>
            <Text size="sm" tone="muted">
              Review your child profiles, subscription plan, and total before
              entering payment details.
            </Text>
          </div>

          <div className="flex flex-col gap-3">
            {checkout.children.map((child) => (
              <Card
                key={child.childCode || `${child.firstName}-${child.lastName}`}
                className="p-0"
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <AppImage
                    className="h-14 w-14 rounded-2xl bg-muted p-2"
                    src={robo}
                    alt=""
                  />
                  <div className="min-w-0 flex-1">
                    <Text weight="semibold">
                      {[child.firstName, child.lastName].filter(Boolean).join(" ") ||
                        "Student"}
                    </Text>
                    <Text size="sm" tone="muted">
                      {checkout.plan.name} · {checkout.plan.billingCycle || "Subscription"}
                    </Text>
                    {child.childCode && (
                      <Eyebrow tone="brand" className="mt-1">
                        {child.childCode}
                      </Eyebrow>
                    )}
                  </div>
                  <Text size="sm" weight="semibold">
                    {formatCheckoutCurrency(checkout.plan.price)}
                  </Text>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col gap-4 rounded-2xl bg-muted p-5">
            <SummaryRow label="Order code" value={checkout.orderCode} />
            <SummaryRow
              label="Registered on"
              value={formatDisplayDate(checkout.orderDate)}
            />
            <SummaryRow label="Children" value={checkout.totalChildren} />
            <SummaryRow
              label="Subscription plan"
              value={checkout.plan.name || "Subscription"}
            />
            <SummaryRow
              label="Billing cycle"
              value={checkout.plan.billingCycle || "N/A"}
            />
            <div className="border-t border-border pt-4">
              <SummaryRow
                label="Total"
                value={formatCheckoutCurrency(checkout.totalPrice)}
                highlight
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Heading level={3} className="text-h4">Payment details</Heading>
            <Text size="sm" tone="muted">
              Enter your billing details to continue to the final review.
            </Text>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-muted p-4">
            <Lock className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <Text size="sm">
              Your payment details are encrypted and used only to process this
              subscription.
            </Text>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
            <Heading level={4} className="text-h5">
              {parentName}
            </Heading>
            <div className="grid gap-3 md:grid-cols-2">
              <SummaryRow label="Email" value={checkout.parent.email || "N/A"} />
              <SummaryRow label="Phone" value={checkout.parent.phone || "N/A"} />
              <SummaryRow
                label="Address"
                value={
                  [
                    checkout.parent.streetAddress,
                    checkout.parent.city,
                    checkout.parent.state,
                    checkout.parent.postalCode,
                  ]
                    .filter(Boolean)
                    .join(", ") || "N/A"
                }
              />
              <SummaryRow label="Country" value={checkout.parent.country || "N/A"} />
            </div>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <Eyebrow>Payment method</Eyebrow>
              <RadioGroup
                value={selectedMethod}
                onValueChange={(value) =>
                  handleChange({ target: { name: "method", value } })
                }
                className="grid gap-3 md:grid-cols-2"
              >
                {PAYMENT_OPTIONS.map((option) => {
                  const isSelected = selectedMethod === option.value;
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

            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Billing email"
                name="email"
                type="email"
                value={paymentForm.email}
                onChange={handleChange}
                placeholder="parent@example.com"
              />
              <InputField
                label="Cardholder name"
                name="cardholderName"
                value={paymentForm.cardholderName}
                onChange={handleChange}
                placeholder="Full name"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <InputField
                label={accountLabel}
                name="accountNumber"
                value={paymentForm.accountNumber}
                onChange={handleChange}
                placeholder={
                  selectedMethod === "credit-card" ? "4111111111111111" : "03XXXXXXXXX"
                }
                maxLength={selectedMethod === "credit-card" ? 16 : 11}
              />
              {selectedMethod === "credit-card" ? (
                <>
                  <InputField
                    label="Expiry month"
                    name="expiryMonth"
                    value={paymentForm.expiryMonth}
                    onChange={handleChange}
                    placeholder="08"
                    maxLength={2}
                  />
                  <InputField
                    label="Expiry year"
                    name="expiryYear"
                    value={paymentForm.expiryYear}
                    onChange={handleChange}
                    placeholder="2028"
                    maxLength={4}
                  />
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-muted p-4 md:col-span-2">
                  <Text size="sm" tone="muted">
                    EasyPaisa details will be saved against the account number above for
                    review.
                  </Text>
                </div>
              )}
            </div>

            {formError && (
              <Alert variant="destructive">
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: "/subscriptions/register" })}
                disabled={submitting}
              >
                Back to registration
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving…" : "Continue to review"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

SubscriptionPayment.propTypes = {
  onNext: PropTypes.func,
};

export default SubscriptionPayment;
