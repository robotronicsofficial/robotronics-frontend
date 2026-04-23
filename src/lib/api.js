const trimTrailingSlash = (value) => String(value || "").trim().replace(/\/+$/, "");

const normalizeBackendPath = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\\/g, "/");
};

const BACKEND_URL = trimTrailingSlash(import.meta.env.VITE_BACKEND_URL);

export const resolveBackendUrl = (path = "") => {
  const normalizedPath = normalizeBackendPath(path);

  if (!normalizedPath) {
    return BACKEND_URL;
  }

  if (/^https?:\/\//i.test(normalizedPath)) {
    return normalizedPath;
  }

  if (!BACKEND_URL) {
    return normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;
  }

  return normalizedPath.startsWith("/")
    ? `${BACKEND_URL}${normalizedPath}`
    : `${BACKEND_URL}/${normalizedPath}`;
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
