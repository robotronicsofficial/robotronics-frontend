import { describe, expect, it } from "vitest";

import {
  buildParentRegistrationPayload,
  getPersistedCheckoutChildren,
} from "./checkoutPayload";

describe("checkout payload contract", () => {
  it("builds the parent registration payload expected by the backend", () => {
    expect(buildParentRegistrationPayload({
      currentUser: {
        _id: "user-1",
        firstName: "Ava",
        lastName: "Parent",
        email: "ava@example.com",
        phone: "+923001112233",
      },
      parent: {
        streetAddress: "1 Main Road",
        city: "Lahore",
        state: "Punjab",
        postalCode: "54000",
        country: "Pakistan",
      },
      children: [
        {
          checkoutChildKey: "child-key-1",
          firstName: "Omar",
          lastName: "Parent",
          dateOfBirth: "2016-02-03",
          gender: "male",
          schoolName: "Ignored here",
        },
      ],
      plan: {
        planId: "plan-1",
        billingCycle: "monthly",
      },
    })).toEqual({
      parent: {
        firstName: "Ava",
        lastName: "Parent",
        email: "ava@example.com",
        phone: "+923001112233",
        userId: "user-1",
        streetAddress: "1 Main Road",
        city: "Lahore",
        state: "Punjab",
        postalCode: "54000",
        country: "Pakistan",
      },
      children: [
        {
          checkoutChildKey: "child-key-1",
          firstName: "Omar",
          lastName: "Parent",
          dateOfBirth: "2016-02-03",
          gender: "male",
        },
      ],
      plan: {
        planId: "plan-1",
        billingCycle: "monthly",
      },
    });
  });

  it("reads persisted children from the canonical parent response", () => {
    const children = [{ childCode: "P-5001-01" }];

    expect(getPersistedCheckoutChildren({ parent: { children } })).toBe(children);
    expect(getPersistedCheckoutChildren({ children })).toEqual([]);
  });
});
