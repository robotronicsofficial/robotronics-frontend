import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildShopCartQuoteRequest,
  buildShopCheckoutIntentRequest,
  claimShopCheckoutOwner,
  clearPendingCartItems,
  loadShopCheckout,
  loadPendingCartItems,
  hasShopCartQuoteItems,
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

  it("uses one cart item request contract for quotes and checkout intents", () => {
    const cart = [
      {
        itemType: "product",
        itemId: "product-1",
        quantity: "2",
        price: 9000,
      },
      {
        itemType: "course",
        itemId: "course-1",
        quantity: 1,
      },
      {
        itemType: "product",
        itemId: "",
        quantity: 1,
      },
    ];
    const expectedItems = [
      { itemType: "product", itemId: "product-1", quantity: 2 },
      { itemType: "course", itemId: "course-1", quantity: 1 },
      { itemType: "product", itemId: "", quantity: 1 },
    ];

    expect(buildShopCartQuoteRequest({ cart }).items).toEqual(expectedItems);
    expect(buildShopCheckoutIntentRequest({ cart }).items).toEqual(expectedItems);
  });

  it("only treats backend quotes with items as checkout-ready", () => {
    expect(hasShopCartQuoteItems(null)).toBe(false);
    expect(hasShopCartQuoteItems({ items: [] })).toBe(false);
    expect(hasShopCartQuoteItems({ items: [{ itemId: "product-1" }] })).toBe(true);
  });

  it("uses the backend quote fulfillment decision for checkout address fields", () => {
    const checkout = {
      address: {
        addressId: "address-1",
        firstName: "Sara",
        lastName: "Khan",
      },
    };

    expect(
      buildShopCheckoutIntentRequest({
        checkout,
        requiresShipping: false,
      }),
    ).toMatchObject({
      addressId: null,
      address: null,
    });

    expect(
      buildShopCheckoutIntentRequest({
        checkout,
        requiresShipping: true,
      }),
    ).toMatchObject({
      addressId: "address-1",
      address: expect.objectContaining({
        firstName: "Sara",
        lastName: "Khan",
      }),
    });
  });
});
