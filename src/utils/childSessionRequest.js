export const CHILD_SESSION_TTL_MS = Number(
  import.meta.env.VITE_CHILD_SESSION_TTL_MS || 60 * 60 * 1000
);

export const clearActiveChildSession = () => {
  localStorage.removeItem("selectedChildId");
  localStorage.removeItem("childSession");
  localStorage.removeItem("childSessionExpires");
};

export const getActiveChildSession = () => {
  const childId = localStorage.getItem("selectedChildId");
  const sessionId = localStorage.getItem("childSession");
  const sessionExpires = Number(localStorage.getItem("childSessionExpires") || 0);

  if (!childId || !sessionId || !sessionExpires || sessionExpires <= Date.now()) {
    clearActiveChildSession();
    return null;
  }

  return { childId, sessionId };
};

export const buildChildSessionRequest = ({
  method = "GET",
  headers = {},
  body,
  required = true,
} = {}) => {
  const session = getActiveChildSession();

  if (!session && required) {
    return null;
  }

  const nextHeaders = session
    ? {
        ...headers,
        "X-Child-Session": session.sessionId,
      }
    : { ...headers };

  if (body === undefined) {
    return {
      method,
      headers: nextHeaders,
    };
  }

  return {
    method,
    headers: nextHeaders,
    body: JSON.stringify(
      session
        ? {
            ...body,
            sessionId: session.sessionId,
          }
        : body
    ),
  };
};

export const buildOptionalChildSessionRequest = (options = {}) =>
  buildChildSessionRequest({
    ...options,
    required: false,
  });
