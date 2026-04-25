import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { usePlans } from "../../hooks/usePlans";
import { useSelectedPlanStore } from "../../stores/selectedPlanStore";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

const PlanCardSkeleton = () => (
  <div className="flex flex-col gap-4 rounded-2xl border border-border bg-muted p-6">
    <Skeleton className="h-6 w-2/3" />
    <Skeleton className="h-10 w-1/2" />
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <Skeleton className="h-4 w-5/6" />
    </div>
    <Skeleton className="h-10 w-full rounded-lg" />
  </div>
);

const SubscriptionPlans = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();
  const setSelectedPlan = useSelectedPlanStore((state) => state.setSelectedPlan);

  const {
    data: totalPlans = [],
    isLoading: loading,
    error,
  } = usePlans();

  const handleRegisterClick = (plan) => {
    const price = isAnnual ? plan.yearlyPrice : plan.monthlyPrice;
    const billingCycle = isAnnual ? "annual" : "monthly";

    setSelectedPlan({
      planId: plan._id,
      plan: plan.planName,
      price,
      billingCycle,
    });

    navigate({ to: "/subscriptions/register" });
  };

  if (error) {
    return (
      <div className="flex flex-col items-center bg-background py-10 px-4 sm:px-8 md:px-16 lg:px-24">
        <p className="text-destructive poppins-light">
          Error loading subscription plans: {error.message}
        </p>
      </div>
    );
  }

  const hasPlans = totalPlans.length > 0;

  return (
    <div className="flex flex-col items-center bg-background py-10 px-4 sm:px-8 md:px-16 lg:px-24">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center poppins-bold">
        Learning Subscription Plans
      </h2>

      <div className="mt-6 flex items-center justify-center gap-4 poppins-light">
        <span>Monthly</span>
        <Switch
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
          aria-label="Toggle billing cycle"
        />
        <span>Annual</span>
      </div>

      <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading || !hasPlans
          ? Array.from({ length: 3 }).map((_, index) => (
              <PlanCardSkeleton key={index} />
            ))
          : totalPlans.map((plan) => {
              const displayPrice = isAnnual ? plan.yearlyPrice : plan.monthlyPrice;
              const annualSavings =
                Number(plan.monthlyPrice || 0) * 12 - Number(plan.yearlyPrice || 0);

              return (
                <div
                  key={plan._id}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-muted p-6"
                >
	                  <h3 className="text-xl font-bold text-center poppins-bold">
	                    {plan.planName || "Learning Subscription"}
	                  </h3>

                  <div className="flex flex-col items-center gap-1">
                    <p className="text-2xl font-bold text-center">
                      PKR {Number(displayPrice || 0).toLocaleString()}
                      <span className="text-base font-normal text-muted-foreground">
                        /child
                      </span>
                    </p>
                    {isAnnual && annualSavings > 0 ? (
                      <p className="text-center text-success font-semibold poppins-bold text-sm">
                        Save PKR {annualSavings.toLocaleString()} annually
                      </p>
                    ) : null}
                  </div>

                  {plan.description ? (
                    <p className="text-center text-foreground poppins-light text-sm">
                      {plan.description}
                    </p>
                  ) : null}

                  <ul className="flex flex-1 flex-col gap-y-2 text-sm">
                    {(plan.features || []).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 poppins-light"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

	                  <Button
	                    type="button"
	                    className="h-auto w-full rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:bg-accent hover:text-background"
	                    onClick={() => handleRegisterClick(plan)}
	                  >
	                    Choose subscription
	                  </Button>
                </div>
              );
            })}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground poppins-light">
        Cancel anytime. All subscription plans include child profiles and course access.
      </p>
    </div>
  );
};

export default SubscriptionPlans;
