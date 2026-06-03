import { fetchBackendJson } from "./api";
import { isRecord, readDataEnvelope } from "./apiEnvelope";

export const readProducts = (payload) => (
  readDataEnvelope(payload, Array.isArray, "Invalid products response")
);

export const readProduct = (payload) => (
  readDataEnvelope(payload, isRecord, "Invalid product response")
);

export const fetchProducts = async () => {
  const payload = await fetchBackendJson("/products");
  return readProducts(payload);
};

export const fetchProductById = async (productId) => {
  const payload = await fetchBackendJson(`/products/${productId}`);
  return readProduct(payload);
};
