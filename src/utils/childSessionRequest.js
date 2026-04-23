export const CHILD_SESSION_TTL_MS = Number(
  import.meta.env.VITE_CHILD_SESSION_TTL_MS || 60 * 60 * 1000
);

const CHILD_SESSION_STORAGE_KEY = "robotronics.activeChildSession";

const normalizeChildIdentifier = (value) => {
  if (value === undefined || value === null) {
    return null;
  }

  const normalizedValue = String(value).trim();
  return normalizedValue.length > 0 ? normalizedValue : null;
};

export const getChildSessionIdentifiers = (child = {}) => {
  const identifiers = [
    child.accessChildId,
    child.childId,
    child.roboChildId,
    child._id,
    child.id,
  ]
    .map(normalizeChildIdentifier)
    .filter(Boolean);

  return [...new Set(identifiers)];
};

export const matchesChildSessionIdentifier = (child, childId) => {
  const normalizedChildId = normalizeChildIdentifier(childId);

  if (!normalizedChildId) {
    return false;
  }

  return getChildSessionIdentifiers(child).includes(normalizedChildId);
};

export const resolveChildSessionIdentifier = (child, preferredChildId) => {
  const normalizedPreferredChildId = normalizeChildIdentifier(preferredChildId);
  const childIdentifiers = getChildSessionIdentifiers(child);

  if (normalizedPreferredChildId && childIdentifiers.includes(normalizedPreferredChildId)) {
    return normalizedPreferredChildId;
  }

  return childIdentifiers[0] || null;
};

const getSessionStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage;
};

const normalizeChildSession = (value) => {
  const childIds = [...new Set([
    normalizeChildIdentifier(value?.childId),
    ...(Array.isArray(value?.childIds) ? value.childIds.map(normalizeChildIdentifier) : []),
  ].filter(Boolean))];

  if (childIds.length === 0 || !value?.sessionId) {
    return null;
  }

  const expiresAt = Number(value.expiresAt);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return null;
  }

  return {
    childId: childIds[0],
    childIds,
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

export const setActiveChildSession = ({ childId, childIds = [], sessionId }) => {
  const nextChildIds = [...new Set([
    normalizeChildIdentifier(childId),
    ...childIds.map(normalizeChildIdentifier),
  ].filter(Boolean))];

  activeChildSession = {
    childId: nextChildIds[0],
    childIds: nextChildIds,
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

  const normalizedExpectedChildId = normalizeChildIdentifier(expectedChildId);
  if (normalizedExpectedChildId && !nextSession.childIds.includes(normalizedExpectedChildId)) {
    return null;
  }

  return {
    childId: nextSession.childId,
    childIds: nextSession.childIds,
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
