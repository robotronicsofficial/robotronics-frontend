import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useSelector } from "react-redux";

const STATES = [
  { value: "BAL", label: "Balochistan" },
  { value: "KP", label: "Khyber Pakhtunkhwa" },
  { value: "PUN", label: "Punjab" },
  { value: "ICT", label: "Islamabad Capital Territory" },
  { value: "SIN", label: "Sindh" },
];

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

const RobogeniusCustomerInformation = ({ onNext }) => {
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [parentForm, setParentForm] = useState({
    firstName: "", lastName: "", email: "", country: "", companyName: "",
    streetAddress: "", aptSuite: "", city: "", state: "",
    phone: "", postalCode: "", deliveryInstruction: "",
  });

  const [childrenForms, setChildrenForms] = useState([
    {
      firstName: "", lastName: "", email: "", dateOfBirth: "", country: "",
      schoolName: "", streetAddress: "", city: "", phone: "", postalCode: "",
    }
  ]);

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setParentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChildChange = (index, e) => {
    const { name, value } = e.target;
    setChildrenForms((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const addChildForm = () => {
    setChildrenForms(prev => [
      ...prev,
      {
        firstName: "", lastName: "", email: "", dateOfBirth: "", country: "",
        schoolName: "", streetAddress: "", city: "", phone: "", postalCode: "",
      }
    ]);
  };

  const removeChildForm = (index) => {
    if (childrenForms.length > 1) {
      setChildrenForms(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert("Please log in to continue.");

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/parents`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parent: {
            ...parentForm,
            userId: currentUser._id,
          },
          children: childrenForms,
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || 'Failed to save parent form');
      }

      const data = await response.json();
      console.log('Address saved:', data);
      onNext?.();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:flex flex-row bg-gray">
      <div className="flex flex-col lg:w-3/5">
        <form onSubmit={handleSubmit} className="space-y-6 bg-background p-6 max-w-4xl mx-auto">
          {/* Parent Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Parent First Name" name="firstName" value={parentForm.firstName} onChange={handleParentChange} placeholder="Parent First Name" required />
            <InputField label="Parent Last Name" name="lastName" value={parentForm.lastName} onChange={handleParentChange} placeholder="Parent Last Name" required />
          </div>

          <InputField label="Parent Email" name="email" type="email" value={parentForm.email} onChange={handleParentChange} placeholder="Parent Email" required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Country / Region" name="country" value={parentForm.country} onChange={handleParentChange} placeholder="Country" required />
            <InputField label="Company Name" name="companyName" value={parentForm.companyName} onChange={handleParentChange} placeholder="Company (optional)" />
          </div>

          <InputField label="Residential Address" name="streetAddress" value={parentForm.streetAddress} onChange={handleParentChange} placeholder="House number and street name" required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="City" name="city" value={parentForm.city} onChange={handleParentChange} placeholder="City" required />
            <SelectField label="State" name="state" value={parentForm.state} onChange={handleParentChange} options={STATES} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Phone" name="phone" value={parentForm.phone} onChange={handleParentChange} placeholder="Phone" required />
            <InputField label="Postal Code" name="postalCode" value={parentForm.postalCode} onChange={handleParentChange} placeholder="Postal Code" required />
          </div>

          {/* Children Info */}
          {childrenForms.map((child, index) => (
            <div key={index} className="w-full pt-6 space-y-6">
              <div className="space-y-5 px-6 md:px-10 py-4 md:py-8">
                <h1 className="text-2xl md:text-4xl poppins-bold text-brown text-wrap">
                  Child {index + 1} Information
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="First Name" name="firstName" value={child.firstName} onChange={(e) => handleChildChange(index, e)} placeholder="First Name" required />
                <InputField label="Last Name" name="lastName" value={child.lastName} onChange={(e) => handleChildChange(index, e)} placeholder="Last Name" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Child Email" name="email" type="email" value={child.email} onChange={(e) => handleChildChange(index, e)} placeholder="Email" required />
                <InputField label="Date of Birth" name="dateOfBirth" type="date" value={child.dateOfBirth} onChange={(e) => handleChildChange(index, e)} placeholder="Date of Birth" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Country / Region" name="country" value={child.country} onChange={(e) => handleChildChange(index, e)} placeholder="Country" required />
                <InputField label="School Name" name="schoolName" value={child.schoolName} onChange={(e) => handleChildChange(index, e)} placeholder="School Name" />
              </div>

              <InputField label="House Address" name="streetAddress" value={child.streetAddress} onChange={(e) => handleChildChange(index, e)} placeholder="House number and street name" required />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="City" name="city" value={child.city} onChange={(e) => handleChildChange(index, e)} placeholder="City" required />
                <InputField label="Phone" name="phone" value={child.phone} onChange={(e) => handleChildChange(index, e)} placeholder="Phone" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Postal Code" name="postalCode" value={child.postalCode} onChange={(e) => handleChildChange(index, e)} placeholder="Postal Code" required />
              </div>

              <div className="flex space-x-4 mt-4">
                {index === childrenForms.length - 1 && (
                  <button type="button" onClick={addChildForm} className="text-center lg:text-xl text-sm poppins-bold text-gold bg-brown py-2 lg:px-20 px-5">
                    ADD ANOTHER CHILD
                  </button>
                )}
                {index > 0 && (
                  <button type="button" onClick={() => removeChildForm(index)} className="text-center lg:text-xl text-sm poppins-bold text-white bg-red-500 py-2 lg:px-20 px-5 hover:bg-red-600">
                    DELETE CHILD
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Submit / Cancel */}
          <div className="flex flex-col md:flex-row justify-between mt-6 space-y-4 md:space-y-0 md:space-x-4">
            <button type="button" onClick={() => navigate("/Robogeniushome")} className="poppins-bold text-gray-700 bg-white py-2 px-6 border border-gray-300 hover:bg-gray-50 w-full md:w-auto">
              CANCEL
            </button>
          </div>
        </form>
      </div>

      {/* Divider */}
      <div className="px-1">
        <div className="h-full w-0 border border-[#D4D4D4] ml-8"></div>
      </div>

      {/* Right Side */}
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
              <div className="flex flex-row space-x-3" key={product.id}>
                <img className="lg:h-20 lg:w-24" src={`${import.meta.env.VITE_BACKEND_URL}/${product.images[0]}`} alt={product.name} />
                <div className="lg:text-base text-wrap text-sm flex flex-col gap-1">
                  <p className="font-bold text-wrap">{product.name}</p>
                  <div className="flex gap-2"><span>Quantity:</span><p>{product.quantity}</p></div>
                  <p className="font-bold">PKR {product.price.toLocaleString()}</p>
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
          <SummaryItem label="Shipping" value={`PKR 500`} />
          <SummaryItem label="Discount 10%" value={`- PKR 500`} />
          <SummaryItem label="Price" value={`PKR 500`} />
          <SummaryItem label="Total Price" value={`PKR 500`} highlight />
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

export default RobogeniusCustomerInformation;
