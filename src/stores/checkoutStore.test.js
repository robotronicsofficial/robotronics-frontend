import { describe, expect, it } from "vitest";

import {
  selectHasPlan,
  selectIsChildrenComplete,
  selectIsParentComplete,
  selectIsPaymentComplete,
  selectTotalPrice,
} from "./checkoutStore";

describe("checkout store selectors", () => {
  const completeState = {
    plan: { planId: "plan-1", billingCycle: "annual", price: 1200 },
    children: [
      {
        firstName: "Ava",
        lastName: "Khan",
        dateOfBirth: "2016-01-01",
        gender: "female",
      },
      {
        firstName: "Omar",
        lastName: "Khan",
        dateOfBirth: "2014-01-01",
        gender: "male",
      },
    ],
    parent: {
      streetAddress: "1 Main Street",
      city: "Lahore",
      state: "Punjab",
      postalCode: "54000",
      country: "Pakistan",
    },
    payment: {
      method: "invoice",
      accountName: "Parent Khan",
      email: "parent@example.com",
    },
  };

  it("requires a complete plan, children, parent address, and payment contact", () => {
    expect(selectHasPlan(completeState)).toBe(true);
    expect(selectIsChildrenComplete(completeState)).toBe(true);
    expect(selectIsParentComplete(completeState)).toBe(true);
    expect(selectIsPaymentComplete(completeState)).toBe(true);
  });

  it("prices each child as a separate subscription seat", () => {
    expect(selectTotalPrice(completeState)).toBe(2400);
  });

  it("keeps incomplete child rows from advancing checkout", () => {
    expect(selectIsChildrenComplete({
      ...completeState,
      children: [{ firstName: "Ava", lastName: "", dateOfBirth: "", gender: "" }],
    })).toBe(false);
  });
});
