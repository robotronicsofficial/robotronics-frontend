import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

import CustomerOrder from "./customerOrder";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { FormInput } from "@/components/forms/FormControls";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import {
  hasCheckoutCustomer,
  hasCheckoutAddress,
  loadShopCheckout,
  saveShopCheckout,
} from "@/lib/shopCheckout";
import { hasShippableCommerceItems } from "@/lib/commerceItems";
import { selectCart, useCartStore } from "@/stores/cartStore";
import { SHOP_CUSTOMER_INFO_PATH, SHOP_REVIEW_PATH } from "@/router/paths";


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
    />
    {error && (
      <Text role="alert" size="xs" className="text-destructive">
        {error}
      </Text>
    )}
  </div>
);

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

const ShopPaymentMethod = ({ onNext }) => {
  const navigate = useNavigate();
  const cart = useCartStore(selectCart);
  const storedCheckout = useMemo(() => loadShopCheckout(), []);
  const requiresShipping = hasShippableCommerceItems(cart);
  const [selectedService, setSelectedService] = useState(
    storedCheckout.payment?.shippingService ||
      (requiresShipping ? SHIPPING_SERVICES[0].value : ""),
  );
  const [selectedMethod, setSelectedMethod] = useState(
    storedCheckout.payment?.paymentMethod || PAYMENT_METHODS[0].value,
  );
  const [billingEmail, setBillingEmail] = useState(
    storedCheckout.payment?.billingEmail || "",
  );
  const [cardholderName, setCardholderName] = useState(
    storedCheckout.payment?.cardholderName || "",
  );
  const [accountLast4, setAccountLast4] = useState(
    storedCheckout.payment?.accountLast4 || "",
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
      navigate({ to: SHOP_CUSTOMER_INFO_PATH });
      return;
    }

    const trimmedEmail = billingEmail.trim();
    const trimmedName = cardholderName.trim();
    const lastFourDigits = accountLast4.replace(/\D/g, "");

    const errors = {};
    if (!trimmedEmail) errors.billing_email = "Billing email is required.";
    if (!trimmedName) {
      errors.cardholder_name = isCardPayment
        ? "Cardholder name is required."
        : "Account holder name is required.";
    }
    if (!/^\d{4}$/.test(lastFourDigits)) {
      errors.account_last4 = "Enter the last four digits only.";
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
          accountLast4: lastFourDigits,
          expiryMonth: "",
          expiryYear: "",
        },
      });

      if (onNext) {
        onNext();
        return;
      }

      navigate({ to: SHOP_REVIEW_PATH });
    } catch (err) {
      toast.error(err.message || "Unable to save billing details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div
        className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 md:p-8"
        data-aos="fade-up"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Heading level={3} className="text-h4">
              Shipping & payment
            </Heading>
            <Text size="sm" tone="muted">
              Save the payment details for this checkout draft. Shipping is only
              required when your cart has physical products.
            </Text>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => navigate({ to: SHOP_CUSTOMER_INFO_PATH })}
          >
            Edit address
          </Button>
        </div>

        <Alert>
          <AlertDescription>
            This storefront flow only stores billing details locally in your
            browser. It does not create a backend payment record or invoice yet.
          </AlertDescription>
        </Alert>

        {customerReady ? (
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <div className="grid gap-1 sm:grid-cols-2">
              <Text weight="semibold">
                {savedCustomer.firstName} {savedCustomer.lastName}
              </Text>
              <Text size="sm" tone="muted" className="sm:text-right">
                {savedCustomer.phone}
              </Text>
              {requiresShipping && addressReady ? (
                <Text size="sm" tone="muted" className="sm:col-span-2">
                  {savedAddress.streetAddress}
                  {savedAddress.aptSuite ? `, ${savedAddress.aptSuite}` : ""}
                  {`, ${savedAddress.city}, ${savedAddress.state}, ${savedAddress.country}`}
                </Text>
              ) : (
                <Text size="sm" tone="muted" className="sm:col-span-2">
                  Digital order. No delivery address is required.
                </Text>
              )}
            </div>
          </div>
        ) : (
          <Alert variant="destructive">
            <AlertDescription>
              Add your customer details before choosing payment information.
            </AlertDescription>
          </Alert>
        )}

        {requiresShipping ? (
          <section className="flex flex-col gap-4 border-t border-border pt-6">
            <div className="flex flex-col gap-1">
              <Heading level={3} className="text-h4">
                Shipping service
              </Heading>
              <Text size="sm" tone="muted">
                Choose the delivery partner you want stored with this checkout
                draft.
              </Text>
            </div>

            <RadioGroup
              value={selectedService}
              onValueChange={setSelectedService}
              className="flex flex-col gap-3"
            >
              {SHIPPING_SERVICES.map((service) => {
                const isSelected = selectedService === service.value;
                return (
                  <Label
                    key={service.value}
                    className={cn(
                      "flex w-full cursor-pointer flex-col gap-2 rounded-xl border p-5 transition-colors",
                      isSelected
                        ? "border-primary bg-primary-soft"
                        : "border-border bg-card hover:border-foreground",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <RadioGroupItem
                        value={service.value}
                        id={`shipping-${service.value}`}
                      />
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <Text weight="semibold">{service.value}</Text>
                          <Text size="xs" tone="muted">
                            {service.note}
                          </Text>
                        </div>
                        <Text size="sm" tone="muted">
                          {service.description}
                        </Text>
                      </div>
                    </div>
                  </Label>
                );
              })}
            </RadioGroup>
          </section>
        ) : (
          <section className="border-t border-border pt-6">
            <Alert>
              <AlertDescription>
                This checkout only contains digital items, so no shipping service
                needs to be selected.
              </AlertDescription>
            </Alert>
          </section>
        )}

        <section className="flex flex-col gap-4 border-t border-border pt-6">
          <div className="flex flex-col gap-1">
            <Heading level={3} className="text-h4">
              Payment method
            </Heading>
            <Text size="sm" tone="muted">
              Save the billing method you want attached to this checkout draft.
            </Text>
          </div>

          <RadioGroup
            value={selectedMethod}
            onValueChange={setSelectedMethod}
            className="grid gap-3 lg:grid-cols-2"
          >
            {PAYMENT_METHODS.map((method) => {
              const isSelected = selectedMethod === method.value;
              return (
                <Label
                  key={method.value}
                  className={cn(
                    "flex w-full cursor-pointer flex-col gap-2 rounded-xl border p-5 transition-colors",
                    isSelected
                      ? "border-primary bg-primary-soft"
                      : "border-border bg-card hover:border-foreground",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <RadioGroupItem
                      value={method.value}
                      id={`payment-${method.value}`}
                    />
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-center justify-between gap-2">
                        <Text weight="semibold">{method.value}</Text>
                        <CreditCard
                          aria-hidden="true"
                          className="size-5 text-muted-foreground"
                        />
                      </div>
                      <Text size="sm" tone="muted">
                        {method.description}
                      </Text>
                    </div>
                  </div>
                </Label>
              );
            })}
          </RadioGroup>
        </section>

        <section className="flex flex-col gap-4 border-t border-border pt-6">
          <div className="flex flex-col gap-1">
            <Heading level={3} className="text-h4">
              Billing details
            </Heading>
            <Text size="sm" tone="muted">
              These details are used for the order summary and kept locally in
              this browser until you submit the checkout request. Do not enter
              a full card or account number.
            </Text>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
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
              id="account_last4"
              label={isCardPayment ? "Card last 4 digits" : "Account last 4 digits"}
              value={accountLast4}
              onChange={(next) => {
                setAccountLast4(next.replace(/\D/g, "").slice(0, 4));
                clearFieldError("account_last4");
              }}
              placeholder="1234"
              autoComplete="off"
              inputMode="numeric"
              error={fieldErrors.account_last4}
            />
            <Alert>
              <AlertDescription>
                Only the last four digits are stored with this checkout request.
                Robotronics will confirm payment details outside this form.
              </AlertDescription>
            </Alert>
          </div>
        </section>
      </div>

      <div
        className="flex flex-col overflow-hidden rounded-xl border border-border bg-card lg:sticky lg:top-24 lg:self-start"
        data-aos="fade-up"
      >
        <CustomerOrder
          onNext={handleContinue}
          buttonLabel={isSubmitting ? "Saving…" : "Review order"}
          buttonDisabled={isSubmitting}
        />
      </div>
    </div>
  );
};

ShopPaymentMethod.propTypes = {
  onNext: PropTypes.func,
};

export default ShopPaymentMethod;
