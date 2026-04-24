import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import mastercard from "../../assets/images/mastercard.svg";
import CustomerOrder from "./customerOrder";
import {
  hasCheckoutCustomer,
  hasCheckoutAddress,
  loadShopCheckout,
  saveShopCheckout,
} from "../../lib/shopCheckout";
import { hasShippableCommerceItems } from "../../lib/commerceItems";
import { selectCart, useCartStore } from "../../stores/cartStore";
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

  const savedCustomer = storedCheckout.customer;
  const savedAddress = storedCheckout.address;
  const customerReady = hasCheckoutCustomer(savedCustomer);
  const addressReady = hasCheckoutAddress(savedAddress, { requiresShipping });
  const isCardPayment = selectedMethod === "Credit Card";

  const handleContinue = () => {
    if (!customerReady || (requiresShipping && !addressReady)) {
      navigate("/CustomerInfo");
      return;
    }

    const trimmedEmail = billingEmail.trim();
    const trimmedName = cardholderName.trim();
    const numberDigits = accountNumber.replace(/\D/g, "");
    const trimmedMonth = expiryMonth.trim();
    const trimmedYear = expiryYear.trim();

    if (!trimmedEmail || !trimmedName || numberDigits.length < 4) {
      alert("Complete your billing details before continuing.");
      return;
    }

    if (
      isCardPayment &&
      (!trimmedMonth || !trimmedYear || Number(trimmedMonth) < 1 || Number(trimmedMonth) > 12)
    ) {
      alert("Enter a valid card expiry date.");
      return;
    }

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

    navigate("/Shipping");
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
              <p className="text-3xl text-foreground poppins-bold">SHIPPING & PAYMENT</p>
              <p className="text-sm text-foreground poppins-light">
                Save the payment details for this checkout draft. Shipping is only required when your cart has physical products.
              </p>
            </div>
            <Button
              type="button"
              className="h-auto bg-foreground px-4 py-2 text-sm text-primary"
              onClick={() => navigate("/CustomerInfo")}
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
              <p className="text-3xl text-foreground poppins-bold">SHIPPING SERVICE</p>
              <p className="text-sm text-foreground poppins-light">
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
                          <p className="poppins-bold">{service.value}</p>
                          <p className="text-sm">{service.note}</p>
                        </div>
                        <p className="text-sm poppins-light">{service.description}</p>
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
            <p className="text-3xl text-foreground poppins-bold">PAYMENT METHOD</p>
            <p className="text-sm text-foreground poppins-light">
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
                        <p className="poppins-bold">{method.value}</p>
                        <img src={mastercard} className="h-6 w-6" alt="payment method icon" />
                      </div>
                      <p className="text-sm poppins-light">{method.description}</p>
                    </div>
                  </div>
                </Label>
              );
            })}
          </RadioGroup>
        </section>

        <section className="flex flex-col gap-5 border-t border-border p-6">
          <div className="flex flex-col gap-2">
            <p className="text-3xl text-foreground poppins-bold">BILLING DETAILS</p>
            <p className="text-sm text-foreground poppins-light">
              These details are used for the order summary and kept locally in this browser until you submit the checkout request.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <Field
              id="billing_email"
              label="Billing email"
              value={billingEmail}
              onChange={setBillingEmail}
              type="email"
              placeholder="you@example.com"
            />
            <Field
              id="cardholder_name"
              label={isCardPayment ? "Cardholder name" : "Account holder name"}
              value={cardholderName}
              onChange={setCardholderName}
              placeholder="Full name"
            />
            <Field
              id="account_number"
              label={isCardPayment ? "Card number" : "Account number"}
              value={accountNumber}
              onChange={setAccountNumber}
              placeholder={isCardPayment ? "4111 1111 1111 1111" : "03XX XXX XXXX"}
            />
            {isCardPayment ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="expiry_month"
                  label="Expiry month"
                  value={expiryMonth}
                  onChange={setExpiryMonth}
                  placeholder="08"
                />
                <Field
                  id="expiry_year"
                  label="Expiry year"
                  value={expiryYear}
                  onChange={setExpiryYear}
                  placeholder="2028"
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
        <CustomerOrder onNext={handleContinue} buttonLabel="REVIEW ORDER" />
      </div>
    </div>
  );
};

const Field = ({ id, label, value, onChange, placeholder, type = "text" }) => (
  <FormInput
    id={id}
    name={id}
    label={label}
    type={type}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder={placeholder}
    controlClassName="rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 py-2.5 text-sm text-foreground focus:border-foreground"
  />
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
};

export default ShopPaymentMethod;
