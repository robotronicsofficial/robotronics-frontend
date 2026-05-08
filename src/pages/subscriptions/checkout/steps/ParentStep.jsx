import { useEffect, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { toast } from "sonner";

import {
  CHECKOUT_PATH,
  buildCheckoutSearch,
} from "@/components/checkout/checkoutNav";
import CheckoutShell from "@/components/checkout/CheckoutShell";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { FormInput, FormSelect } from "@/components/forms/FormControls";
import { useAuth } from "@/contexts/useAuth";
import { useCurrentParent, useSaveParentMutation } from "@/hooks/useAccount";
import {
  useCheckoutStore,
  selectIsParentComplete,
} from "@/stores/checkoutStore";

/* International-friendly: country picker is a free-text typeahead with
   common defaults; province uses an editable input so parents outside
   Pakistan aren't blocked by a hard-coded dropdown. */
const COMMON_COUNTRIES = [
  { value: "Pakistan", label: "Pakistan" },
  { value: "United States", label: "United States" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Canada", label: "Canada" },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "Australia", label: "Australia" },
  { value: "Other", label: "Other / not listed" },
];

const ParentStep = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthLoading } = useAuth();
  const { data: loadedParent } = useCurrentParent(currentUser?._id);
  const plan = useCheckoutStore((state) => state.plan);
  const children = useCheckoutStore((state) => state.children);
  const parent = useCheckoutStore((state) => state.parent);
  const setParent = useCheckoutStore((state) => state.setParent);
  const setPersistedChildren = useCheckoutStore(
    (state) => state.setPersistedChildren,
  );
  const isComplete = useCheckoutStore(selectIsParentComplete);
  const saveParentMutation = useSaveParentMutation();

  /* Pre-fill billing address from a previously-saved parent record so a
     returning customer doesn't have to retype everything. */
  useEffect(() => {
    if (!loadedParent) return;
    setParent({
      streetAddress: parent.streetAddress || loadedParent.streetAddress || "",
      aptSuite: parent.aptSuite || loadedParent.aptSuite || "",
      city: parent.city || loadedParent.city || "",
      state: parent.state || loadedParent.state || "",
      postalCode: parent.postalCode || loadedParent.postalCode || "",
      country: parent.country || loadedParent.country || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedParent]);

  const accountSummary = useMemo(
    () => ({
      name: [currentUser?.firstName, currentUser?.lastName]
        .filter(Boolean)
        .join(" "),
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
    }),
    [currentUser],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isComplete) {
      toast.error("Please fill in your billing address.");
      return;
    }
    if (!plan?.planId) {
      toast.error("Please pick a plan first.");
      navigate({ to: CHECKOUT_PATH, search: buildCheckoutSearch("plan") });
      return;
    }

    try {
      const result = await saveParentMutation.mutateAsync({
        parent: {
          ...parent,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          phone: currentUser.phone,
          userId: currentUser._id,
        },
        children: children.map((child) => ({
          checkoutChildKey: child.checkoutChildKey,
          firstName: child.firstName,
          lastName: child.lastName,
          dateOfBirth: child.dateOfBirth,
          gender: child.gender,
          email: child.email,
          phone: child.phone,
          schoolName: child.schoolName,
          country: child.country,
          streetAddress: child.streetAddress,
          city: child.city,
          postalCode: child.postalCode,
        })),
        plan: { planId: plan.planId, billingCycle: plan.billingCycle },
      });

      const persistedChildren = result?.parent?.children || result?.children || [];
      setPersistedChildren(persistedChildren);

      navigate({ to: CHECKOUT_PATH, search: buildCheckoutSearch("payment") });
    } catch (error) {
      const message = error?.message?.includes("Network")
        ? "Network error — check your connection and try again."
        : error?.message || "Couldn't save your billing details.";
      toast.error(message);
    }
  };

  if (isAuthLoading || !currentUser) {
    return (
      <CheckoutShell step="parent" title="Loading your account…">
        <Text tone="muted" className="py-12 text-center">
          Just a moment.
        </Text>
      </CheckoutShell>
    );
  }

  return (
    <CheckoutShell
      step="parent"
      title="Where should we send the receipt?"
      subtitle="Your billing address. We never share or use it for marketing."
    >
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
      >
        <div className="flex flex-col gap-5">
          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start gap-3 rounded-2xl bg-muted p-4">
                <Lock className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <div className="flex flex-col">
                  <Text size="sm" weight="semibold">
                    Signed in as {accountSummary.name || "your account"}
                  </Text>
                  <Text size="xs" tone="muted">
                    {accountSummary.email}
                    {accountSummary.phone ? ` · ${accountSummary.phone}` : ""}
                  </Text>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <Eyebrow>Billing address</Eyebrow>
                <Heading level={3} className="text-h5">
                  Where to send your receipt
                </Heading>
              </div>

              <FormInput
                id="parent-streetAddress"
                name="streetAddress"
                label="Street address"
                value={parent.streetAddress}
                onChange={(e) => setParent({ streetAddress: e.target.value })}
                autoComplete="address-line1"
                required
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                  id="parent-aptSuite"
                  name="aptSuite"
                  label="Apt, suite, unit (optional)"
                  value={parent.aptSuite}
                  onChange={(e) => setParent({ aptSuite: e.target.value })}
                  autoComplete="address-line2"
                />
                <FormInput
                  id="parent-city"
                  name="city"
                  label="City"
                  value={parent.city}
                  onChange={(e) => setParent({ city: e.target.value })}
                  autoComplete="address-level2"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                  id="parent-state"
                  name="state"
                  label="State / province"
                  value={parent.state}
                  onChange={(e) => setParent({ state: e.target.value })}
                  autoComplete="address-level1"
                  required
                />
                <FormInput
                  id="parent-postalCode"
                  name="postalCode"
                  label="Postal code"
                  value={parent.postalCode}
                  onChange={(e) => setParent({ postalCode: e.target.value })}
                  autoComplete="postal-code"
                  required
                />
              </div>

              <FormSelect
                id="parent-country"
                name="country"
                label="Country"
                value={parent.country}
                onChange={(e) => setParent({ country: e.target.value })}
                options={COMMON_COUNTRIES}
                placeholder="Select country"
                required
              />
            </CardContent>
          </Card>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate({ to: CHECKOUT_PATH, search: buildCheckoutSearch("kids") })
              }
              disabled={saveParentMutation.isPending}
            >
              Back to kids
            </Button>
            <Button
              type="submit"
              size="marketing"
              disabled={!isComplete || saveParentMutation.isPending}
            >
              {saveParentMutation.isPending ? "Saving…" : "Continue to payment"}
            </Button>
          </div>
        </div>

        <CheckoutSummary plan={plan} learners={children} />
      </form>
    </CheckoutShell>
  );
};

export default ParentStep;
