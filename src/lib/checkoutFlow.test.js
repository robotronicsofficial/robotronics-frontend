import { describe, expect, it } from "vitest";

import {
  buildCheckoutSearch,
  getNextStep,
  getPrevStep,
  getStepFromSearch,
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
});
