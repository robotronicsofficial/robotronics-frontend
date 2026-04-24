import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlans } from "../../hooks/usePlans";
import { useSelectedPlanStore } from "../../stores/selectedPlanStore";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const SubscriptionPlans = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();
  const setSelectedPlan = useSelectedPlanStore((state) => state.setSelectedPlan);

  const {
    data: totalPlans = [],
    isLoading: loading,
    error,
  } = usePlans();
  const membership = totalPlans[0] || null;

  const handleRegisterClick = (plan) => {
    const price = isAnnual ? plan.yearlyPrice : plan.monthlyPrice;
    const billingCycle = isAnnual ? "annual" : "monthly";
    
    setSelectedPlan({
      planId: plan._id,
      plan: plan.planName,
      price,
      billingCycle,
    });
    
    navigate("/subscriptions/register");
  };
  
  if (loading) return <div>Loading membership...</div>;
  if (error) return <div>Error loading membership: {error.message}</div>;
  if (!membership) return <div>Membership is not available right now.</div>;

  const displayPrice = isAnnual ? membership.yearlyPrice : membership.monthlyPrice;
  const annualSavings = Number(membership.monthlyPrice || 0) * 12 - Number(membership.yearlyPrice || 0);

  return (
    <div className="bg-background py-8 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 text-center poppins-bold">
          Course Membership
        </h2>

        <div className="flex justify-center bg-muted py-10 px-4 w-full mt-6">
          <div className="w-full max-w-xl min-h-[560px] bg-muted rounded-2xl p-6 flex flex-col shadow-lg items-center">
            <h3 className="text-2xl font-bold mb-4 text-center">
              {membership.planName || "Course Membership"}
            </h3>

            <div className="flex items-center justify-center gap-4 mb-4 poppins-light">
              <span>Monthly</span>

              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                aria-label="Toggle billing cycle"
              />

              <span>Annual</span>
            </div>

            <h4 className="text-2xl font-bold mb-4 text-center">
              PKR {Number(displayPrice || 0).toLocaleString()}/Child
            </h4>

            <p className="text-center mb-4 text-wrap text-foreground poppins-light">
              {membership.description}
            </p>
            {isAnnual && annualSavings > 0 ? (
              <p className="text-center mb-4 text-wrap text-success font-semibold poppins-bold">
                Save PKR {annualSavings.toLocaleString()} with annual billing.
              </p>
            ) : null}

            <Button
              type="button"
              className="mb-4 h-auto w-fit rounded-lg bg-warning px-6 py-2 text-background"
              onClick={() => handleRegisterClick(membership)}
            >
              Start Membership
            </Button>

            <ul className="flex flex-col flex-1 gap-y-2 text-sm mb-4">
              {(membership.features || []).map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 poppins-light"
                >
                  <span className="font-bold text-warning">+</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
