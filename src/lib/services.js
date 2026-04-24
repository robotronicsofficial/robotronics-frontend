import { fetchBackendJson } from "./api";

const normalizeServicesPayload = (payload) => {
  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return Array.isArray(payload) ? payload : [];
};

const normalizeSingleServicePayload = (payload) => {
  if (payload?.data && typeof payload.data === "object" && !Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    return payload;
  }

  return null;
};

export const fetchServices = async () => {
  const payload = await fetchBackendJson("/getAllService");
  return normalizeServicesPayload(payload);
};

export const fetchServiceById = async (serviceId) => {
  const payload = await fetchBackendJson(`/services/${serviceId}`);
  const service = normalizeSingleServicePayload(payload);

  if (!service) {
    throw new Error("Service not found");
  }

  return service;
};
