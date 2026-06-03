export const CHECKOUT_PATH = "/subscriptions/checkout";

export const CHECKOUT_STEPS = Object.freeze([
  "plan",
  "kids",
  "parent",
  "payment",
  "confirm",
  "welcome",
]);

export const CHECKOUT_STATUS = Object.freeze({
  draft: "draft",
  submitted: "submitted",
  active: "active",
});

export const isCheckoutStep = (step) => CHECKOUT_STEPS.includes(step);

export const isFinishedCheckoutStatus = (status) => (
  status === CHECKOUT_STATUS.submitted || status === CHECKOUT_STATUS.active
);

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

export const resolveCheckoutStep = ({
  requestedStep = "plan",
  explicitStep = false,
  status = CHECKOUT_STATUS.draft,
  hasPlan = false,
  childrenComplete = false,
  parentComplete = false,
  paymentComplete = false,
  hasPersistedChildren = false,
} = {}) => {
  const step = isCheckoutStep(requestedStep) ? requestedStep : "plan";
  const isFinished = isFinishedCheckoutStatus(status);

  if (isFinished && step !== "welcome") {
    return { step: "plan", shouldReset: true };
  }

  if (isFinished) {
    return { step: "welcome", shouldReset: false };
  }

  const prerequisiteStep = step === "welcome" ? "confirm" : step;

  if (prerequisiteStep !== "plan" && !hasPlan) {
    return { step: "plan", shouldReset: false };
  }

  if (
    (prerequisiteStep === "parent"
      || prerequisiteStep === "payment"
      || prerequisiteStep === "confirm")
    && !childrenComplete
  ) {
    return { step: "kids", shouldReset: false };
  }

  if (
    (prerequisiteStep === "payment" || prerequisiteStep === "confirm")
    && (!parentComplete || !hasPersistedChildren)
  ) {
    return { step: "parent", shouldReset: false };
  }

  if (prerequisiteStep === "confirm" && !paymentComplete) {
    return { step: "payment", shouldReset: false };
  }

  if (!explicitStep && hasPlan) {
    return { step: "kids", shouldReset: false };
  }

  return { step: prerequisiteStep, shouldReset: false };
};
