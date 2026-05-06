import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

import AppImage from "@/components/site/AppImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { FormInput, FormSelect } from "@/components/forms/FormControls";
import { cn } from "@/lib/utils";
import { useAuth } from "../../../contexts/useAuth";
import { useCurrentParent, useSaveParentMutation } from "../../../hooks/useAccount";
import { useSelectedPlanStore } from "../../../stores/selectedPlanStore";
import { normalizeParentRecord } from "../../../lib/subscription";
import {
  buildSubscriptionCheckout,
  saveSubscriptionCheckout,
} from "../../../lib/subscriptionCheckout";
import { formatPKR } from "@/utils/formatPrice";
import robo from "../../../assets/child.webp";

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
  const next = { ...child };
  delete next.saved;
  return next;
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
    {hint && (
      <Text size="xs" tone="muted">{hint}</Text>
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
    }),
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
      <Text size="sm" weight="semibold">{label}</Text>
      {open ? (
        <ChevronUp className="size-4 text-muted-foreground" aria-hidden="true" />
      ) : (
        <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
      )}
    </button>
    {open && <div className="flex flex-col gap-4">{children}</div>}
  </div>
);

OptionalSection.propTypes = {
  label: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const SummaryRow = ({ label, value, highlight = false }) => (
  <div className="flex items-start justify-between gap-4">
    <Text size="sm" tone="muted">{label}</Text>
    <Text size="sm" weight={highlight ? "semibold" : "regular"} className="text-right">
      {value}
    </Text>
  </div>
);

SummaryRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  highlight: PropTypes.bool,
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
            })),
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
              child.lastName !== removedChild.lastName,
          ),
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
          c.email === child.email,
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
        `Please save ${unsavedChildren.length} unsaved child form(s) before continuing`,
      );
      return;
    }

    const requiredParentFields = ["firstName", "lastName", "email", "phone", "country"];
    const missingParentFields = requiredParentFields.filter(
      (field) => !parentForm[field],
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
        },
      );
      const persistedChildren = persistedParent.children;
      const checkout = buildSubscriptionCheckout({
        parent: persistedParent,
        children: persistedChildren,
        plan: { planId, name: plan, price, billingCycle },
      });

      saveSubscriptionCheckout(checkout);
      onSaveChildren?.(persistedChildren);

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
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-6">
        {draftBannerVisible && (
          <Card>
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Text size="sm">
                We saved your progress. Continue where you left off?
              </Text>
              <div className="flex flex-wrap gap-2">
                <Button type="button" size="sm" onClick={handleRestoreDraft}>
                  Restore
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleDiscardDraft}
                >
                  Start over
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <section className="flex flex-col gap-4">
                <Heading level={3} className="text-h4">Parent details</Heading>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InputField
                    label="Parent first name"
                    name="firstName"
                    value={parentForm.firstName}
                    onChange={handleParentChange}
                    placeholder="Parent first name"
                    required
                  />
                  <InputField
                    label="Parent last name"
                    name="lastName"
                    value={parentForm.lastName}
                    onChange={handleParentChange}
                    placeholder="Parent last name"
                    required
                  />
                </div>

                <InputField
                  label="Parent email"
                  name="email"
                  type="email"
                  value={parentForm.email}
                  onChange={handleParentChange}
                  placeholder="parent@example.com"
                  required
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InputField
                    label="Phone"
                    name="phone"
                    value={parentForm.phone}
                    onChange={handleParentChange}
                    placeholder="Phone"
                    required
                  />
                  <InputField
                    label="Country / region"
                    name="country"
                    value={parentForm.country}
                    onChange={handleParentChange}
                    placeholder="Country"
                    required
                  />
                </div>

                <OptionalSection
                  label="Billing address (optional — collected at payment if needed)"
                  open={parentOptionalOpen}
                  onToggle={() => setParentOptionalOpen((value) => !value)}
                >
                  <InputField
                    label="Residential address"
                    name="streetAddress"
                    value={parentForm.streetAddress}
                    onChange={handleParentChange}
                    placeholder="House number and street name"
                  />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputField
                      label="Apt / suite"
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
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <SelectField
                      label="State"
                      name="state"
                      value={parentForm.state}
                      onChange={handleParentChange}
                      options={STATES}
                    />
                    <InputField
                      label="Postal code"
                      name="postalCode"
                      value={parentForm.postalCode}
                      onChange={handleParentChange}
                      placeholder="Postal code"
                    />
                  </div>
                </OptionalSection>
              </section>

              {childrenForms.map((child, index) => {
                const optionalOpen = Boolean(childOptionalOpen[index]);
                return (
                  <section key={index} className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-3 border-t border-border pt-6">
                      <Heading level={3} className="text-h4">
                        {savedChildren.length === 0
                          ? "Register your child"
                          : `Child ${index + 1}`}
                      </Heading>
                      {child.saved && (
                        <Text size="xs" tone="brand" className="font-semibold uppercase tracking-wide">
                          Saved
                        </Text>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <InputField
                        label="First name"
                        name="firstName"
                        value={child.firstName}
                        onChange={(e) => handleChildChange(index, e)}
                        placeholder="First name"
                        required
                      />
                      <InputField
                        label="Last name"
                        name="lastName"
                        value={child.lastName}
                        onChange={(e) => handleChildChange(index, e)}
                        placeholder="Last name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <InputField
                        label="Date of birth"
                        name="dateOfBirth"
                        type="date"
                        value={child.dateOfBirth}
                        onChange={(e) => handleChildChange(index, e)}
                        placeholder="Date of birth"
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
                        label="Child email"
                        name="email"
                        type="email"
                        value={child.email}
                        onChange={(e) => handleChildChange(index, e)}
                        placeholder="child@example.com"
                        hint="Optional: used for progress updates"
                      />
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <InputField
                          label="School name"
                          name="schoolName"
                          value={child.schoolName}
                          onChange={(e) => handleChildChange(index, e)}
                          placeholder="School name"
                        />
                        <InputField
                          label="Country / region"
                          name="country"
                          value={child.country}
                          onChange={(e) => handleChildChange(index, e)}
                          placeholder="Country"
                        />
                      </div>
                      <InputField
                        label="House address"
                        name="streetAddress"
                        value={child.streetAddress}
                        onChange={(e) => handleChildChange(index, e)}
                        placeholder="House number and street name"
                      />
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                        label="Postal code"
                        name="postalCode"
                        value={child.postalCode}
                        onChange={(e) => handleChildChange(index, e)}
                        placeholder="Postal code"
                      />
                    </OptionalSection>

                    <div className="flex flex-wrap gap-3">
                      {!child.saved && (
                        <Button type="button" onClick={() => saveChildForm(index)}>
                          Save child
                        </Button>
                      )}
                      {index === childrenForms.length - 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addChildForm}
                        >
                          Add another child
                        </Button>
                      )}
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => removeChildForm(index)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                          Remove
                        </Button>
                      )}
                    </div>
                  </section>
                );
              })}

              <div className="flex border-t border-border pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate({ to: "/subscriptions" })}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="lg:sticky lg:top-24 lg:self-start">
        <CardContent className="flex flex-col gap-6">
          <Heading level={3} className="text-h4">Review your registration</Heading>

          <div className="flex flex-col gap-4">
            {savedChildren.length > 0 ? (
              savedChildren.map((child, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl border border-border bg-card p-3",
                  )}
                >
                  <AppImage className="size-16 rounded-2xl bg-muted p-2" src={robo} alt="" />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <Text weight="semibold">
                      {child.firstName} {child.lastName}
                    </Text>
                    <Text size="xs" tone="muted">
                      {plan} · {billingCycle}
                    </Text>
                  </div>
                  <Text size="sm" weight="semibold">
                    {formatPKR(price)}
                  </Text>
                </div>
              ))
            ) : (
              <Text size="sm" tone="muted">
                No children registered yet.
              </Text>
            )}
          </div>

          <div className="flex flex-col gap-2 border-t border-border pt-4">
            <SummaryRow
              label="Number of children"
              value={savedChildren.length}
            />
            <SummaryRow
              label="Price per child"
              value={formatPKR(price || 0)}
            />
            <div className="border-t border-border pt-2">
              <SummaryRow
                label="Total"
                value={formatPKR(totalPrice || 0)}
                highlight
              />
            </div>
            <Text size="xs" tone="muted">
              Each child is billed separately on the same parent account.
            </Text>
          </div>

          <Button
            type="button"
            size="marketing"
            onClick={handleSubmit}
            disabled={saveParentMutation.isPending}
            className="w-full"
          >
            {saveParentMutation.isPending ? "Processing…" : "Continue to register"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

SubscriptionCustomerInformation.propTypes = {
  onNext: PropTypes.func,
  onSaveChildren: PropTypes.func,
};

export default SubscriptionCustomerInformation;
