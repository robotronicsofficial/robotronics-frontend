import { describe, expect, it } from "vitest";

import { readPayments } from "./account";

describe("account api readers", () => {
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
