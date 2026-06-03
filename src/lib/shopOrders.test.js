import { describe, expect, it } from "vitest";

import {
  readShopCartQuote,
  readShopCheckoutSubmission,
} from "./shopOrders";

describe("shop order api readers", () => {
  it("reads shop cart quotes from the backend data envelope", () => {
    const quote = {
      items: [{ itemType: "product", itemId: "product-1", quantity: 1 }],
      requiresShipping: true,
      pricing: { subtotal: 1000, discount: 0, shipping: 500, total: 1500 },
    };

    expect(readShopCartQuote({
      success: true,
      data: { quote },
    })).toEqual(quote);
  });

  it("reads shop checkout submissions from the backend data envelope", () => {
    expect(readShopCheckoutSubmission({
      success: true,
      message: "Checkout intent submitted successfully",
      data: {
        checkoutIntent: { _id: "checkout-1" },
        crmSyncQueued: true,
        crmSyncSkippedReason: null,
      },
    })).toEqual({
      message: "Checkout intent submitted successfully",
      checkoutIntent: { _id: "checkout-1" },
      crmSyncQueued: true,
      crmSyncSkippedReason: null,
    });
  });
});
