import { describe, expect, it } from "vitest";

import {
  buildCheckoutPlanSelection,
  getAnnualSavingsPercent,
  getSubscriptionPlanPrice,
  getSubscriptionPlanPricing,
} from "./subscriptionPlans";

const plan = {
  _id: "plan-1",
  planName: "Course Membership",
  monthlyPrice: 2500,
  yearlyPrice: 12000,
  courseAccess: "all",
  maxQuizAttemptsPerDay: 2,
};

describe("subscription plan contracts", () => {
  it("reads plan prices from the backend billing fields", () => {
    expect(getSubscriptionPlanPrice(plan, "monthly")).toBe(2500);
    expect(getSubscriptionPlanPrice(plan, "annual")).toBe(12000);
    expect(getSubscriptionPlanPricing(plan)).toEqual({
      monthly: 2500,
      annual: 12000,
    });
  });

  it("builds the checkout plan selection from one backend plan shape", () => {
    expect(buildCheckoutPlanSelection(plan, "annual")).toEqual({
      planId: "plan-1",
      name: "Course Membership",
      price: 12000,
      billingCycle: "annual",
      courseAccess: "all",
      maxQuizAttemptsPerDay: 2,
    });
  });

  it("derives annual savings from backend monthly and yearly prices", () => {
    expect(getAnnualSavingsPercent(plan)).toBe(60);
    expect(getAnnualSavingsPercent({ monthlyPrice: 100, yearlyPrice: 1200 })).toBe(0);
  });
});
