import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { BillingToggle } from "@/components/ui/billing-toggle";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { Display, Highlight, Text } from "@/components/ui/typography";
import { AnnualOfferCountdown } from "@/components/marketing/AnnualOfferCountdown";
import MarketingHero from "@/components/marketing/MarketingHero";
import { PlanCard } from "@/components/marketing/PlanCard";
import { CHECKOUT_PATH, buildCheckoutSearch } from "@/lib/checkoutFlow";
import {
  buildCheckoutPlanSelection,
  getSubscriptionPlanPricing,
} from "@/lib/subscriptionPlans";
import { usePlans } from "../../hooks/usePlans";
import { useCheckoutStore } from "../../stores/checkoutStore";

/* Mirrors PlanCard's gradient-header / white-body shape so the loading state
   doesn't shift layout once data arrives. */
const PlanCardSkeleton = () => (
  <article className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-md">
    <div
      className="flex flex-col gap-3 px-7 pb-7 pt-6"
      style={{
        backgroundImage:
          "radial-gradient(circle at 80% 0%, var(--color-brand-50), transparent 55%), linear-gradient(135deg, var(--color-brand-100), var(--color-brand-300))",
      }}
    >
      <Skeleton className="h-3 w-16 bg-foreground/10" />
      <Skeleton className="h-10 w-32 bg-foreground/10" />
      <Skeleton className="h-3 w-24 bg-foreground/10" />
    </div>
    <div className="flex flex-1 flex-col gap-6 px-7 pb-7 pt-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <span aria-hidden="true" className="block h-px w-full bg-border" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="mt-auto h-12 w-full rounded-full" />
    </div>
  </article>
);

const SubscriptionPlans = () => {
  const [cycle, setCycle] = useState("annual");
  const navigate = useNavigate();
  const setPlan = useCheckoutStore((state) => state.setPlan);

  const { data: plans = [], isLoading, error } = usePlans();

  const handleSelect = (plan) => {
    setPlan(buildCheckoutPlanSelection(plan, cycle));
    navigate({ to: CHECKOUT_PATH, search: buildCheckoutSearch("kids") });
  };

  return (
    <>
      <MarketingHero
        size="page"
        eyebrow="Pricing"
        title={
          <Display size="md">
            Choose the plan that <Highlight>fits your child</Highlight>.
          </Display>
        }
        subtitle="One subscription unlocks every future skill. Cancel anytime — no calls, no forms."
        className="pt-20 md:pt-28"
      >
        <BillingToggle
          value={cycle}
          onChange={setCycle}
          savingsLabel="Save up to 60%"
          className="mt-4 self-center"
        />
        {cycle === "annual" && <AnnualOfferCountdown />}
      </MarketingHero>

      <section className="relative isolate overflow-hidden bg-background pb-20 md:pb-28">
        <Container size="wide">
          {error ? (
            <div className="mx-auto max-w-md rounded-xl border border-destructive bg-destructive/10 p-6 text-center">
              <Text tone="muted">
                We couldn&apos;t load plans right now. Please refresh, or contact support if the issue persists.
              </Text>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {isLoading || plans.length === 0
                ? Array.from({ length: 3 }).map((_, i) => <PlanCardSkeleton key={i} />)
                : plans.map((plan, i) => {
                    const isHighlighted = i === 0;
                    return (
                      <PlanCard
                        key={plan._id}
                        name={plan.planName || "Learning Subscription"}
                        description={plan.description}
                        pricing={getSubscriptionPlanPricing(plan)}
                        features={plan.features || []}
                        cta={{
                          label: "Choose plan",
                          onClick: () => handleSelect(plan),
                        }}
                        tone={isHighlighted ? "tinted" : "default"}
                        popular={isHighlighted && plans.length > 1}
                        cycle={cycle}
                      />
                    );
                  })}
            </div>
          )}

          <Text tone="muted" size="sm" className="mt-10 text-center">
            Cancel anytime. Each child has their own subscription — add multiple kids at the same per-child rate.
          </Text>
        </Container>
      </section>
    </>
  );
};

export default SubscriptionPlans;
