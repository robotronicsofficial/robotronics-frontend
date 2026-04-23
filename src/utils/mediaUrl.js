import { resolveBackendUrl } from "../lib/api";

export const resolveBackendAssetUrl = (value, fallback = "") => {
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value;

  return resolveBackendUrl(value);
};
