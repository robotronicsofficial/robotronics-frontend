export const CHILD_SESSION_TTL_MS = Number(
  import.meta.env.VITE_CHILD_SESSION_TTL_MS || 60 * 60 * 1000
);

const CHILD_SESSION_STORAGE_KEY = "robotronics.activeChildSession";

const getSessionStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage;
};

const normalizeChildSession = (value) => {
  if (!value?.childId || !value?.sessionId) {
    return null;
  }

  const expiresAt = Number(value.expiresAt);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return null;
  }

  return {
    childId: String(value.childId),
    sessionId: String(value.sessionId),
    expiresAt,
  };
};

const persistActiveChildSession = (session) => {
  const storage = getSessionStorage();
  if (!storage) {
    return;
  }

  if (!session) {
    storage.removeItem(CHILD_SESSION_STORAGE_KEY);
    return;
  }

  storage.setItem(CHILD_SESSION_STORAGE_KEY, JSON.stringify(session));
};

const readStoredChildSession = () => {
  const storage = getSessionStorage();
  if (!storage) {
    return null;
  }

  const rawSession = storage.getItem(CHILD_SESSION_STORAGE_KEY);
  if (!rawSession) {
    return null;
  }

  try {
    const session = normalizeChildSession(JSON.parse(rawSession));
    if (!session) {
      storage.removeItem(CHILD_SESSION_STORAGE_KEY);
    }
    return session;
  } catch {
    storage.removeItem(CHILD_SESSION_STORAGE_KEY);
    return null;
  }
};

let activeChildSession = readStoredChildSession();

export const setActiveChildSession = ({ childId, sessionId }) => {
  activeChildSession = {
    childId,
    sessionId,
    expiresAt: Date.now() + CHILD_SESSION_TTL_MS,
  };
  persistActiveChildSession(activeChildSession);
};

export const clearActiveChildSession = () => {
  activeChildSession = null;
  persistActiveChildSession(null);
};

export const getActiveChildSession = (expectedChildId) => {
  const nextSession = normalizeChildSession(activeChildSession) || readStoredChildSession();

  if (!nextSession) {
    clearActiveChildSession();
    return null;
  }

  activeChildSession = nextSession;

  if (expectedChildId && nextSession.childId !== expectedChildId) {
    return null;
  }

  return {
    childId: nextSession.childId,
    sessionId: nextSession.sessionId,
  };
};

export const getActiveChildId = (expectedChildId) =>
  getActiveChildSession(expectedChildId)?.childId || null;

export const buildChildSessionRequest = ({
  method = "GET",
  headers = {},
  body,
  required = true,
  childId,
} = {}) => {
  const session = getActiveChildSession(childId);

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
      credentials: "include",
      headers: nextHeaders,
    };
  }

  return {
    method,
    credentials: "include",
    headers: nextHeaders,
    body: JSON.stringify(body),
  };
};
