export const SUBSCRIPTION_BILLING_CYCLES = Object.freeze({
  monthly: "monthly",
  annual: "annual",
});

export const isAnnualBillingCycle = (cycle) => (
  cycle === SUBSCRIPTION_BILLING_CYCLES.annual
);

export const getSubscriptionPlanPrice = (plan, cycle) => (
  Number(isAnnualBillingCycle(cycle) ? plan?.yearlyPrice : plan?.monthlyPrice) || 0
);

export const getSubscriptionPlanPricing = (plan) => ({
  monthly: Number(plan?.monthlyPrice || 0),
  annual: Number(plan?.yearlyPrice || 0),
});

export const buildCheckoutPlanSelection = (plan, cycle) => ({
  planId: plan?._id || "",
  name: plan?.planName || "",
  price: getSubscriptionPlanPrice(plan, cycle),
  billingCycle: isAnnualBillingCycle(cycle)
    ? SUBSCRIPTION_BILLING_CYCLES.annual
    : SUBSCRIPTION_BILLING_CYCLES.monthly,
  courseAccess: plan?.courseAccess,
  maxQuizAttemptsPerDay: plan?.maxQuizAttemptsPerDay,
});
