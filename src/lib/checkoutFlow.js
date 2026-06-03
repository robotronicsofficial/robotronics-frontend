export const CHECKOUT_PATH = "/subscriptions/checkout";

export const CHECKOUT_STEPS = Object.freeze([
  "plan",
  "kids",
  "parent",
  "payment",
  "confirm",
  "welcome",
]);

export const isCheckoutStep = (step) => CHECKOUT_STEPS.includes(step);

export const buildCheckoutSearch = (step) => ({
  step: isCheckoutStep(step) ? step : "plan",
});

export const getStepFromSearch = (search) => {
  const candidate = search?.step;
  return isCheckoutStep(candidate) ? candidate : "plan";
};

export const getNextStep = (current) => {
  const index = CHECKOUT_STEPS.indexOf(current);
  return CHECKOUT_STEPS[Math.min(index + 1, CHECKOUT_STEPS.length - 1)];
};

export const getPrevStep = (current) => {
  const index = CHECKOUT_STEPS.indexOf(current);
  return CHECKOUT_STEPS[Math.max(index - 1, 0)];
};
