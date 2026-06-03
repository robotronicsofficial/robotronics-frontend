import { fetchBackendJson } from "./api";

export const readProductCategoryNames = (payload) => (
  Array.isArray(payload?.categories)
    ? payload.categories
        .map((category) => String(category?.name || "").trim())
        .filter(Boolean)
    : []
);

export const fetchProductCategoryNames = async () => (
  readProductCategoryNames(await fetchBackendJson("/product-categories"))
);
