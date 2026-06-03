import { fetchBackendJson } from "./api";
import { readCategoryNames } from "./categoryNames";

export const readProductCategoryNames = (payload) => (
  readCategoryNames(payload, "product categories")
);

export const fetchProductCategoryNames = async () => (
  readProductCategoryNames(await fetchBackendJson("/product-categories"))
);
