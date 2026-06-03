import { describe, expect, it } from "vitest";

import {
  readChildAccounts,
  readChildEnrollment,
  readCurrentParent,
  readPayments,
  readSubscriptionActivation,
  readSubscriptionCheckoutIntent,
} from "./account";

describe("account api readers", () => {
  it("reads the current parent from the backend data envelope", () => {
    const parent = {
      firstName: "Parent",
      lastName: "One",
      children: [],
    };

    expect(readCurrentParent({ success: true, data: parent })).toMatchObject(parent);
  });

  it("reads child accounts from the backend data envelope", () => {
    const parent = {
      firstName: "Parent",
      children: [{ childCode: "P-5001-01", firstName: "Child" }],
    };

    expect(readChildAccounts({ success: true, data: { parent, children: parent.children } }))
      .toMatchObject({
        parent,
        children: parent.children,
      });
  });

  it("reads payments from the backend data envelope", () => {
    const payments = [
      {
        paymentId: "pay-1",
        invoiceId: "inv-1",
        amount: 2500,
      },
    ];

    expect(readPayments({ success: true, data: payments })).toEqual(payments);
  });

  it("reads child enrollment from the backend data envelope", () => {
    expect(readChildEnrollment({
      success: true,
      data: {
        childId: "P-5001-01",
        courses: [
          {
            courseId: "course-1",
            Sections: [{ modules: [] }],
            progress: "50",
          },
        ],
      },
    })).toEqual({
      childId: "P-5001-01",
      courses: [
        {
          courseId: "course-1",
          Sections: [{ modules: [], quiz: null }],
          progress: 50,
        },
      ],
    });
  });

  it("reads subscription checkout intents from the backend data envelope", () => {
    expect(readSubscriptionCheckoutIntent({
      success: true,
      message: "Subscription checkout request created",
      data: {
        subscription: { _id: "sub-1", status: "pending" },
      },
    })).toEqual({
      message: "Subscription checkout request created",
      subscription: { _id: "sub-1", status: "pending" },
    });
  });

  it("reads subscription activations from the backend data envelope", () => {
    expect(readSubscriptionActivation({
      success: true,
      message: "Subscription activated successfully",
      data: {
        subscription: { _id: "sub-1", status: "active" },
        enrolledChildren: [{ childId: "P-5001-01", courses: 4, hasPin: true }],
        courses: [{ _id: "course-1", title: "Python Foundations" }],
      },
    })).toEqual({
      message: "Subscription activated successfully",
      subscription: { _id: "sub-1", status: "active" },
      enrolledChildren: [{ childId: "P-5001-01", courses: 4, hasPin: true }],
      courses: [{ _id: "course-1", title: "Python Foundations" }],
    });
  });
});
