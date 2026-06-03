import { useNavigate, useSearch } from "@tanstack/react-router";
import { ChevronRight, Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";

import {
  CHECKOUT_PATH,
  buildCheckoutSearch,
} from "@/lib/checkoutFlow";
import CheckoutShell from "@/components/checkout/CheckoutShell";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import InlineAuthPanel from "@/components/checkout/InlineAuthPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { FormInput, FormSelect } from "@/components/forms/FormControls";
import { useAuth } from "@/contexts/useAuth";
import {
  useCheckoutStore,
  selectIsChildrenComplete,
} from "@/stores/checkoutStore";

const GENDER_OPTIONS = [
  { value: "male", label: "Boy" },
  { value: "female", label: "Girl" },
  { value: "other", label: "Prefer not to say" },
];

/* Calendar boundary helpers — kids 5–17 are the realistic learner range. */
const ageBoundary = (years) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return date.toISOString().slice(0, 10);
};

const ChildRow = ({ index, child, onChange, onRemove, isOnly }) => (
  <Card>
    <CardContent className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <Eyebrow>Learner {index + 1}</Eyebrow>
          <Heading level={3} className="text-h5">
            Tell us about your child
          </Heading>
        </div>
        {!isOnly && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-muted-foreground hover:text-destructive"
            aria-label={`Remove learner ${index + 1}`}
          >
            <Trash2 className="size-4" />
            Remove
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormInput
          id={`child-${index}-firstName`}
          name="firstName"
          label="First name"
          value={child.firstName}
          onChange={(e) => onChange({ firstName: e.target.value })}
          autoComplete="given-name"
          required
        />
        <FormInput
          id={`child-${index}-lastName`}
          name="lastName"
          label="Last name"
          value={child.lastName}
          onChange={(e) => onChange({ lastName: e.target.value })}
          autoComplete="family-name"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormInput
          id={`child-${index}-dob`}
          name="dateOfBirth"
          label="Date of birth"
          type="date"
          value={child.dateOfBirth}
          onChange={(e) => onChange({ dateOfBirth: e.target.value })}
          min={ageBoundary(18)}
          max={ageBoundary(4)}
          required
        />
        <FormSelect
          id={`child-${index}-gender`}
          name="gender"
          label="Gender"
          value={child.gender}
          onChange={(e) => onChange({ gender: e.target.value })}
          options={GENDER_OPTIONS}
          required
        />
      </div>
    </CardContent>
  </Card>
);

const KidsStep = () => {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const { currentUser, isAuthLoading } = useAuth();
  const children = useCheckoutStore((state) => state.children);
  const plan = useCheckoutStore((state) => state.plan);
  const updateChild = useCheckoutStore((state) => state.updateChild);
  const addChild = useCheckoutStore((state) => state.addChild);
  const removeChild = useCheckoutStore((state) => state.removeChild);
  const isComplete = useCheckoutStore(selectIsChildrenComplete);

  const handleContinue = (event) => {
    event.preventDefault();
    if (!isComplete) {
      toast.error("Please fill in each child's name, date of birth, and gender.");
      return;
    }
    navigate({ to: CHECKOUT_PATH, search: buildCheckoutSearch("parent") });
  };

  if (isAuthLoading) {
    return (
      <CheckoutShell step="kids" title="Setting up your account…">
        <Text tone="muted" className="text-center py-12">
          Just a moment.
        </Text>
      </CheckoutShell>
    );
  }

  if (!currentUser) {
    /* If the user just clicked the verification link in their email, the
       URL carries `?verified=1` — flip the inline panel to login mode so
       they're not staring at a blank signup form they already completed. */
    const defaultMode = search?.verified ? "login" : "signup";
    return (
      <CheckoutShell
        step="kids"
        title="One quick step before we add your kids"
        subtitle="Create a parent account so we can save their progress and send your receipt."
      >
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <InlineAuthPanel
            redirectPath={`${CHECKOUT_PATH}?step=kids`}
            defaultMode={defaultMode}
            title={defaultMode === "login" ? "Sign in to continue" : "Create your parent account"}
            subtitle={
              defaultMode === "login"
                ? "Email verified. Sign in and we'll pick up exactly where you left off."
                : "It only takes a moment. Your kids' learning is one signup away."
            }
          />
          <CheckoutSummary plan={plan} learners={children} />
        </div>
      </CheckoutShell>
    );
  }

  return (
    <CheckoutShell
      step="kids"
      title="Who's learning?"
      subtitle="Add a row for each child. You can register up to 4 kids — each gets their own login PIN later."
    >
      <form onSubmit={handleContinue} className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-5">
          {children.map((child, index) => (
            <ChildRow
              key={index}
              index={index}
              child={child}
              isOnly={children.length === 1}
              onChange={(patch) => updateChild(index, patch)}
              onRemove={() => removeChild(index)}
            />
          ))}

          {children.length < 4 && (
            <Button
              type="button"
              variant="outline"
              size="marketing"
              onClick={addChild}
              className="self-start"
            >
              <UserPlus className="size-4" />
              Add another child
            </Button>
          )}

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate({ to: CHECKOUT_PATH, search: buildCheckoutSearch("plan") })
              }
            >
              Back to plans
            </Button>
            <Button type="submit" size="marketing" disabled={!isComplete}>
              Continue to billing
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        <CheckoutSummary plan={plan} learners={children} />
      </form>
    </CheckoutShell>
  );
};

export default KidsStep;
