import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import mastercard from "../../assets/images/mastercard.svg";
import CustomerOrder from "./customerOrder";
import {
  hasCheckoutCustomer,
  hasCheckoutAddress,
  loadShopCheckout,
  saveShopCheckout,
} from "../../lib/shopCheckout";
import { hasShippableCommerceItems } from "../../lib/commerceItems";

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
  const { cart } = useSelector((state) => state.cart);
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
    <div className="lg:flex flex-row p-5 bg-gray gap-6">
      <div
        className="lg:w-2/3 space-y-10"
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="4000"
      >
        <div className="bg-white border border-lightgray p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-3xl text-brown poppins-bold">SHIPPING & PAYMENT</p>
              <p className="text-sm text-brown poppins-light">
                Save the payment details for this checkout draft. Shipping is only required when your cart has physical products.
              </p>
            </div>
            <button
              type="button"
              className="text-sm text-gold bg-brown px-4 py-2"
              onClick={() => navigate("/CustomerInfo")}
            >
              Edit address
            </button>
          </div>

          <div className="rounded-[20px] border border-[#E6D7B8] bg-[#FFF8E8] p-4 text-sm text-brown">
            This storefront flow only stores billing details locally in your browser. It does not create a backend payment record or invoice yet.
          </div>

          {customerReady ? (
            <div className="grid gap-2 text-sm text-brown sm:grid-cols-2">
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
                <p className="sm:col-span-2 text-brown/70">Digital order. No delivery address is required.</p>
              )}
            </div>
          ) : (
            <div className="border border-dashed border-[#BCBABA] bg-[#F7F3F1] p-4 text-sm text-brown">
              Add your customer details before choosing payment information.
            </div>
          )}
        </div>

        {requiresShipping ? (
          <section className="space-y-5">
            <div className="space-y-2">
              <p className="text-3xl text-brown poppins-bold">SHIPPING SERVICE</p>
              <p className="text-sm text-brown poppins-light">
                Choose the delivery partner you want stored with this checkout draft.
              </p>
            </div>

            <div className="space-y-4">
              {SHIPPING_SERVICES.map((service) => {
                const isSelected = selectedService === service.value;

                return (
                  <button
                    key={service.value}
                    type="button"
                    className={`w-full border p-5 text-left transition ${
                      isSelected ? "bg-brown text-white border-brown" : "bg-white text-brown border-lightgray"
                    }`}
                    onClick={() => setSelectedService(service.value)}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        value={service.value}
                        name="shippingService"
                        checked={isSelected}
                        onChange={() => setSelectedService(service.value)}
                      />
                      <div className="w-full space-y-2">
                        <div className="flex justify-between gap-4">
                          <p className="poppins-bold">{service.value}</p>
                          <p className="text-sm">{service.note}</p>
                        </div>
                        <p className="text-sm poppins-light">{service.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="rounded-[20px] border border-[#E6D7B8] bg-[#FFF8E8] p-4 text-sm text-brown">
            This checkout only contains digital items, so no shipping service needs to be selected.
          </section>
        )}

        <section className="space-y-5">
          <div className="space-y-2">
            <p className="text-3xl text-brown poppins-bold">PAYMENT METHOD</p>
            <p className="text-sm text-brown poppins-light">
              Save the billing method you want attached to this checkout draft.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {PAYMENT_METHODS.map((method) => {
              const isSelected = selectedMethod === method.value;

              return (
                <button
                  key={method.value}
                  type="button"
                  className={`border p-5 text-left transition ${
                    isSelected ? "bg-brown text-white border-brown" : "bg-white text-brown border-lightgray"
                  }`}
                  onClick={() => setSelectedMethod(method.value)}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      value={method.value}
                      name="paymentMethod"
                      checked={isSelected}
                      onChange={() => setSelectedMethod(method.value)}
                    />
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <p className="poppins-bold">{method.value}</p>
                        <img src={mastercard} className="h-6 w-6" alt="payment method icon" />
                      </div>
                      <p className="text-sm poppins-light">{method.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-5">
          <div className="space-y-2">
            <p className="text-3xl text-brown poppins-bold">BILLING DETAILS</p>
            <p className="text-sm text-brown poppins-light">
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
              <div className="border border-dashed border-[#BCBABA] bg-white p-4 text-sm text-brown">
                The last four digits of your account number will be stored with the order summary.
              </div>
            )}
          </div>
        </section>
      </div>

      <div
        className="px-1"
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="4000"
      >
        <div className="h-full w-0 border border-lightgray"></div>
      </div>

      <div
        className="lg:w-1/2"
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="4000"
      >
        <CustomerOrder onNext={handleContinue} buttonLabel="REVIEW ORDER" />
      </div>
    </div>
  );
};

const Field = ({ id, label, value, onChange, placeholder, type = "text" }) => (
  <label className="space-y-2">
    <span className="block text-sm text-brown poppins-light">{label}</span>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="block w-full border-b-2 border-line bg-transparent py-2.5 text-sm text-brown focus:border-brown focus:outline-none"
    />
  </label>
);

export default ShopPaymentMethod;
