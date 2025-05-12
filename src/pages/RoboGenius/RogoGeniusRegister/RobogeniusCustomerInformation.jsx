import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import robo from "../../../assets/child.png";
import { FaTrash } from "react-icons/fa"; // Import delete icon

const STATES = [
  { value: "BAL", label: "Balochistan" },
  { value: "KP", label: "Khyber Pakhtunkhwa" },
  { value: "PUN", label: "Punjab" },
  { value: "ICT", label: "Islamabad Capital Territory" },
  { value: "SIN", label: "Sindh" },
];

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" }
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

const RobogeniusCustomerInformation = ({ onNext, onSaveChildren }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { plan, price, billingCycle } = useSelector((state) => state.plans);

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
      gender: "",
      saved: false
    }
  ]);

  const [savedChildren, setSavedChildren] = useState([]);

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
        schoolName: "", streetAddress: "", city: "", phone: "", postalCode: "", gender: "",
        saved: false
      }
    ]);
  };

  const removeChildForm = (index) => {
    if (childrenForms.length > 1) {
      const updatedChildren = [...childrenForms];
      const removedChild = updatedChildren.splice(index, 1)[0];

      setChildrenForms(updatedChildren);

      // Remove from saved children if it was saved
      if (removedChild.saved) {
        setSavedChildren(prev =>
          prev.filter(child =>
            child.firstName !== removedChild.firstName ||
            child.lastName !== removedChild.lastName
          )
        );
      }
    }
  };

  const saveChildForm = (index) => {
    // Check if parent form is complete
    const requiredParentFields = ['firstName', 'lastName', 'email', 'country',
      'streetAddress', 'city', 'state', 'phone', 'postalCode'];
    const isParentComplete = requiredParentFields.every(field => parentForm[field]);

    if (!isParentComplete) {
      alert("Please complete all required parent information first");
      return;
    }

    // Check if current child form is complete
    const child = childrenForms[index];
    const requiredChildFields = ['firstName', 'lastName', 'email', 'dateOfBirth',
      'country', 'streetAddress', 'city', 'phone', 'postalCode'];
    const isChildComplete = requiredChildFields.every(field => child[field]);

    if (!isChildComplete) {
      alert("Please complete all required child information");
      return;
    }

    // Mark as saved
    const updatedChildrenForms = [...childrenForms];
    updatedChildrenForms[index] = { ...updatedChildrenForms[index], saved: true };
    setChildrenForms(updatedChildrenForms);

    // Add to saved children if not already there
    if (!savedChildren.some(c =>
      c.firstName === child.firstName &&
      c.lastName === child.lastName &&
      c.email === child.email)) {
      setSavedChildren(prev => [...prev, child]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!currentUser) {
      alert("Please log in to continue.");
      return navigate("/login"); // Redirect to login
    }

    if (!plan) {
      alert("Please select a plan before continuing");
      return navigate("/plans"); // Redirect to plans page
    }

    // Check for unsaved children
    const unsavedChildren = childrenForms.filter(child => !child.saved);
    if (unsavedChildren.length > 0) {
      alert(`Please save ${unsavedChildren.length} unsaved child form(s) before continuing`);
      return;
    }

    // Validate required parent fields
    const requiredParentFields = ['firstName', 'lastName', 'email', 'country',
      'streetAddress', 'city', 'state', 'phone', 'postalCode'];
    const missingParentFields = requiredParentFields.filter(field => !parentForm[field]);

    if (missingParentFields.length > 0) {
      alert(`Missing required parent fields: ${missingParentFields.join(', ')}`);
      return;
    }

    setLoading(true);
    console.log(plan);

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
          children: childrenForms.map(child => ({
            ...child,
         
            saved: undefined
          })),
          plan: {
            name: plan,
            price,
            billingCycle
          }
        }),
      });

      const data = await response.json();

      onSaveChildren(childrenForms.filter(child => child.saved));


      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Successful submission
      console.log('Registration successful:', data);

      // Option 1: Call onNext if provided
      if (onNext) {
        onNext(data); // Pass response data to next step
      }
      // Option 2: Navigate to success page
      // navigate("/registration-success");

    } catch (error) {
      console.error('Registration error:', error);

      // More user-friendly error messages
      let errorMessage = error.message;
      if (error.message.includes("Network Error")) {
        errorMessage = "Network error - please check your connection";
      } else if (error.message.includes("404")) {
        errorMessage = "Service unavailable - please try again later";
      }

      alert(`Registration failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total price
  const totalPrice = savedChildren.length * price;

  return (
    <div className="lg:flex flex-row bg-gray">
      <div className="flex flex-col lg:w-3/5">
        <form onSubmit={handleSubmit} className="space-y-6 bg-background p-6 max-w-4xl ">
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
                  {savedChildren.length === 0 ? "REGISTER YOUR CHILD" : `Child ${index + 1} Information`}
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="First Name" name="firstName" value={child.firstName} onChange={(e) => handleChildChange(index, e)} placeholder="First Name" required />
                <InputField label="Last Name" name="lastName" value={child.lastName} onChange={(e) => handleChildChange(index, e)} placeholder="Last Name" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField
                  label="Gender"
                  name="gender"
                  value={child.gender}
                  onChange={(e) => handleChildChange(index, e)}
                  options={GENDER_OPTIONS}
                  required
                />
                <InputField label="Date of Birth" name="dateOfBirth" type="date" value={child.dateOfBirth} onChange={(e) => handleChildChange(index, e)} placeholder="Date of Birth" required />
              </div>

              <InputField label="Child Email" name="email" type="email" value={child.email} onChange={(e) => handleChildChange(index, e)} placeholder="Email" required />

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
                {!child.saved && (
                  <button
                    type="button"
                    onClick={() => saveChildForm(index)}
                    className="text-center lg:text-xl text-sm poppins-bold text-white bg-green-600 py-2 lg:px-20 px-5 hover:bg-green-700"
                  >
                    SAVE CHILD
                  </button>
                )}
                {index === childrenForms.length - 1 && (
                  <button type="button" onClick={addChildForm} className="text-center lg:text-xl text-sm poppins-bold text-gold bg-brown py-2 lg:px-20 px-5">
                    ADD ANOTHER CHILD
                  </button>
                )}
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeChildForm(index)}
                    className="text-center lg:text-xl text-sm poppins-bold text-red-600 bg-gray py-2 lg:px-5 px-3 hover:bg-red-300 flex items-center"
                  >
                    <FaTrash className="mr-2" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Cancel */}
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

      {/* Right Side - Order Summary */}
      <div className="lg:px-14 px-5 lg:p-8 p-4 lg:space-y-20 space-y-8">
        <div className="lg:space-y-8 space-y-4">
          <p className="lg:text-4xl poppins-bold text-brown">REVIEW YOUR REGISTRATION</p>
        </div>

        {/* Saved Children Cards */}
        {savedChildren.length > 0 ? (
          savedChildren.map((child, index) => (
            <div key={index} className="lg:space-y-5 space-y-2 poppins-extralight">
              <div className="flex flex-row space-x-3">
                <img className="lg:h-24 lg:w-24" src={robo} alt="img" />
                <div className="lg:text-base text-wrap text-sm flex flex-col gap-1">
                  <p className="text-wrap">
                    <span className="font-bold">Plan:</span> <span className="font-normal">{plan}</span>
                  </p>
                  <p className="text-wrap">
                    <span className="font-bold">Name:</span>{" "}
                    <span className="font-normal">{child.firstName} {child.lastName}</span>
                  </p>
                  <p className="text-wrap">
                    <span className="font-bold">Payment Plan:</span>{" "}
                    <span className="font-normal">{billingCycle}</span>
                  </p>
                </div>
                <p className="text-wrap">
                  <span className="font-bold">Price:</span>{" "}
                  <span className="font-normal">{price?.toLocaleString()}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="lg:space-y-5 space-y-2 poppins-extralight">
            <p className="font-poppins font-medium text-[16px] leading-[20px] tracking-[0] text-[#7E7F7C]">No children registered yet</p>
          </div>
        )}

        <div className="h-0 border border-[#D4D4D4]"></div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-[#7E7F7C] font-lato text-base">Number of Children</p>
            <p className="font-lato text-[20px]">
              {savedChildren.length}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#7E7F7C] font-lato text-base">Price per Child</p>
            <p className="font-lato text-[20px]">
              PKR {price?.toLocaleString() || '0'}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#7E7F7C] font-lato text-base">Total Price</p>
            <p className="font-lato text-[20px] font-extrabold">
              PKR {totalPrice?.toLocaleString() || '0'}
            </p>
          </div>
        </div>

        <div className="h-0 border border-[#D4D4D4]"></div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="text-center lg:text-xl text-sm poppins-bold text-[#F5AB34] bg-[#362D2C] py-2 lg:px-20 px-5"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "CONTINUE TO REGISTER"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RobogeniusCustomerInformation;
