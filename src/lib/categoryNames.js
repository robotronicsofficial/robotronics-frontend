export const readCategoryNames = (payload, responseName) => {
  if (!Array.isArray(payload?.data)) {
    throw new Error(`Invalid ${responseName} response`);
  }

  return payload.data
    .map((category) => String(category?.name || "").trim())
    .filter(Boolean);
};
