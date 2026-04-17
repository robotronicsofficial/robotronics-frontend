export const CHILD_SESSION_TTL_MS = Number(
  import.meta.env.VITE_CHILD_SESSION_TTL_MS || 60 * 60 * 1000
);

let activeChildSession = null;

export const setActiveChildSession = ({ childId, sessionId }) => {
  activeChildSession = {
    childId,
    sessionId,
    expiresAt: Date.now() + CHILD_SESSION_TTL_MS,
  };
};

export const clearActiveChildSession = () => {
  activeChildSession = null;
};

export const getActiveChildSession = () => {
  if (!activeChildSession || activeChildSession.expiresAt <= Date.now()) {
    clearActiveChildSession();
    return null;
  }

  return {
    childId: activeChildSession.childId,
    sessionId: activeChildSession.sessionId,
  };
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
    body: JSON.stringify(body),
  };
};

export const buildOptionalChildSessionRequest = (options = {}) =>
  buildChildSessionRequest({
    ...options,
    required: false,
  });
