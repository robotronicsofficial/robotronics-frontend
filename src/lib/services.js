import { fetchBackendJson } from "./api";

export const readServices = (payload) => {
  if (payload?.success !== true || !Array.isArray(payload?.data)) {
    throw new Error("Invalid services response");
  }

  return payload.data;
};

export const readService = (payload) => {
  if (
    payload?.success !== true ||
    !payload?.data ||
    typeof payload.data !== "object" ||
    Array.isArray(payload.data)
  ) {
    throw new Error("Invalid service response");
  }

  return payload.data;
};

export const fetchServices = async () => {
  const payload = await fetchBackendJson("/services");
  return readServices(payload);
};

export const fetchServiceById = async (serviceId) => {
  const payload = await fetchBackendJson(`/services/${serviceId}`);
  return readService(payload);
};
