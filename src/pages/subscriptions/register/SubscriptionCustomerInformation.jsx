import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/useAuth";
import { useLocation, useNavigate } from "@tanstack/react-router";
import AppImage from "@/components/site/AppImage";
import robo from "../../../assets/child.webp";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { normalizeParentRecord } from "../../../lib/subscription";
import {
  buildSubscriptionCheckout,
  saveSubscriptionCheckout,
} from "../../../lib/subscriptionCheckout";
import { useSelectedPlanStore } from "../../../stores/selectedPlanStore";
import { useCurrentParent, useSaveParentMutation } from "../../../hooks/useAccount";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormInput, FormSelect } from "@/components/forms/FormControls";

const DRAFT_STORAGE_KEY = "robotronics:subscriptionDraft";

const STATES = [
  { value: "BAL", label: "Balochistan" },
  { value: "KP", label: "Khyber Pakhtunkhwa" },
  { value: "PUN", label: "Punjab" },
  { value: "ICT", label: "Islamabad Capital Territory" },
  { value: "SIN", label: "Sindh" },
];

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const EMPTY_PARENT_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  streetAddress: "",
  aptSuite: "",
  city: "",
  state: "",
  postalCode: "",
  deliveryInstruction: "",
};

const EMPTY_CHILD_FORM = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  email: "",
  schoolName: "",
  country: "",
  streetAddress: "",
  city: "",
  phone: "",
  postalCode: "",
  saved: false,
};

const withoutSavedFlag = (child) => {
  const nextChild = { ...child };
  delete nextChild.saved;
  return nextChild;
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  hint,
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
    />
    {hint ? (
      <p className="text-xs text-muted-foreground poppins-light">{hint}</p>
    ) : null}
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
  hint: PropTypes.string,
};

