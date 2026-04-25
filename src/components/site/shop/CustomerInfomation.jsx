import PropTypes from "prop-types";
import { useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/contexts/useAuth";
import CustomerProduct from "./customerProduct";
import OrderSummaryLine from "./OrderSummaryLine";
import {
  calculateCartSummary,
  formatShopCurrency,
  hasCheckoutCustomer,
  loadShopCheckout,
  saveShopCheckout,
} from "@/lib/shopCheckout";
import { getCommerceItemKey, hasShippableCommerceItems } from "@/lib/commerceItems";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { selectCart, useCartStore } from "@/stores/cartStore";
import { useSaveCheckoutAddressMutation } from "@/hooks/useShopOrders";
import { FormInput, FormSelect, FormTextarea } from "@/components/forms/FormControls";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const STATES = [
  { value: "BAL", label: "Balochistan" },
  { value: "KP", label: "Khyber Pakhtunkhwa" },
  { value: "PUN", label: "Punjab" },
  { value: "ICT", label: "Islamabad Capital Territory" },
  { value: "SIN", label: "Sindh" },
];
const summaryLabelClassName = "font-lato text-base text-muted-foreground";
const summaryValueBaseClassName = "font-lato text-[20px] font-extrabold";
const summaryValueClassName = `${summaryValueBaseClassName} text-foreground`;
const summaryTotalValueClassName = `${summaryValueBaseClassName} text-primary`;

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
      <p role="alert" className="text-destructive text-sm poppins-regular">
        {error}
      </p>
    )}
  </div>
);

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
      <p role="alert" className="text-destructive text-sm poppins-regular">
        {error}
      </p>
    )}
  </div>
);

const CustomerInfomation = ({ onNext }) => {
  const cart = useCartStore(selectCart);
  const { currentUser, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const storedCheckout = loadShopCheckout();
  const requiresShipping = hasShippableCommerceItems(cart);
  const saveCheckoutAddressMutation = useSaveCheckoutAddressMutation();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saveCheckoutAddressMutation.isPending) return;

    if (isAuthLoading) {
      toast.info("Checking your account. Please try again in a moment.");
      return;
    }

    if (!currentUser) {
      toast.error("Please log in to continue.");
      navigate({
        to: "/Login",
        search: { redirect: location.href },
      });
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

      const note = storedCheckout.note || "";

      if (!requiresShipping) {
        saveShopCheckout({
          customer,
          address: null,
        });

        if (onNext) {
          onNext();
          return;
        }

        navigate({ to: "/ShippingService" });
        return;
      }

      const data = await saveCheckoutAddressMutation.mutateAsync({
        ...form,
        notes: note,
      });
      saveShopCheckout({
        customer,
        address: data?.address || form,
      });

      if (onNext) {
        onNext();
        return;
      }

      navigate({ to: "/ShippingService" });
    } catch (err) {
      toast.error(err.message || "Unable to save your information. Please try again.");
    }
  };

  // --- Discount Calculation ---
  const summary = calculateCartSummary(cart);

  return (
    <div className="bg-background lg:flex">
      <div className="flex flex-col lg:w-4/5">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-4xl flex-col gap-6 bg-background p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required autoComplete="given-name" error={fieldErrors.firstName} />
            <InputField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required autoComplete="family-name" error={fieldErrors.lastName} />
          </div>

          <InputField label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required type="tel" autoComplete="tel" error={fieldErrors.phone} />

          {requiresShipping ? (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputField label="Country / Region" name="country" value={form.country} onChange={handleChange} placeholder="Country" required autoComplete="country" error={fieldErrors.country} />
                <InputField label="Company Name" name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company (optional)" autoComplete="organization" />
              </div>

              <InputField label="Residential Address" name="streetAddress" value={form.streetAddress} onChange={handleChange} placeholder="House number and street name" required autoComplete="street-address" error={fieldErrors.streetAddress} />

              <InputField label="Apt / Suite" name="aptSuite" value={form.aptSuite} onChange={handleChange} placeholder="Apt, suite (optional)" autoComplete="address-line2" />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputField label="City" name="city" value={form.city} onChange={handleChange} placeholder="City" required autoComplete="address-level2" error={fieldErrors.city} />
                <SelectField label="State" name="state" value={form.state} onChange={handleChange} options={STATES} required error={fieldErrors.state} />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputField label="Postal Code" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" required autoComplete="postal-code" error={fieldErrors.postalCode} />
              </div>

              <FormTextarea
                label="Delivery Instruction"
                name="deliveryInstruction"
                value={form.deliveryInstruction}
                onChange={handleChange}
                placeholder="Delivery Instruction"
              />
            </>
          ) : (
            <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-sm text-foreground">
              This order only contains digital items, so we only need your contact details here.
            </div>
          )}
        </form>
      </div>

      {/* Divider Line */}
      <div className="px-1">
        <Separator orientation="vertical" className="ml-8" />
      </div>

      {/* Right - Cart Summary */}
      <div className="flex flex-col gap-8 p-4 px-5 lg:gap-20 lg:p-8 lg:px-14">
        <div className="flex flex-col gap-4 lg:gap-8">
          <p className="lg:text-4xl poppins-bold text-foreground">YOUR ORDER</p>
          <p className="font-lato font-medium text-base leading-5 text-muted-foreground">
            Review all the products you want to buy
          </p>
        </div>

        <div className="flex flex-col gap-2 poppins-extralight lg:gap-5">
          {cart.length > 0 ? (
            cart.map((product) => (
              <CustomerProduct
                key={getCommerceItemKey(product)}
                title={product.name}
                item={product.quantity}
                price={Number(product.price || 0).toLocaleString()}
                priceLabel="PKR"
                image={resolveBackendAssetUrl(product.image || product.images?.[0], "https://via.placeholder.com/300x200")}
              />
            ))
          ) : (
            <p className="p-5 text-center text-muted-foreground">Your cart is empty.</p>
          )}
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <OrderSummaryLine
            label="Shipping"
            value={formatShopCurrency(summary.shipping)}
            labelClassName={summaryLabelClassName}
            valueClassName={summaryValueClassName}
          />
          <OrderSummaryLine
            label="Discount 10%"
            value={`- ${formatShopCurrency(summary.discount)}`}
            labelClassName={summaryLabelClassName}
            valueClassName={summaryValueClassName}
          />
          <OrderSummaryLine
            label="Price"
            value={formatShopCurrency(summary.subtotal)}
            labelClassName={summaryLabelClassName}
            valueClassName={summaryValueClassName}
          />
          <OrderSummaryLine
            label="Total Price"
            value={formatShopCurrency(summary.total)}
            labelClassName={summaryLabelClassName}
            valueClassName={summaryTotalValueClassName}
          />
        </div>

        <Separator />

        <div className="flex justify-center">
          <Button
            type="submit"
            className="h-auto bg-foreground py-2 text-center text-sm text-primary poppins-bold lg:px-20 lg:text-xl"
            onClick={handleSubmit}
            disabled={saveCheckoutAddressMutation.isPending}
          >
            {saveCheckoutAddressMutation.isPending ? "Processing..." : requiresShipping ? "CONTINUE TO SHIPPING" : "CONTINUE TO PAYMENT"}
          </Button>
        </div>
      </div>
    </div>
  );
};

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

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
};

CustomerInfomation.propTypes = {
  onNext: PropTypes.func,
};

export default CustomerInfomation;
