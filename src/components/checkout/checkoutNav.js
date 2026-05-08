import { CHECKOUT_STEPS } from "@/stores/checkoutStore";

export const CHECKOUT_PATH = "/subscriptions/checkout";

export const buildCheckoutSearch = (step) => ({
  step: CHECKOUT_STEPS.includes(step) ? step : "plan",
});

export const getStepFromSearch = (search) => {
  const candidate = search?.step;
  return CHECKOUT_STEPS.includes(candidate) ? candidate : "plan";
};

export const getNextStep = (current) => {
  const index = CHECKOUT_STEPS.indexOf(current);
  return CHECKOUT_STEPS[Math.min(index + 1, CHECKOUT_STEPS.length - 1)];
};

export const getPrevStep = (current) => {
  const index = CHECKOUT_STEPS.indexOf(current);
  return CHECKOUT_STEPS[Math.max(index - 1, 0)];
};
