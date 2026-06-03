import { fetchBackendJson } from "./api";

export const readPlans = (payload) => {
  if (!Array.isArray(payload?.data)) {
    throw new Error("Invalid plans response");
  }

  return payload.data;
};

export const fetchPlans = async () => {
  const payload = await fetchBackendJson("/plans");
  return readPlans(payload);
};
