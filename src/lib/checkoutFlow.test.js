import { describe, expect, it } from "vitest";

import {
  buildCheckoutSearch,
  CHECKOUT_STATUS,
  getNextStep,
  getPrevStep,
  getStepFromSearch,
  resolveCheckoutStep,
} from "./checkoutFlow";

describe("checkout flow contract", () => {
  it("normalizes invalid deep-link steps back to plan", () => {
    expect(getStepFromSearch({ step: "payment" })).toBe("payment");
    expect(getStepFromSearch({ step: "unknown" })).toBe("plan");
    expect(buildCheckoutSearch("unknown")).toEqual({ step: "plan" });
  });

  it("clamps next and previous steps at the checkout edges", () => {
    expect(getPrevStep("plan")).toBe("plan");
    expect(getNextStep("plan")).toBe("kids");
    expect(getPrevStep("payment")).toBe("parent");
    expect(getNextStep("welcome")).toBe("welcome");
  });

  it("keeps deep links behind completed prerequisites", () => {
    expect(resolveCheckoutStep({ requestedStep: "payment" })).toEqual({
      step: "plan",
      shouldReset: false,
    });

    expect(resolveCheckoutStep({
      requestedStep: "confirm",
      hasPlan: true,
      childrenComplete: true,
      parentComplete: true,
      hasPersistedChildren: true,
      paymentComplete: false,
    })).toEqual({
      step: "payment",
      shouldReset: false,
    });
  });

  it("starts a new draft when a finished checkout leaves welcome", () => {
    expect(resolveCheckoutStep({
      requestedStep: "payment",
      status: CHECKOUT_STATUS.submitted,
    })).toEqual({
      step: "plan",
      shouldReset: true,
    });

    expect(resolveCheckoutStep({
      requestedStep: "welcome",
      status: CHECKOUT_STATUS.submitted,
    })).toEqual({
      step: "welcome",
      shouldReset: false,
    });
  });
});
