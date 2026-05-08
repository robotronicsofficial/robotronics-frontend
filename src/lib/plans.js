import { fetchBackendJson } from "./api";

export const fetchPlans = async () => {
  const payload = await fetchBackendJson("/getAllPlans");
  return Array.isArray(payload?.plans) ? payload.plans : [];
};
