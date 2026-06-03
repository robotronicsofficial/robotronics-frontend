import { fetchBackendJson } from "./api";

export const fetchProducts = async () => {
  const payload = await fetchBackendJson("/products");
  return payload?.data;
};

export const fetchProductById = async (productId) => {
  const payload = await fetchBackendJson(`/products/${productId}`);
  return payload?.data;
};
