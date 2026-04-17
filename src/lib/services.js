import { fetchBackendJson } from "./api";

const SERVICES_CACHE_KEY = "robotronics.publicServices";

const getServicesStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage;
};

const normalizeServicesPayload = (payload) => {
  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return Array.isArray(payload) ? payload : [];
};

const writeServicesCache = (services) => {
  const storage = getServicesStorage();
  if (!storage) {
    return services;
  }

  try {
    storage.setItem(SERVICES_CACHE_KEY, JSON.stringify(services));
  } catch {
    storage.removeItem(SERVICES_CACHE_KEY);
  }

  return services;
};

export const readCachedServices = () => {
  const storage = getServicesStorage();
  if (!storage) {
    return [];
  }

  const rawServices = storage.getItem(SERVICES_CACHE_KEY);
  if (!rawServices) {
    return [];
  }

  try {
    const parsedServices = JSON.parse(rawServices);
    return Array.isArray(parsedServices) ? parsedServices : [];
  } catch {
    storage.removeItem(SERVICES_CACHE_KEY);
    return [];
  }
};

export const findCachedService = (serviceId) =>
  readCachedServices().find((service) => String(service?._id) === String(serviceId)) || null;

export const fetchServices = async () => {
  const payload = await fetchBackendJson("/api/getAllService");
  return writeServicesCache(normalizeServicesPayload(payload));
};
