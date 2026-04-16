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
} = {}) => {
  const session = getActiveChildSession();

  if (!session) {
    return null;
  }

  const nextHeaders = {
    ...headers,
    "X-Child-Session": session.sessionId,
  };

  if (body === undefined) {
    return {
      method,
      headers: nextHeaders,
    };
  }

  return {
    method,
    headers: nextHeaders,
    body: JSON.stringify({
      ...body,
      sessionId: session.sessionId,
    }),
  };
};
