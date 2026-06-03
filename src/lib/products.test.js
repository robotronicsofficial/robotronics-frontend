import { describe, expect, it, vi } from "vitest";

import { fetchBackendJson } from "./api";
import { fetchProductById, fetchProducts, readProduct, readProducts } from "./products";

vi.mock("./api", () => ({
  fetchBackendJson: vi.fn(),
}));

describe("product API contract", () => {
  it("reads product lists from the backend data envelope", async () => {
    const products = [{ _id: "product-1", name: "Robot Kit" }];
    fetchBackendJson.mockResolvedValueOnce({ data: products });

    await expect(fetchProducts()).resolves.toBe(products);
    expect(fetchBackendJson).toHaveBeenCalledWith("/products");
  });

  it("reads product details from the backend data envelope", async () => {
    const product = { _id: "product-1", name: "Robot Kit" };
    fetchBackendJson.mockResolvedValueOnce({ data: product });

    await expect(fetchProductById("product-1")).resolves.toBe(product);
    expect(fetchBackendJson).toHaveBeenCalledWith("/products/product-1");
  });

  it("rejects legacy product envelopes", () => {
    expect(() => readProducts({ products: [{ _id: "legacy-list" }] })).toThrow(
      "Invalid products response",
    );
    expect(() => readProduct({ product: { _id: "legacy-detail" } })).toThrow(
      "Invalid product response",
    );
  });
});
