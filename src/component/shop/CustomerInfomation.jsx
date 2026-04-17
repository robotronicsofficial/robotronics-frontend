import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { calculateCartSummary, formatShopCurrency, loadShopCheckout, saveShopCheckout } from "../../lib/shopCheckout";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";

const STATES = [
  { value: "BAL", label: "Balochistan" },
  { value: "KP", label: "Khyber Pakhtunkhwa" },
  { value: "PUN", label: "Punjab" },
  { value: "ICT", label: "Islamabad Capital Territory" },
  { value: "SIN", label: "Sindh" },
];

const CHECKOUT_NOTE_STORAGE_KEY = "checkoutNote";
const getCheckoutNote = () => (
  typeof window === "undefined" ? "" : window.sessionStorage.getItem(CHECKOUT_NOTE_STORAGE_KEY) || ""
);
const clearCheckoutNote = () => {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(CHECKOUT_NOTE_STORAGE_KEY);
  }
};

const InputField = ({ label, name, value, onChange, placeholder, required = false, type = "text" }) => (
  <div>
    <label htmlFor={name} className="block text-sm poppins-light text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="p-3 px-5 mt-1 block w-full border-gray-300 poppins-light rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options, required = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm poppins-light text-gray-700">{label}</label>
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      className="p-3 mt-1 block w-full border-gray-300 poppins-light rounded-md shadow-sm focus:border-yellow focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const CustomerInfomation = ({ onNext }) => {
  const { cart } = useSelector((state) => state.cart);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const storedCheckout = loadShopCheckout();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: storedCheckout.address?.firstName || "",
    lastName: storedCheckout.address?.lastName || "",
    country: storedCheckout.address?.country || "",
    companyName: storedCheckout.address?.companyName || "",
    streetAddress: storedCheckout.address?.streetAddress || "",
    aptSuite: storedCheckout.address?.aptSuite || "",
    city: storedCheckout.address?.city || "",
    state: storedCheckout.address?.state || "",
    phone: storedCheckout.address?.phone || "",
    postalCode: storedCheckout.address?.postalCode || "",
    deliveryInstruction: storedCheckout.address?.deliveryInstruction || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert("Please log in to continue.");
    setLoading(true);

    try {
      const noteFromCart = getCheckoutNote();

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/addresses`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          userId: currentUser._id,
          notes: noteFromCart,
        }),
      });
      

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || 'Failed to save address');
      }

      const data = await response.json();
      saveShopCheckout({
        address: data?.address || form,
      });

      clearCheckoutNote();

      if (onNext) {
        onNext();
        return;
      }

      navigate("/ShippingService");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Discount Calculation ---
  const summary = calculateCartSummary(cart);

  return (
    <div className="lg:flex flex-row bg-gray">
      <div className="flex flex-col lg:w-4/5">
        <form onSubmit={handleSubmit} className="space-y-6 bg-background p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required />
            <InputField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required />
          </div>

          {/* Additional Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Country / Region" name="country" value={form.country} onChange={handleChange} placeholder="Country" required />
            <InputField label="Company Name" name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company (optional)" />
          </div>

          <InputField label="Residential Address" name="streetAddress" value={form.streetAddress} onChange={handleChange} placeholder="House number and street name" required />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="City" name="city" value={form.city} onChange={handleChange} placeholder="City" required />
            <SelectField label="State" name="state" value={form.state} onChange={handleChange} options={STATES} required />
          </div>

          {/* Other Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required />
            <InputField label="Postal Code" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" required />
          </div>

          <div>
            <label htmlFor="deliveryInstruction" className="block text-sm poppins-light text-gray-700">Delivery Instruction</label>
            <textarea
              name="deliveryInstruction"
              id="deliveryInstruction"
              value={form.deliveryInstruction}
              onChange={handleChange}
              className="p-7 mt-1 block w-full border-gray-300 poppins-light rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Delivery Instruction"
            />
          </div>
        </form>
      </div>

      {/* Divider Line */}
      <div className="px-1">
        <div className="h-full w-0 border border-[#D4D4D4] ml-8"></div>
      </div>

      {/* Right - Cart Summary */}
      <div className="lg:px-14 px-5 lg:p-8 p-4 lg:space-y-20 space-y-8">
        <div className="lg:space-y-8 space-y-4">
          <p className="lg:text-4xl poppins-bold text-brown">YOUR ORDER</p>
          <p className="font-lato font-medium text-base leading-5 text-[#7E7F7C]">
            Review all the products you want to buy
          </p>

        </div>

        <div className="lg:space-y-5 space-y-2 poppins-extralight">
          {cart.length > 0 ? (
            cart.map((product) => (
              <div className="flex flex-row space-x-3" key={product._id || product.id}>
                <img
                  className="lg:h-20 lg:w-24 object-cover"
                  src={resolveBackendAssetUrl(product.images?.[0], "https://via.placeholder.com/300x200")}
                  alt={product.name}
                />
                <div className="lg:text-base text-wrap text-sm flex flex-col gap-1">
                  <p className="font-bold text-wrap">{product.name}</p>
                  <div className="flex gap-2"><span>Quantity:</span><p>{product.quantity}</p></div>
                  <p className="font-bold">PKR {Number(product.price || 0).toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-5 text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        <div className="h-0 border border-[#D4D4D4]"></div>

        <div className="space-y-2">
          {/* Summary Items */}
          <SummaryItem label="Shipping" value={formatShopCurrency(summary.shipping)} />
          <SummaryItem label="Discount 10%" value={`- ${formatShopCurrency(summary.discount)}`} />
          <SummaryItem label="Price" value={formatShopCurrency(summary.subtotal)} />
          <SummaryItem label="Total Price" value={formatShopCurrency(summary.total)} highlight />
        </div>

        <div className="h-0 border border-[#D4D4D4]"></div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="text-center lg:text-xl text-sm poppins-bold text-[#F5AB34] bg-[#362D2C] py-2 lg:px-20 px-5"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "CONTINUE TO SHIPPING"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Summary display line
const SummaryItem = ({ label, value, highlight = false }) => (
  <div className="flex justify-between">
    <p className="text-[#7E7F7C] font-lato text-base">{label}</p>
    <p className={`font-lato text-[20px] font-extrabold ${highlight ? 'text-yellow' : 'text-[#362D2C]'}`}>
      {value}
    </p>
  </div>
);

export default CustomerInfomation;
