import { afterEach, describe, expect, it, vi } from "vitest";

import {
  claimShopCheckoutOwner,
  clearPendingCartItems,
  loadShopCheckout,
  loadPendingCartItems,
  savePendingCartItems,
  saveShopCheckout,
} from "./shopCheckout";

const createStorage = () => {
  const values = new Map();

  return {
    getItem: (key) => values.get(key) || null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
};

describe("shop checkout storage contract", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("round-trips pending cart items through the shop checkout storage contract", () => {
    vi.stubGlobal("window", { localStorage: createStorage() });

    const cart = [
      {
        itemType: "product",
        itemId: "product-1",
        quantity: 2,
      },
      null,
    ];

    savePendingCartItems(cart);

    expect(loadPendingCartItems()).toEqual([
      {
        itemType: "product",
        itemId: "product-1",
        quantity: 2,
      },
    ]);

    clearPendingCartItems();

    expect(loadPendingCartItems()).toEqual([]);
  });

  it("clears shop checkout details when a different owner claims the draft", () => {
    vi.stubGlobal("window", {
      localStorage: createStorage(),
      sessionStorage: createStorage(),
    });

    saveShopCheckout({ note: "Ring first" });
    claimShopCheckoutOwner("user-1");

    expect(loadShopCheckout()).toMatchObject({
      ownerId: "user-1",
      note: "Ring first",
    });

    claimShopCheckoutOwner("user-2");

    expect(loadShopCheckout()).toEqual({
      ownerId: "user-2",
      customer: null,
      address: null,
      payment: null,
      note: "",
    });
  });
});
