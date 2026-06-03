import { fetchBackendJson } from "./api";

export const readProducts = (payload) => {
  if (!Array.isArray(payload?.data)) {
    throw new Error("Invalid products response");
  }

  return payload.data;
};

export const readProduct = (payload) => {
  if (!payload?.data || typeof payload.data !== "object" || Array.isArray(payload.data)) {
    throw new Error("Invalid product response");
  }

  return payload.data;
};

export const fetchProducts = async () => {
  const payload = await fetchBackendJson("/products");
  return readProducts(payload);
};

export const fetchProductById = async (productId) => {
  const payload = await fetchBackendJson(`/products/${productId}`);
  return readProduct(payload);
};
