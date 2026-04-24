import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import AppImage from "../../../component/AppImage";
import robo from "../../../assets/child.webp";
import { Trash2 } from "lucide-react";
import { normalizeParentRecord } from "../../../lib/subscription";
import { buildSubscriptionCheckout, saveSubscriptionCheckout } from "../../../lib/subscriptionCheckout";
import {
  selectSelectedPlan,
  useSelectedPlanStore,
} from "../../../stores/selectedPlanStore";
import { useParent, useSaveParentMutation } from "../../../hooks/useAccount";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormInput, FormSelect } from "../../../components/forms/FormControls";

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

const withoutSavedFlag = (child) => {
  const nextChild = { ...child };
  delete nextChild.saved;
  return nextChild;
};

const InputField = ({ label, name, value, onChange, placeholder, required = false, type = "text" }) => (
  <FormInput label={label} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} type={type} />
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
};

const SelectField = ({ label, name, value, onChange, options, required = false }) => (
  <FormSelect label={label} name={name} value={value} onChange={onChange} options={options} required={required} />
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
    })
  ).isRequired,
  required: PropTypes.bool,
};

const SubscriptionCustomerInformation = ({ onNext, onSaveChildren }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { planId, plan, price, billingCycle } = useSelectedPlanStore(selectSelectedPlan);
  const { data: loadedParent } = useParent(currentUser?._id);
  const saveParentMutation = useSaveParentMutation();

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

  useEffect(() => {
    if (!loadedParent) return;

    setParentForm({
      firstName: loadedParent.firstName || "",
      lastName: loadedParent.lastName || "",
      email: loadedParent.email || "",
      country: loadedParent.country || "",
      companyName: loadedParent.companyName || "",
      streetAddress: loadedParent.streetAddress || "",
      aptSuite: loadedParent.aptSuite || "",
      city: loadedParent.city || "",
      state: loadedParent.state || "",
      phone: loadedParent.phone || "",
      postalCode: loadedParent.postalCode || "",
      deliveryInstruction: loadedParent.deliveryInstruction || ""
    });
  }, [loadedParent]);

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
      return navigate("/Login"); // Redirect to login
    }

    if (!planId || !billingCycle) {
      alert("Please start the membership checkout before continuing");
      return navigate("/subscriptions");
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

    try {
      const data = await saveParentMutation.mutateAsync({
        parent: {
          ...parentForm,
          userId: currentUser._id,
        },
        children: childrenForms.map(withoutSavedFlag),
        plan: {
          planId,
          billingCycle,
        },
      });

      const persistedParent = normalizeParentRecord(
        data?.parent || {
          ...parentForm,
          children: childrenForms.map(withoutSavedFlag),
        }
      );
      const persistedChildren = persistedParent.children;
      const checkout = buildSubscriptionCheckout({
        parent: persistedParent,
        children: persistedChildren,
        plan: {
          planId,
          name: plan,
          price,
          billingCycle,
        },
      });

      saveSubscriptionCheckout(checkout);
      onSaveChildren?.(persistedChildren);

      if (onNext) {
        onNext(checkout);
      }

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
    }
  };

  // Calculate total price
  const totalPrice = savedChildren.length * price;

  return (
    <div className="lg:flex flex-row bg-background">
      <div className="flex flex-col lg:w-3/5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 bg-background p-6 max-w-4xl">
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
            <div key={index} className="flex flex-col w-full pt-6 gap-y-6">
              <div className="flex flex-col gap-y-5 px-6 md:px-10 py-4 md:py-8">
                <h1 className="text-2xl md:text-4xl poppins-bold text-foreground text-wrap">
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

              <div className="flex gap-x-4 mt-4">
                {!child.saved && (
                  <Button
                    type="button"
                    onClick={() => saveChildForm(index)}
                    className="h-auto bg-success py-2 text-center text-sm text-background poppins-bold hover:bg-success/90 lg:px-20 lg:text-xl"
                  >
                    SAVE CHILD
                  </Button>
                )}
                {index === childrenForms.length - 1 && (
                  <Button type="button" onClick={addChildForm} className="h-auto bg-foreground py-2 text-center text-sm text-primary poppins-bold lg:px-20 lg:text-xl">
                    ADD ANOTHER CHILD
                  </Button>
                )}
                {index > 0 && (
                  <Button
                    type="button"
                    onClick={() => removeChildForm(index)}
                    variant="destructive"
                    className="h-auto py-2 text-center text-sm poppins-bold lg:px-5 lg:text-xl"
                  >
                    <Trash2 className="mr-2" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          {/* Cancel */}
          <div className="flex flex-col md:flex-row justify-between mt-6 gap-y-4 md:gap-y-0 md:gap-x-4">
            <Button type="button" variant="outline" onClick={() => navigate("/subscriptions")} className="h-auto w-full bg-card px-6 py-2 text-muted-foreground poppins-bold md:w-auto">
              CANCEL
            </Button>
          </div>
        </form>
      </div>

      {/* Divider */}
      <div className="px-1">
        <Separator orientation="vertical" className="ml-8" />
      </div>

      {/* Right Side - Order Summary */}
      <div className="flex flex-col lg:px-14 px-5 lg:p-8 p-4 lg:gap-y-20 gap-y-8">
        <div className="flex flex-col lg:gap-y-8 gap-y-4">
          <p className="lg:text-4xl poppins-bold text-foreground">REVIEW YOUR REGISTRATION</p>
        </div>

        {/* Saved Children Cards */}
        {savedChildren.length > 0 ? (
          savedChildren.map((child, index) => (
            <div key={index} className="flex flex-col lg:gap-y-5 gap-y-2 poppins-extralight">
              <div className="flex flex-row gap-x-3">
                <AppImage className="lg:h-24 lg:w-24" src={robo} alt="" />
                <div className="lg:text-base text-wrap text-sm flex flex-col gap-1">
                  <p className="text-wrap">
                    <span className="font-bold">Membership:</span> <span className="font-normal">{plan}</span>
                  </p>
                  <p className="text-wrap">
                    <span className="font-bold">Name:</span>{" "}
                    <span className="font-normal">{child.firstName} {child.lastName}</span>
                  </p>
                  <p className="text-wrap">
                    <span className="font-bold">Billing:</span>{" "}
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
          <div className="flex flex-col lg:gap-y-5 gap-y-2 poppins-extralight">
            <p className="font-poppins font-medium text-[16px] leading-[20px] tracking-[0] text-muted-foreground">No children registered yet</p>
          </div>
        )}

        <Separator />

        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between">
            <p className="text-muted-foreground font-lato text-base">Number of Children</p>
            <p className="font-lato text-[20px]">
              {savedChildren.length}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground font-lato text-base">Price per Child</p>
            <p className="font-lato text-[20px]">
              PKR {price?.toLocaleString() || '0'}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground font-lato text-base">Total Price</p>
            <p className="font-lato text-[20px] font-extrabold">
              PKR {totalPrice?.toLocaleString() || '0'}
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex justify-center">
          <Button
            type="submit"
            className="h-auto bg-foreground py-2 text-center text-sm text-primary poppins-bold lg:px-20 lg:text-xl"
            onClick={handleSubmit}
            disabled={saveParentMutation.isPending}
          >
            {saveParentMutation.isPending ? "Processing..." : "CONTINUE TO REGISTER"}
          </Button>
        </div>
      </div>
    </div>
  );
};

SubscriptionCustomerInformation.propTypes = {
  onNext: PropTypes.func,
  onSaveChildren: PropTypes.func,
};

export default SubscriptionCustomerInformation;
