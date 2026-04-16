const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const toBackendUrl = (path) => `${BACKEND_URL}${path}`;

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

export const fetchBackendJson = async (path, options = {}) => {
  const response = await fetch(toBackendUrl(path), options);
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
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

export const sendJson = (path, { body, headers, ...options } = {}) =>
  fetchBackendJson(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
