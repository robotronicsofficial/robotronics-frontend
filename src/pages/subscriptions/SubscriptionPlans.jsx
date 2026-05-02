import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { BillingToggle } from "@/components/ui/billing-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { PlanCard } from "@/components/marketing/PlanCard";
import { usePlans } from "../../hooks/usePlans";
import { useSelectedPlanStore } from "../../stores/selectedPlanStore";

const PlanCardSkeleton = () => (
  <Card className="p-6">
    <CardContent className="flex flex-col gap-4 px-0">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-12 w-1/2" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="mt-2 h-12 w-full rounded-full" />
    </CardContent>
  </Card>
);

const SubscriptionPlans = () => {
  const [cycle, setCycle] = useState("annual");
  const navigate = useNavigate();
  const setSelectedPlan = useSelectedPlanStore((state) => state.setSelectedPlan);

  const { data: plans = [], isLoading, error } = usePlans();

  const handleSelect = (plan) => {
    const price = cycle === "annual" ? plan.yearlyPrice : plan.monthlyPrice;
    setSelectedPlan({
      planId: plan._id,
      plan: plan.planName,
      price,
      billingCycle: cycle,
    });
    navigate({ to: "/subscriptions/register" });
  };

  return (
    <section className="bg-background py-20 md:py-28">
      <Container size="wide">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Eyebrow>Pricing</Eyebrow>
          <Heading level={2} className="text-display-md">
            Choose the plan that fits your child.
          </Heading>
          <Text size="lg" tone="muted">
            One subscription unlocks every future skill. Cancel anytime — no calls, no forms.
          </Text>
          <BillingToggle
            value={cycle}
            onChange={setCycle}
            savingsLabel="Save up to 60%"
            className="mt-4"
          />
        </div>

        {error ? (
          <div className="mx-auto mt-12 max-w-md rounded-xl border border-destructive bg-destructive/10 p-6 text-center">
            <Text tone="muted">
              We couldn&apos;t load plans right now. Please refresh, or contact support if the issue persists.
            </Text>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading || plans.length === 0
              ? Array.from({ length: 3 }).map((_, i) => <PlanCardSkeleton key={i} />)
              : plans.map((plan, i) => {
                  const isHighlighted = i === 0;
                  return (
                    <PlanCard
                      key={plan._id}
                      name={plan.planName || "Learning Subscription"}
                      description={plan.description}
                      pricing={{
                        monthly: Number(plan.monthlyPrice || 0),
                        annualMonthly: Number(plan.yearlyPrice || 0),
                      }}
                      features={plan.features || []}
                      cta={{
                        label: "Choose plan",
                        onClick: () => handleSelect(plan),
                      }}
                      tone={isHighlighted ? "tinted" : "default"}
                      popular={isHighlighted &&  plans.length > 1}
                      cycle={cycle}
                    />
                  );
                })}
          </div>
        )}

        <Text tone="muted" size="sm" className="mt-10 text-center">
          Cancel anytime. Every plan includes child profiles and full course access.
        </Text>
      </Container>
    </section>
  );
};

export default SubscriptionPlans;
