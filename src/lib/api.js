const trimTrailingSlash = (value) => String(value || "").trim().replace(/\/+$/, "");
const LOOPBACK_HOSTS = new Set(["127.0.0.1", "localhost"]);
const BACKEND_API_PREFIX = "/api";

const normalizeBackendPath = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  const normalizedPath = value.trim().replace(/\\/g, "/");

  if (
    normalizedPath === BACKEND_API_PREFIX ||
    normalizedPath.startsWith(`${BACKEND_API_PREFIX}/`)
  ) {
    return normalizedPath.slice(BACKEND_API_PREFIX.length) || "/";
  }

  return normalizedPath;
};

const resolveLoopbackBackendUrl = (value) => {
  const normalizedValue = trimTrailingSlash(value);

  if (!normalizedValue || typeof window === "undefined" || !/^https?:\/\//i.test(normalizedValue)) {
    return normalizedValue;
  }

  try {
    const backendUrl = new URL(normalizedValue);
    const currentHost = window.location.hostname;

    if (!LOOPBACK_HOSTS.has(currentHost) || !LOOPBACK_HOSTS.has(backendUrl.hostname)) {
      return normalizedValue;
    }

    backendUrl.protocol = window.location.protocol;
    backendUrl.hostname = currentHost;
    return trimTrailingSlash(backendUrl.href);
  } catch {
    return normalizedValue;
  }
};

export const BACKEND_BASE_URL = resolveLoopbackBackendUrl(
  import.meta.env.VITE_BACKEND_URL || BACKEND_API_PREFIX,
);

export const resolveBackendUrl = (path = "") => {
  const normalizedPath = normalizeBackendPath(path);

  if (!normalizedPath) {
    return BACKEND_BASE_URL;
  }

  if (/^https?:\/\//i.test(normalizedPath)) {
    return normalizedPath;
  }

  if (!BACKEND_BASE_URL) {
    return normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
  }

  return normalizedPath.startsWith("/")
    ? `${BACKEND_BASE_URL}${normalizedPath}`
    : `${BACKEND_BASE_URL}/${normalizedPath}`;
};

const parseResponseBody = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const getApiErrorMessage = (response, payload) =>
  payload?.message ||
  payload?.error ||
  `Request failed with status ${response.status}`;

const buildJsonHeaders = (headers = {}, includeContentType = false) => ({
  Accept: "application/json",
  ...(includeContentType ? { "Content-Type": "application/json" } : {}),
  ...headers,
});

export const fetchBackendJson = async (path, options = {}) => {
  const response = await fetch(resolveBackendUrl(path), {
    ...options,
    headers: buildJsonHeaders(options.headers),
  });
  const payload = await parseResponseBody(response);

  if (!response.ok) {
    const error = new Error(getApiErrorMessage(response, payload));
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
};

export const fetchSessionJson = (path, options = {}) =>
  fetchBackendJson(path, {
    credentials: "include",
    cache: options.cache ?? "no-store",
    ...options,
  });

export const sendSessionJson = (path, { body, headers, ...options } = {}) =>
  fetchSessionJson(path, {
    ...options,
    headers: buildJsonHeaders(headers, true),
    body: body === undefined ? undefined : JSON.stringify(body),
  });

export const sendJson = (path, { body, headers, ...options } = {}) =>
  fetchBackendJson(path, {
    ...options,
    headers: buildJsonHeaders(headers, true),
    body: body === undefined ? undefined : JSON.stringify(body),
  });
