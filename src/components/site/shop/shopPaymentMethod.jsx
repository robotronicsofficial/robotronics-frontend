import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mastercard from "@/assets/images/mastercard.svg";
import CustomerOrder from "./customerOrder";
import {
  hasCheckoutCustomer,
  hasCheckoutAddress,
  loadShopCheckout,
  saveShopCheckout,
} from "@/lib/shopCheckout";
import { hasShippableCommerceItems } from "@/lib/commerceItems";
import { selectCart, useCartStore } from "@/stores/cartStore";
import { FormInput } from "@/components/forms/FormControls";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SHIPPING_SERVICES = [
  {
    value: "TCS Express",
    description: "Tracked delivery for standard domestic orders.",
    note: "Flat shipping charge is included in your checkout total.",
  },
  {
    value: "Leopard Courier",
    description: "Reliable courier delivery for metro and intercity coverage.",
    note: "Flat shipping charge is included in your checkout total.",
  },
];

const PAYMENT_METHODS = [
  {
    value: "Credit Card",
    description: "Use a Visa or Mastercard linked to your billing email.",
  },
  {
    value: "Easypaisa",
    description: "Save an Easypaisa account for the order payment reference.",
  },
];

const ShopPaymentMethod = ({ onNext }) => {
  const navigate = useNavigate();
  const cart = useCartStore(selectCart);
  const storedCheckout = useMemo(() => loadShopCheckout(), []);
  const requiresShipping = hasShippableCommerceItems(cart);
  const [selectedService, setSelectedService] = useState(
    storedCheckout.payment?.shippingService || (requiresShipping ? SHIPPING_SERVICES[0].value : "")
  );
  const [selectedMethod, setSelectedMethod] = useState(
    storedCheckout.payment?.paymentMethod || PAYMENT_METHODS[0].value
  );
  const [billingEmail, setBillingEmail] = useState(
    storedCheckout.payment?.billingEmail || ""
  );
  const [cardholderName, setCardholderName] = useState(
    storedCheckout.payment?.cardholderName || ""
  );
  const [accountNumber, setAccountNumber] = useState(
    storedCheckout.payment?.accountLast4 || ""
  );
  const [expiryMonth, setExpiryMonth] = useState(
    storedCheckout.payment?.expiryMonth || ""
  );
  const [expiryYear, setExpiryYear] = useState(
    storedCheckout.payment?.expiryYear || ""
  );
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const savedCustomer = storedCheckout.customer;
  const savedAddress = storedCheckout.address;
  const customerReady = hasCheckoutCustomer(savedCustomer);
  const addressReady = hasCheckoutAddress(savedAddress, { requiresShipping });
  const isCardPayment = selectedMethod === "Credit Card";

  const clearFieldError = (name) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleContinue = () => {
    if (isSubmitting) return;

    if (!customerReady || (requiresShipping && !addressReady)) {
      navigate({ to: "/CustomerInfo" });
      return;
    }

    const trimmedEmail = billingEmail.trim();
    const trimmedName = cardholderName.trim();
    const numberDigits = accountNumber.replace(/\D/g, "");
    const trimmedMonth = expiryMonth.trim();
    const trimmedYear = expiryYear.trim();

    const errors = {};
    if (!trimmedEmail) errors.billing_email = "Billing email is required.";
    if (!trimmedName) {
      errors.cardholder_name = isCardPayment
        ? "Cardholder name is required."
        : "Account holder name is required.";
    }
    if (numberDigits.length < 4) {
      errors.account_number = isCardPayment
        ? "Enter a valid card number."
        : "Enter a valid account number.";
    }

    if (isCardPayment) {
      if (!trimmedMonth || Number(trimmedMonth) < 1 || Number(trimmedMonth) > 12) {
        errors.expiry_month = "Enter MM (01–12).";
      }
      if (!trimmedYear || !/^\d{4}$/.test(trimmedYear)) {
        errors.expiry_year = "Enter a 4-digit year (e.g. 2028).";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error("Please fix the highlighted billing fields before continuing.");
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      saveShopCheckout({
        payment: {
          shippingService: requiresShipping ? selectedService : "",
          paymentMethod: selectedMethod,
          billingEmail: trimmedEmail,
          cardholderName: trimmedName,
          accountLast4: numberDigits.slice(-4),
          expiryMonth: isCardPayment ? trimmedMonth : "",
          expiryYear: isCardPayment ? trimmedYear : "",
        },
      });

      if (onNext) {
        onNext();
        return;
      }

      navigate({ to: "/Shipping" });
    } catch (err) {
      toast.error(err.message || "Unable to save billing details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background p-5 lg:flex lg:gap-6">
      <div
        className="flex flex-col border border-border bg-card lg:w-2/3"
        data-aos="fade-up"
      >
        <section className="flex flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-3xl text-foreground">SHIPPING & PAYMENT</p>
              <p className="text-sm text-foreground">
                Save the payment details for this checkout draft. Shipping is only required when your cart has physical products.
              </p>
            </div>
            <Button
              type="button"
              className="h-auto bg-foreground px-4 py-2 text-sm text-primary"
              onClick={() => navigate({ to: "/CustomerInfo" })}
            >
              Edit address
            </Button>
          </div>

          <p className="bg-primary/10 p-4 text-sm text-foreground">
            This storefront flow only stores billing details locally in your browser. It does not create a backend payment record or invoice yet.
          </p>

          {customerReady ? (
            <div className="grid gap-2 text-sm text-foreground sm:grid-cols-2">
              <p className="font-semibold">
                {savedCustomer.firstName} {savedCustomer.lastName}
              </p>
              <p className="sm:text-right">{savedCustomer.phone}</p>
              {requiresShipping && addressReady ? (
                <p className="sm:col-span-2">
                  {savedAddress.streetAddress}
                  {savedAddress.aptSuite ? `, ${savedAddress.aptSuite}` : ""}
                  {`, ${savedAddress.city}, ${savedAddress.state}, ${savedAddress.country}`}
                </p>
              ) : (
                <p className="sm:col-span-2 text-foreground/70">Digital order. No delivery address is required.</p>
              )}
            </div>
          ) : (
            <p className="bg-muted p-4 text-sm text-foreground">
              Add your customer details before choosing payment information.
            </p>
          )}
        </section>

        {requiresShipping ? (
          <section className="flex flex-col gap-5 border-t border-border p-6">
            <div className="flex flex-col gap-2">
              <p className="text-3xl text-foreground">SHIPPING SERVICE</p>
              <p className="text-sm text-foreground">
                Choose the delivery partner you want stored with this checkout draft.
              </p>
            </div>

            <RadioGroup value={selectedService} onValueChange={setSelectedService} className="flex flex-col gap-4">
              {SHIPPING_SERVICES.map((service) => {
                const isSelected = selectedService === service.value;

                return (
                  <Label
                    key={service.value}
                    className={`w-full border p-5 text-left transition ${
                      isSelected ? "bg-foreground text-background border-foreground" : "bg-background text-foreground border-border"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <RadioGroupItem
                        value={service.value}
                        id={`shipping-${service.value}`}
                      />
                      <div className="flex w-full flex-col gap-2">
                        <div className="flex justify-between gap-4">
                          <p className="">{service.value}</p>
                          <p className="text-sm">{service.note}</p>
                        </div>
                        <p className="text-sm">{service.description}</p>
                      </div>
                    </div>
                  </Label>
                );
              })}
            </RadioGroup>
          </section>
        ) : (
          <section className="border-t border-border p-6">
            <p className="bg-primary/10 p-4 text-sm text-foreground">
              This checkout only contains digital items, so no shipping service needs to be selected.
            </p>
          </section>
        )}

        <section className="flex flex-col gap-5 border-t border-border p-6">
          <div className="flex flex-col gap-2">
            <p className="text-3xl text-foreground">PAYMENT METHOD</p>
            <p className="text-sm text-foreground">
              Save the billing method you want attached to this checkout draft.
            </p>
          </div>

          <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="grid gap-4 lg:grid-cols-2">
            {PAYMENT_METHODS.map((method) => {
              const isSelected = selectedMethod === method.value;

              return (
                <Label
                  key={method.value}
                  className={`border p-5 text-left transition ${
                    isSelected ? "bg-foreground text-background border-foreground" : "bg-background text-foreground border-border"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <RadioGroupItem
                      value={method.value}
                      id={`payment-${method.value}`}
                    />
                    <div className="flex w-full flex-col gap-2">
                      <div className="flex items-center justify-between gap-4">
                        <p className="">{method.value}</p>
                        <img src={mastercard} className="h-6 w-6" alt="payment method icon" />
                      </div>
                      <p className="text-sm">{method.description}</p>
                    </div>
                  </div>
                </Label>
              );
            })}
          </RadioGroup>
        </section>

        <section className="flex flex-col gap-5 border-t border-border p-6">
          <div className="flex flex-col gap-2">
            <p className="text-3xl text-foreground">BILLING DETAILS</p>
            <p className="text-sm text-foreground">
              These details are used for the order summary and kept locally in this browser until you submit the checkout request.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <Field
              id="billing_email"
              label="Billing email"
              value={billingEmail}
              onChange={(next) => {
                setBillingEmail(next);
                clearFieldError("billing_email");
              }}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              error={fieldErrors.billing_email}
            />
            <Field
              id="cardholder_name"
              label={isCardPayment ? "Cardholder name" : "Account holder name"}
              value={cardholderName}
              onChange={(next) => {
                setCardholderName(next);
                clearFieldError("cardholder_name");
              }}
              placeholder="Full name"
              autoComplete={isCardPayment ? "cc-name" : "name"}
              error={fieldErrors.cardholder_name}
            />
            <Field
              id="account_number"
              label={isCardPayment ? "Card number" : "Account number"}
              value={accountNumber}
              onChange={(next) => {
                setAccountNumber(next);
                clearFieldError("account_number");
              }}
              placeholder={isCardPayment ? "4111 1111 1111 1111" : "03XX XXX XXXX"}
              autoComplete={isCardPayment ? "cc-number" : "off"}
              inputMode={isCardPayment ? "numeric" : undefined}
              error={fieldErrors.account_number}
            />
            {isCardPayment ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="expiry_month"
                  label="Expiry month"
                  value={expiryMonth}
                  onChange={(next) => {
                    setExpiryMonth(next);
                    clearFieldError("expiry_month");
                  }}
                  placeholder="MM (01–12)"
                  autoComplete="cc-exp-month"
                  inputMode="numeric"
                  error={fieldErrors.expiry_month}
                />
                <Field
                  id="expiry_year"
                  label="Expiry year"
                  value={expiryYear}
                  onChange={(next) => {
                    setExpiryYear(next);
                    clearFieldError("expiry_year");
                  }}
                  placeholder="YYYY (e.g. 2028)"
                  autoComplete="cc-exp-year"
                  inputMode="numeric"
                  error={fieldErrors.expiry_year}
                />
              </div>
            ) : (
              <p className="bg-muted p-4 text-sm text-foreground">
                The last four digits of your account number will be stored with the order summary.
              </p>
            )}
          </div>
        </section>
      </div>

      <div
        className="px-1"
        data-aos="fade-up"
      >
        <div className="h-full w-0 border border-muted"></div>
      </div>

      <div
        className="lg:w-1/2"
        data-aos="fade-up"
      >
        <CustomerOrder
          onNext={handleContinue}
          buttonLabel={isSubmitting ? "Saving…" : "REVIEW ORDER"}
          buttonDisabled={isSubmitting}
        />
      </div>
    </div>
  );
};

const Field = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  inputMode,
  error,
}) => (
  <div className="flex flex-col gap-1">
    <FormInput
      id={id}
      name={id}
      label={label}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      aria-invalid={Boolean(error) || undefined}
      controlClassName="rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 py-2.5 text-sm text-foreground focus:border-foreground"
    />
    {error && (
      <p role="alert" className="text-destructive text-sm">
        {error}
      </p>
    )}
  </div>
);

ShopPaymentMethod.propTypes = {
  onNext: PropTypes.func,
};

Field.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  inputMode: PropTypes.string,
  error: PropTypes.string,
};

export default ShopPaymentMethod;
