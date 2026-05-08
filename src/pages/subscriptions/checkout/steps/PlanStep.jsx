import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronsRight } from "lucide-react";

import {
  CHECKOUT_PATH,
  buildCheckoutSearch,
} from "@/components/checkout/checkoutNav";
import CheckoutShell from "@/components/checkout/CheckoutShell";
import { BillingToggle } from "@/components/ui/billing-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Highlight } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useFormatMoney } from "@/utils/formatPrice";
import { usePlans } from "@/hooks/usePlans";
import { useCheckoutStore } from "@/stores/checkoutStore";

const PlanCardSkeleton = () => (
  <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
    <Skeleton className="h-3 w-16" />
    <Skeleton className="h-9 w-32" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <Skeleton className="h-4 w-4/6" />
    <Skeleton className="mt-auto h-12 w-full rounded-full" />
  </article>
);

const PlanOption = ({ plan, cycle, isSelected, onSelect }) => {
  const formatMoney = useFormatMoney();
  const price = cycle === "annual" ? plan.yearlyPrice : plan.monthlyPrice;
  const cycleSuffix = cycle === "annual" ? "/year" : "/month";

  return (
    <Card
      className={cn(
        "transition-colors",
        isSelected && "border-primary ring-2 ring-primary",
      )}
    >
      <CardContent className="flex h-full flex-col gap-5">
        <div className="flex flex-col gap-1">
          <Eyebrow tone={isSelected ? "brand" : "muted"}>
            {cycle === "annual" ? "Annual" : "Monthly"}
          </Eyebrow>
          <Heading level={3} className="text-h4">
            {plan.planName}
          </Heading>
          {plan.description && (
            <Text size="sm" tone="muted">
              {plan.description}
            </Text>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-display-md font-bold leading-none text-foreground">
            {formatMoney(price)}
          </span>
          <span className="text-body-sm text-muted-foreground">
            {cycleSuffix}
          </span>
        </div>

        {Array.isArray(plan.features) && plan.features.length > 0 && (
          <ul className="flex flex-col gap-2">
            {plan.features.slice(0, 5).map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-body-sm text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <Button
          type="button"
          size="marketing"
          variant={isSelected ? "default" : "outline"}
          className="mt-auto w-full"
          onClick={onSelect}
        >
          {isSelected ? "Selected" : "Choose plan"}
          <ChevronsRight className="size-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

const PlanStep = () => {
  const navigate = useNavigate();
  const setPlan = useCheckoutStore((state) => state.setPlan);
  const currentPlan = useCheckoutStore((state) => state.plan);
  const [cycle, setCycle] = useState(currentPlan?.billingCycle || "annual");
  const { data: plans = [], isLoading, error } = usePlans();
  const isEmpty = !isLoading && plans.length === 0;

  const handleSelect = (plan) => {
    const price = cycle === "annual" ? plan.yearlyPrice : plan.monthlyPrice;
    setPlan({
      planId: plan._id,
      name: plan.planName,
      price: Number(price || 0),
      billingCycle: cycle,
      courseAccess: plan.courseAccess,
      maxQuizAttemptsPerDay: plan.maxQuizAttemptsPerDay,
    });
    navigate({ to: CHECKOUT_PATH, search: buildCheckoutSearch("kids") });
  };

  return (
    <CheckoutShell
      step="plan"
      title={
        <>
          Pick the plan that <Highlight>fits your child</Highlight>.
        </>
      }
      subtitle="One subscription unlocks every future skill. Cancel anytime — no calls, no forms."
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="flex justify-center">
          <BillingToggle
            value={cycle}
            onChange={setCycle}
            savingsLabel="Save up to 60%"
          />
        </div>

        {error ? (
          <Card>
            <CardContent>
              <Text tone="muted">
                We couldn&apos;t load plans right now. Please refresh the page or
                contact support if the issue persists.
              </Text>
            </CardContent>
          </Card>
        ) : isEmpty ? (
          <Card>
            <CardContent>
              <Text tone="muted">
                No subscription plans are available right now. Please refresh, or contact support
                so we can help you choose the right plan.
              </Text>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <PlanCardSkeleton key={i} />
                ))
              : plans.map((plan) => (
                  <PlanOption
                    key={plan._id}
                    plan={plan}
                    cycle={cycle}
                    isSelected={currentPlan?.planId === plan._id && currentPlan?.billingCycle === cycle}
                    onSelect={() => handleSelect(plan)}
                  />
                ))}
          </div>
        )}

        <Text tone="muted" size="sm" className="text-center">
          Each child has their own subscription — add multiple kids at the same
          per-child rate.
        </Text>
      </div>
    </CheckoutShell>
  );
};

export default PlanStep;
