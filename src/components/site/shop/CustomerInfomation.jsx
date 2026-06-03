import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import CustomerProduct from "./customerProduct";
import ShopOrderSummary from "./ShopOrderSummary";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { FormInput, FormSelect, FormTextarea } from "@/components/forms/FormControls";
import { useAuth } from "@/contexts/useAuth";
import {
  EMPTY_SHOP_CART_QUOTE,
  hasCheckoutCustomer,
  loadShopCheckout,
  saveShopCheckout,
} from "@/lib/shopCheckout";
import { getCommerceItemKey } from "@/lib/commerceItems";
import { useShopCartQuoteQuery } from "@/hooks/useShopOrders";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { useFormatMoney } from "@/utils/formatPrice";
import { selectCart, useCartStore } from "@/stores/cartStore";
import { LOGIN_PATH, SHOP_PAYMENT_PATH } from "@/router/paths";


const STATES = [
  { value: "BAL", label: "Balochistan" },
  { value: "KP", label: "Khyber Pakhtunkhwa" },
  { value: "PUN", label: "Punjab" },
  { value: "ICT", label: "Islamabad Capital Territory" },
  { value: "SIN", label: "Sindh" },
];

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  autoComplete,
  error,
}) => (
  <div className="flex flex-col gap-1">
    <FormInput
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      type={type}
      autoComplete={autoComplete}
      aria-invalid={Boolean(error) || undefined}
    />
    {error && (
      <Text role="alert" size="xs" className="text-destructive">{error}</Text>
    )}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  error: PropTypes.string,
};

const SelectField = ({ label, name, value, onChange, options, required = false, error }) => (
  <div className="flex flex-col gap-1">
    <FormSelect
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      options={options}
      required={required}
    />
    {error && (
      <Text role="alert" size="xs" className="text-destructive">{error}</Text>
    )}
  </div>
);

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
};

