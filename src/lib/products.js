import { fetchBackendJson } from "./api";

export const fetchProducts = async () => {
  const payload = await fetchBackendJson("/products");
  return Array.isArray(payload?.products) ? payload.products : [];
};

export const fetchProductById = (productId) =>
  fetchBackendJson(`/products/${productId}`);
