export const resolveBackendAssetUrl = (value, fallback = "") => {
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value;

  return `${import.meta.env.VITE_BACKEND_URL}/${value.replace(/\\/g, "/")}`;
};
