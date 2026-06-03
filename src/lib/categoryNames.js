import { readDataEnvelope } from "./apiEnvelope";

export const readCategoryNames = (payload, responseName) => {
  const categories = readDataEnvelope(
    payload,
    Array.isArray,
    `Invalid ${responseName} response`,
  );

  return categories
    .map((category) => String(category?.name || "").trim())
    .filter(Boolean);
};