const CustomerInfomation = ({ onNext }) => {
  const cart = useCartStore(selectCart);
  const formatMoney = useFormatMoney();
  const { currentUser, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const storedCheckout = loadShopCheckout();
  const quoteQuery = useShopCartQuoteQuery(cart);
  const quote = cart.length ? quoteQuery.data : EMPTY_SHOP_CART_QUOTE;
  const requiresShipping = Boolean(quote?.requiresShipping);
  const quoteReady = cart.length === 0 || Boolean(quote);
  const quoteItemsByKey = useMemo(
    () => new Map((quote?.items || []).map((item) => [getCommerceItemKey(item), item])),
    [quote],
  );

  const [form, setForm] = useState({
    firstName: storedCheckout.customer?.firstName || "",
    lastName: storedCheckout.customer?.lastName || "",
    phone: storedCheckout.customer?.phone || "",
    country: storedCheckout.address?.country || "",
    companyName: storedCheckout.address?.companyName || "",
    streetAddress: storedCheckout.address?.streetAddress || "",
    aptSuite: storedCheckout.address?.aptSuite || "",
    city: storedCheckout.address?.city || "",
    state: storedCheckout.address?.state || "",
    postalCode: storedCheckout.address?.postalCode || "",
    deliveryInstruction: storedCheckout.address?.deliveryInstruction || "",
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validateForm = (customer) => {
    const errors = {};
    if (!customer.firstName) errors.firstName = "First name is required.";
    if (!customer.lastName) errors.lastName = "Last name is required.";
    if (!customer.phone) errors.phone = "Phone number is required.";

    if (requiresShipping) {
      if (!form.country.trim()) errors.country = "Country is required.";
      if (!form.streetAddress.trim()) errors.streetAddress = "Residential address is required.";
      if (!form.city.trim()) errors.city = "City is required.";
      if (!form.state.trim()) errors.state = "State is required.";
      if (!form.postalCode.trim()) errors.postalCode = "Postal code is required.";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAuthLoading) {
      toast.info("Checking your account. Please try again in a moment.");
      return;
    }

    if (!currentUser) {
      toast.error("Please log in to continue.");
      navigate({
        to: LOGIN_PATH,
        search: { redirect: location.href },
      });
      return;
    }

    if (!quoteReady || quoteQuery.isError) {
      toast.error("We couldn't confirm current cart pricing. Please try again.");
      return;
    }

    const customer = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
    };

    const errors = validateForm(customer);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error("Please fix the highlighted fields before continuing.");
      return;
    }

    setFieldErrors({});

    try {
      if (!hasCheckoutCustomer(customer)) {
        throw new Error("First name, last name, and phone are required.");
      }

      if (!requiresShipping) {
        saveShopCheckout({ customer, address: null });
        if (onNext) {
          onNext();
          return;
        }
        navigate({ to: SHOP_PAYMENT_PATH });
        return;
      }

      saveShopCheckout({
        customer,
        address: form,
      });

      if (onNext) {
        onNext();
        return;
      }
      navigate({ to: SHOP_PAYMENT_PATH });
    } catch (err) {
      toast.error(err.message || "Unable to save your information. Please try again.");
    }
  };

  const continueLabel = requiresShipping
    ? "Continue to shipping"
    : "Continue to payment";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <Card>
        <CardContent>
          <form
            id="shop-customer-information"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <Heading level={3} className="text-h4">Your details</Heading>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label="First name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
                autoComplete="given-name"
                error={fieldErrors.firstName}
              />
              <InputField
                label="Last name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
                autoComplete="family-name"
                error={fieldErrors.lastName}
              />
            </div>

            <InputField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
              type="tel"
              autoComplete="tel"
              error={fieldErrors.phone}
            />

            {requiresShipping ? (
              <>
                <Heading level={3} className="text-h4 pt-4">Shipping address</Heading>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InputField
                    label="Country / region"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                    autoComplete="country"
                    error={fieldErrors.country}
                  />
                  <InputField
                    label="Company name"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Company (optional)"
                    autoComplete="organization"
                  />
                </div>

                <InputField
                  label="Residential address"
                  name="streetAddress"
                  value={form.streetAddress}
                  onChange={handleChange}
                  placeholder="House number and street name"
                  required
                  autoComplete="street-address"
                  error={fieldErrors.streetAddress}
                />

                <InputField
                  label="Apt / suite"
                  name="aptSuite"
                  value={form.aptSuite}
                  onChange={handleChange}
                  placeholder="Apt, suite (optional)"
                  autoComplete="address-line2"
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InputField
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    autoComplete="address-level2"
                    error={fieldErrors.city}
                  />
                  <SelectField
                    label="State"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    options={STATES}
                    required
                    error={fieldErrors.state}
                  />
                </div>

                <InputField
                  label="Postal code"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="Postal code"
                  required
                  autoComplete="postal-code"
                  error={fieldErrors.postalCode}
                />

                <FormTextarea
                  label="Delivery instruction"
                  name="deliveryInstruction"
                  value={form.deliveryInstruction}
                  onChange={handleChange}
                  placeholder="Delivery instruction"
                />
              </>
            ) : (
              <Alert>
                <AlertDescription>
                  {quoteReady
                    ? "This order only contains digital items, so we only need your contact details here."
                    : "Confirming the cart requirements before collecting address details."}
                </AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>

      <Card className="lg:sticky lg:top-24 lg:self-start">
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Heading level={3} className="text-h4">Your order</Heading>
            <Text size="sm" tone="muted">
              Review the products before continuing.
            </Text>
          </div>

          <div className="flex flex-col gap-4">
            {cart.length > 0 ? (
              cart.map((product) => (
                <CustomerProduct
                  key={getCommerceItemKey(product)}
                  title={product.name}
                  item={product.quantity}
                  price={
                    quoteItemsByKey.has(getCommerceItemKey(product))
                      ? formatMoney(quoteItemsByKey.get(getCommerceItemKey(product)).unitPrice)
                      : quoteQuery.isError
                        ? "Unavailable"
                        : "Updating..."
                  }
                  priceLabel=""
                  image={resolveBackendAssetUrl(
                    product.image || product.images?.[0],
                    "https://via.placeholder.com/300x200",
                  )}
                />
              ))
            ) : (
              <Text size="sm" tone="muted">Your cart is empty.</Text>
            )}
          </div>

          <div className="border-t border-border pt-4">
            <ShopOrderSummary
              pricing={quote?.pricing || null}
              isLoading={cart.length > 0 && quoteQuery.isLoading}
              isError={cart.length > 0 && quoteQuery.isError}
            />
          </div>

          <Button
            type="submit"
            form="shop-customer-information"
            size="marketing"
            disabled={isAuthLoading || !quoteReady || quoteQuery.isError}
            className="w-full"
          >
            {isAuthLoading
              ? "Checking account…"
              : !quoteReady
                ? "Confirming cart…"
                : continueLabel}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

CustomerInfomation.propTypes = {
  onNext: PropTypes.func,
};

export default CustomerInfomation;
