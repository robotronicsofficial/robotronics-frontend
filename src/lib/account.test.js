import { describe, expect, it } from "vitest";

import {
  readChildAccounts,
  readCurrentParent,
  readPayments,
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
});
