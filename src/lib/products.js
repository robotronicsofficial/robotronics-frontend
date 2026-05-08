import { fetchBackendJson } from "./api";

export const fetchProducts = async () => {
  const payload = await fetchBackendJson("/getProducts");
  return Array.isArray(payload?.products) ? payload.products : [];
};

export const fetchProductById = (productId) =>
  fetchBackendJson(`/getProductById/${productId}`);
