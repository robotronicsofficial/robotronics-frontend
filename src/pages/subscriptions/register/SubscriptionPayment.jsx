import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppImage from "../../../component/AppImage";
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
    title: "Credit Card",
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
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className={`text-right text-sm ${highlight ? "font-bold text-foreground" : "text-foreground"}`}>
      {value}
    </p>
  </div>
);

SummaryRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  highlight: PropTypes.bool,
};

const InputField = ({ label, name, value, onChange, placeholder, type = "text", maxLength }) => (
  <label className="block space-y-2">
    <span className="text-sm font-semibold text-foreground">{label}</span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-foreground"
      required
    />
  </label>
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
  const [paymentForm, setPaymentForm] = useState(() => buildPaymentForm(loadSubscriptionCheckout()));

  useEffect(() => {
    const savedCheckout = loadSubscriptionCheckout();
    if (!savedCheckout?.children?.length || !savedCheckout?.plan?.name) {
      navigate("/subscriptions/register", { replace: true });
      return;
    }

    setCheckout(savedCheckout);
    setPaymentForm(buildPaymentForm(savedCheckout));
  }, [navigate]);

  const selectedMethod = paymentForm.method;
  const accountLabel = useMemo(
    () => (selectedMethod === "credit-card" ? "Card Number" : "EasyPaisa Account Number"),
    [selectedMethod]
  );

  if (!checkout) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentForm((currentForm) => ({
      ...currentForm,
      [name]:
        ["accountNumber", "expiryMonth", "expiryYear"].includes(name)
          ? value.replace(/\D/g, "")
          : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
    navigate("/subscriptions/review");
  };

  return (
    <div className="lg:flex lg:flex-row lg:gap-8 bg-muted">
      <div className="lg:w-[38%] rounded-[24px] bg-muted p-6 md:p-10">
        <div className="space-y-3">
          <p className="text-3xl font-bold text-foreground">Checkout Summary</p>
          <p className="text-sm text-muted-foreground">
            Confirm the registered children, membership details, and billing before you continue.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {checkout.children.map((child) => (
            <div
              key={child.childCode || `${child.firstName}-${child.lastName}`}
              className="flex items-center gap-4 rounded-[20px] bg-white p-4 shadow-sm"
            >
              <AppImage className="h-16 w-16 rounded-2xl bg-muted p-2" src={robo} alt="" />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-foreground">
                  {[child.firstName, child.lastName].filter(Boolean).join(" ") || "Student"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {checkout.plan.name} · {checkout.plan.billingCycle || "Subscription"}
                </p>
                {child.childCode ? (
                  <p className="text-xs uppercase tracking-[0.18em] text-accent">{child.childCode}</p>
                ) : null}
              </div>
              <p className="text-sm font-semibold text-foreground">
                {formatCheckoutCurrency(checkout.plan.price)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4 rounded-[20px] bg-white p-5 shadow-sm">
          <SummaryRow label="Order code" value={checkout.orderCode} />
          <SummaryRow label="Registered on" value={formatDisplayDate(checkout.orderDate)} />
          <SummaryRow label="Children" value={checkout.totalChildren} />
          <SummaryRow label="Membership" value={checkout.plan.name || "Subscription"} />
          <SummaryRow label="Billing cycle" value={checkout.plan.billingCycle || "N/A"} />
          <div className="border-t border-border pt-4">
            <SummaryRow label="Total" value={formatCheckoutCurrency(checkout.totalPrice)} highlight />
          </div>
        </div>
      </div>

      <div className="mt-6 flex-1 rounded-[24px] bg-white p-6 md:mt-0 md:p-10 shadow-sm">
        <div className="space-y-3">
          <p className="text-3xl font-bold text-foreground">Payment Details</p>
          <p className="text-sm text-muted-foreground">
            Save the billing details for this subscription checkout in this browser before the final review step.
          </p>
        </div>

        <div className="mt-6 rounded-[20px] border border-primary/30 bg-primary/10 p-4 text-sm text-foreground">
          This screen saves billing details locally for review. It does not create a backend payment record or invoice on its own.
        </div>

        <div className="mt-8 rounded-[20px] bg-foreground p-5 text-white">
          <p className="text-lg font-bold">
            {[checkout.parent.firstName, checkout.parent.lastName].filter(Boolean).join(" ") || "Parent account"}
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <SummaryRow label="Email" value={checkout.parent.email || "N/A"} />
            <SummaryRow label="Phone" value={checkout.parent.phone || "N/A"} />
            <SummaryRow
              label="Address"
              value={[
                checkout.parent.streetAddress,
                checkout.parent.city,
                checkout.parent.state,
                checkout.parent.postalCode,
              ]
                .filter(Boolean)
                .join(", ") || "N/A"}
            />
            <SummaryRow label="Country" value={checkout.parent.country || "N/A"} />
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Payment method
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {PAYMENT_OPTIONS.map((option) => {
                const isSelected = selectedMethod === option.value;
                return (
                  <label
                    key={option.value}
                    className={`cursor-pointer rounded-[20px] border p-4 transition ${
                      isSelected
                        ? "border-foreground bg-foreground text-white"
                        : "border-border bg-muted text-foreground"
                    }`}
                  >
                    <input
                      type="radio"
                      name="method"
                      value={option.value}
                      checked={isSelected}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <p className="font-bold">{option.title}</p>
                    <p className={`mt-2 text-sm ${isSelected ? "text-white/80" : "text-muted-foreground"}`}>
                      {option.description}
                    </p>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              label="Billing Email"
              name="email"
              type="email"
              value={paymentForm.email}
              onChange={handleChange}
              placeholder="parent@example.com"
            />
            <InputField
              label="Cardholder Name"
              name="cardholderName"
              value={paymentForm.cardholderName}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <InputField
              label={accountLabel}
              name="accountNumber"
              value={paymentForm.accountNumber}
              onChange={handleChange}
              placeholder={selectedMethod === "credit-card" ? "4111111111111111" : "03XXXXXXXXX"}
              maxLength={selectedMethod === "credit-card" ? 16 : 11}
            />
            {selectedMethod === "credit-card" ? (
              <InputField
                label="Expiry Month"
                name="expiryMonth"
                value={paymentForm.expiryMonth}
                onChange={handleChange}
                placeholder="08"
                maxLength={2}
              />
            ) : (
              <div className="rounded-[20px] border border-dashed border-border bg-muted p-4 text-sm text-muted-foreground">
                EasyPaisa details will be saved against the account number above for review.
              </div>
            )}
            {selectedMethod === "credit-card" ? (
              <InputField
                label="Expiry Year"
                name="expiryYear"
                value={paymentForm.expiryYear}
                onChange={handleChange}
                placeholder="2028"
                maxLength={4}
              />
            ) : (
              <div className="rounded-[20px] border border-dashed border-border bg-muted p-4 text-sm text-muted-foreground">
                The next step only confirms the saved review details. It does not charge the payment method yet.
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              className="rounded-full border border-foreground px-6 py-3 text-sm font-semibold text-foreground"
              onClick={() => navigate("/subscriptions/register")}
            >
              Back to Registration
            </button>
            <button
              type="submit"
              className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-primary"
            >
              Continue to Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

SubscriptionPayment.propTypes = {
  onNext: PropTypes.func,
};

export default SubscriptionPayment;
