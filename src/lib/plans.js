import { fetchBackendJson } from "./api";
import { readDataEnvelope } from "./apiEnvelope";

export const readPlans = (payload) => (
  readDataEnvelope(payload, Array.isArray, "Invalid plans response")
);

export const fetchPlans = async () => {
  const payload = await fetchBackendJson("/plans");
  return readPlans(payload);
};
