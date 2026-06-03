import { fetchBackendJson } from "./api";
import { isRecord, readDataEnvelope } from "./apiEnvelope";

export const readServices = (payload) => (
  readDataEnvelope(payload, Array.isArray, "Invalid services response")
);

export const readService = (payload) => (
  readDataEnvelope(payload, isRecord, "Invalid service response")
);

export const fetchServices = async () => {
  const payload = await fetchBackendJson("/services");
  return readServices(payload);
};

export const fetchServiceById = async (serviceId) => {
  const payload = await fetchBackendJson(`/services/${serviceId}`);
  return readService(payload);
};
