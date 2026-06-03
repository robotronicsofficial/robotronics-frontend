import { afterEach, describe, expect, it } from "vitest";

import { useCartStore } from "./cartStore";

describe("cart store ownership", () => {
  afterEach(() => {
    useCartStore.getState().clearOwner();
  });

  it("keeps a guest cart when the first owner claims it", () => {
    useCartStore.getState().addToCart({
      itemType: "product",
      itemId: "product-1",
      name: "Robot Kit",
      price: 1000,
      quantity: 1,
    });

    useCartStore.getState().claimOwner("user-1");

    expect(useCartStore.getState().ownerId).toBe("user-1");
    expect(useCartStore.getState().cart).toHaveLength(1);
  });

  it("clears cart items when a different owner claims persisted state", () => {
    useCartStore.setState({
      ownerId: "user-1",
      cart: [
        {
          itemType: "product",
          itemId: "product-1",
          name: "Robot Kit",
          price: 1000,
          quantity: 1,
        },
      ],
    });

    useCartStore.getState().claimOwner("user-2");

    expect(useCartStore.getState().ownerId).toBe("user-2");
    expect(useCartStore.getState().cart).toEqual([]);
  });
});