const SelectField = ({ label, name, value, onChange, options, required = false }) => (
  <FormSelect
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    options={options}
    required={required}
  />
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

const OptionalSection = ({ label, open, onToggle, children }) => (
  <div className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/60 p-4">
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center justify-between gap-3 text-left"
    >
      <span className="text-sm font-semibold text-foreground poppins-bold">
        {label}
      </span>
      {open ? (
        <ChevronUp className="h-4 w-4 text-muted-foreground" />
      ) : (
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
    {open ? <div className="flex flex-col gap-4">{children}</div> : null}
  </div>
);

OptionalSection.propTypes = {
  label: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const SubscriptionCustomerInformation = ({ onNext, onSaveChildren }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isAuthLoading } = useAuth();
  const planId = useSelectedPlanStore((state) => state.planId);
  const plan = useSelectedPlanStore((state) => state.plan);
  const price = useSelectedPlanStore((state) => state.price);
  const billingCycle = useSelectedPlanStore((state) => state.billingCycle);
  const { data: loadedParent } = useCurrentParent(currentUser?._id);
  const saveParentMutation = useSaveParentMutation();

  const [parentForm, setParentForm] = useState(EMPTY_PARENT_FORM);
  const [childrenForms, setChildrenForms] = useState([{ ...EMPTY_CHILD_FORM }]);
  const [savedChildren, setSavedChildren] = useState([]);
  const [parentOptionalOpen, setParentOptionalOpen] = useState(false);
  const [childOptionalOpen, setChildOptionalOpen] = useState({});
  const [draftBannerVisible, setDraftBannerVisible] = useState(false);
  const draftRestoredRef = useRef(false);
  const hasHydratedRef = useRef(false);

  // Detect a persisted draft on mount and offer restore.
  useEffect(() => {
    if (hasHydratedRef.current) return;
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && (parsed.parentForm || parsed.childrenForms)) {
          setDraftBannerVisible(true);
        }
      }
    } catch (error) {
      console.warn("Could not read subscription draft", error);
    }
    hasHydratedRef.current = true;
  }, []);

  // Prefill from authenticated user (and saved parent record) when no draft is being restored.
  useEffect(() => {
    if (draftRestoredRef.current) return;
    if (!loadedParent && !currentUser) return;

    const source = loadedParent || currentUser || {};
    setParentForm((prev) => ({
      ...prev,
      firstName: prev.firstName || source.firstName || "",
      lastName: prev.lastName || source.lastName || "",
      email: prev.email || source.email || "",
      phone: prev.phone || source.phone || "",
      country: prev.country || source.country || "",
      streetAddress: prev.streetAddress || source.streetAddress || "",
      aptSuite: prev.aptSuite || source.aptSuite || "",
      city: prev.city || source.city || "",
      state: prev.state || source.state || "",
      postalCode: prev.postalCode || source.postalCode || "",
      deliveryInstruction: prev.deliveryInstruction || source.deliveryInstruction || "",
    }));
  }, [loadedParent, currentUser]);

  // Autosave every field change to localStorage.
  useEffect(() => {
    if (!hasHydratedRef.current) return;
    try {
      const payload = JSON.stringify({ parentForm, childrenForms });
      localStorage.setItem(DRAFT_STORAGE_KEY, payload);
    } catch (error) {
      console.warn("Could not persist subscription draft", error);
    }
  }, [parentForm, childrenForms]);

  const handleRestoreDraft = () => {
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.parentForm) {
          setParentForm({ ...EMPTY_PARENT_FORM, ...parsed.parentForm });
        }
        if (Array.isArray(parsed.childrenForms) && parsed.childrenForms.length) {
          setChildrenForms(
            parsed.childrenForms.map((child) => ({
              ...EMPTY_CHILD_FORM,
              ...child,
            }))
          );
        }
        draftRestoredRef.current = true;
      }
    } catch (error) {
      console.warn("Could not restore subscription draft", error);
    }
    setDraftBannerVisible(false);
  };

  const handleDiscardDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch (error) {
      console.warn("Could not clear subscription draft", error);
    }
    setDraftBannerVisible(false);
  };

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
    setChildrenForms((prev) => [...prev, { ...EMPTY_CHILD_FORM }]);
  };

  const removeChildForm = (index) => {
    if (childrenForms.length > 1) {
      const updatedChildren = [...childrenForms];
      const removedChild = updatedChildren.splice(index, 1)[0];
      setChildrenForms(updatedChildren);

      if (removedChild.saved) {
        setSavedChildren((prev) =>
          prev.filter(
            (child) =>
              child.firstName !== removedChild.firstName ||
              child.lastName !== removedChild.lastName
          )
        );
      }
    }
  };

  const toggleChildOptional = (index) => {
    setChildOptionalOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const saveChildForm = (index) => {
    const requiredParentFields = ["firstName", "lastName", "email", "phone", "country"];
    const isParentComplete = requiredParentFields.every((field) => parentForm[field]);

    if (!isParentComplete) {
      toast.error("Please complete all required parent information first");
      return;
    }

    const child = childrenForms[index];
    const requiredChildFields = ["firstName", "lastName", "dateOfBirth", "gender"];
    const isChildComplete = requiredChildFields.every((field) => child[field]);

    if (!isChildComplete) {
      toast.error("Please complete all required child information");
      return;
    }

    const updatedChildrenForms = [...childrenForms];
    updatedChildrenForms[index] = { ...updatedChildrenForms[index], saved: true };
    setChildrenForms(updatedChildrenForms);

    if (
      !savedChildren.some(
        (c) =>
          c.firstName === child.firstName &&
          c.lastName === child.lastName &&
          c.email === child.email
      )
    ) {
      setSavedChildren((prev) => [...prev, child]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAuthLoading) {
      toast.info("Checking your account. Please try again in a moment.");
      return;
    }

    if (!currentUser) {
      toast.error("Please log in to continue.");
      return navigate({
        to: "/Login",
        search: { redirect: location.href },
      });
    }

    if (!planId || !billingCycle) {
      toast.error("Please start the subscription checkout before continuing");
      return navigate({ to: "/subscriptions" });
    }

    const unsavedChildren = childrenForms.filter((child) => !child.saved);
    if (unsavedChildren.length > 0) {
      toast.error(
        `Please save ${unsavedChildren.length} unsaved child form(s) before continuing`
      );
      return;
    }

    const requiredParentFields = ["firstName", "lastName", "email", "phone", "country"];
    const missingParentFields = requiredParentFields.filter(
      (field) => !parentForm[field]
    );

    if (missingParentFields.length > 0) {
      toast.error(`Missing required parent fields: ${missingParentFields.join(", ")}`);
      return;
    }

    try {
      const data = await saveParentMutation.mutateAsync({
        parent: { ...parentForm, userId: currentUser._id },
        children: childrenForms.map(withoutSavedFlag),
        plan: { planId, billingCycle },
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
        plan: { planId, name: plan, price, billingCycle },
      });

      saveSubscriptionCheckout(checkout);
      onSaveChildren?.(persistedChildren);

      // Clear autosave once submission succeeds.
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        /* no-op */
      }

      if (onNext) onNext(checkout);
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = error.message;
      if (error.message.includes("Network Error")) {
        errorMessage = "Network error - please check your connection";
      } else if (error.message.includes("404")) {
        errorMessage = "Service unavailable - please try again later";
      }
      toast.error(`Registration failed: ${errorMessage}`);
    }
  };

  const totalPrice = savedChildren.length * price;

  return (
    <div className="lg:flex flex-row bg-background">
      <div className="flex flex-col lg:w-3/5">
        {draftBannerVisible ? (
          <div className="mx-6 mt-6 flex flex-col gap-3 rounded-2xl bg-muted p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-foreground poppins-light">
              We saved your progress. Continue where you left off?
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
	                onClick={handleRestoreDraft}
	                className="h-auto rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-accent hover:text-background"
	              >
                Restore
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleDiscardDraft}
                className="h-auto rounded-lg px-4 py-2 text-sm"
              >
                Start over
              </Button>
            </div>
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-6 bg-background p-6 max-w-4xl"
        >
          {/* Parent Info — required only */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl md:text-2xl poppins-bold text-foreground">
              Parent details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Parent First Name"
                name="firstName"
                value={parentForm.firstName}
                onChange={handleParentChange}
                placeholder="Parent First Name"
                required
              />
              <InputField
                label="Parent Last Name"
                name="lastName"
                value={parentForm.lastName}
                onChange={handleParentChange}
                placeholder="Parent Last Name"
                required
              />
            </div>

            <InputField
              label="Parent Email"
              name="email"
              type="email"
              value={parentForm.email}
              onChange={handleParentChange}
              placeholder="parent@example.com"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Phone"
                name="phone"
                value={parentForm.phone}
                onChange={handleParentChange}
                placeholder="Phone"
                required
              />
              <InputField
                label="Country / Region"
                name="country"
                value={parentForm.country}
                onChange={handleParentChange}
                placeholder="Country"
                required
              />
            </div>
          </div>

          <OptionalSection
            label="Billing address (optional — collected at payment if needed)"
            open={parentOptionalOpen}
            onToggle={() => setParentOptionalOpen((value) => !value)}
          >
            <InputField
              label="Residential Address"
              name="streetAddress"
              value={parentForm.streetAddress}
              onChange={handleParentChange}
              placeholder="House number and street name"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Apt / Suite"
                name="aptSuite"
                value={parentForm.aptSuite}
                onChange={handleParentChange}
                placeholder="Apt, suite, unit (optional)"
              />
              <InputField
                label="City"
                name="city"
                value={parentForm.city}
                onChange={handleParentChange}
                placeholder="City"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="State"
                name="state"
                value={parentForm.state}
                onChange={handleParentChange}
                options={STATES}
              />
              <InputField
                label="Postal Code"
                name="postalCode"
                value={parentForm.postalCode}
                onChange={handleParentChange}
                placeholder="Postal Code"
              />
            </div>
          </OptionalSection>

          {/* Children Info */}
          {childrenForms.map((child, index) => {
            const optionalOpen = Boolean(childOptionalOpen[index]);
            return (
              <div key={index} className="flex flex-col w-full pt-6 gap-y-6">
                <div className="flex flex-col gap-y-2 px-2">
                  <h1 className="text-2xl md:text-4xl poppins-bold text-foreground text-wrap">
                    {savedChildren.length === 0
                      ? "Register your child"
                      : `Child ${index + 1} information`}
                  </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="First Name"
                    name="firstName"
                    value={child.firstName}
                    onChange={(e) => handleChildChange(index, e)}
                    placeholder="First Name"
                    required
                  />
                  <InputField
                    label="Last Name"
                    name="lastName"
                    value={child.lastName}
                    onChange={(e) => handleChildChange(index, e)}
                    placeholder="Last Name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={child.dateOfBirth}
                    onChange={(e) => handleChildChange(index, e)}
                    placeholder="Date of Birth"
                    required
                  />
                  <SelectField
                    label="Gender"
                    name="gender"
                    value={child.gender}
                    onChange={(e) => handleChildChange(index, e)}
                    options={GENDER_OPTIONS}
                    required
                  />
                </div>

                <OptionalSection
                  label="Additional details (optional)"
                  open={optionalOpen}
                  onToggle={() => toggleChildOptional(index)}
                >
                  <InputField
                    label="Child Email"
                    name="email"
                    type="email"
                    value={child.email}
                    onChange={(e) => handleChildChange(index, e)}
                    placeholder="child@example.com"
                    hint="Optional: used for progress updates"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="School Name"
                      name="schoolName"
                      value={child.schoolName}
                      onChange={(e) => handleChildChange(index, e)}
                      placeholder="School Name"
                    />
                    <InputField
                      label="Country / Region"
                      name="country"
                      value={child.country}
                      onChange={(e) => handleChildChange(index, e)}
                      placeholder="Country"
                    />
                  </div>

                  <InputField
                    label="House Address"
                    name="streetAddress"
                    value={child.streetAddress}
                    onChange={(e) => handleChildChange(index, e)}
                    placeholder="House number and street name"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="City"
                      name="city"
                      value={child.city}
                      onChange={(e) => handleChildChange(index, e)}
                      placeholder="City"
                    />
                    <InputField
                      label="Phone"
                      name="phone"
                      value={child.phone}
                      onChange={(e) => handleChildChange(index, e)}
                      placeholder="Phone"
                    />
                  </div>

                  <InputField
                    label="Postal Code"
                    name="postalCode"
                    value={child.postalCode}
                    onChange={(e) => handleChildChange(index, e)}
                    placeholder="Postal Code"
                  />
                </OptionalSection>

                <div className="flex flex-wrap gap-3 mt-2">
                  {!child.saved && (
                    <Button
                      type="button"
                      onClick={() => saveChildForm(index)}
                      className="h-auto bg-success px-6 py-2 text-center text-sm text-background poppins-bold hover:bg-success/90 lg:px-12 lg:text-base"
                    >
                      Save child
                    </Button>
                  )}
                  {index === childrenForms.length - 1 && (
                    <Button
                      type="button"
                      onClick={addChildForm}
                      className="h-auto bg-foreground px-6 py-2 text-center text-sm text-primary poppins-bold lg:px-12 lg:text-base"
                    >
                      Add another child
                    </Button>
                  )}
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => removeChildForm(index)}
                      variant="destructive"
                      className="h-auto px-4 py-2 text-center text-sm poppins-bold"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Cancel */}
          <div className="flex flex-col md:flex-row justify-between mt-6 gap-y-4 md:gap-y-0 md:gap-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/subscriptions" })}
              className="h-auto w-full bg-card px-6 py-2 text-muted-foreground poppins-bold md:w-auto"
            >
              Cancel
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
          <p className="lg:text-4xl text-2xl poppins-bold text-foreground">
            Review your registration
          </p>
        </div>

        {savedChildren.length > 0 ? (
          savedChildren.map((child, index) => (
            <div
              key={index}
              className="flex flex-col lg:gap-y-5 gap-y-2 poppins-extralight"
            >
              <div className="flex flex-row gap-x-3">
                <AppImage className="lg:h-24 lg:w-24" src={robo} alt="" />
                <div className="lg:text-base text-wrap text-sm flex flex-col gap-1">
	                  <p className="text-wrap">
	                    <span className="font-bold">Subscription plan:</span>{" "}
	                    <span className="font-normal">{plan}</span>
	                  </p>
                  <p className="text-wrap">
                    <span className="font-bold">Name:</span>{" "}
                    <span className="font-normal">
                      {child.firstName} {child.lastName}
                    </span>
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
            <p className="font-poppins font-medium text-[16px] leading-[20px] tracking-[0] text-muted-foreground">
              No children registered yet
            </p>
          </div>
        )}

        <Separator />

        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between">
            <p className="text-muted-foreground font-lato text-base">
              Number of Children
            </p>
            <p className="font-lato text-[20px]">{savedChildren.length}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground font-lato text-base">
              Price per Child
            </p>
            <p className="font-lato text-[20px]">
              PKR {price?.toLocaleString() || "0"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground font-lato text-base">Total Price</p>
            <p className="font-lato text-[20px] font-extrabold">
              PKR {totalPrice?.toLocaleString() || "0"}
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
            {saveParentMutation.isPending ? "Processing..." : "Continue to register"}
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
