import { fetchSessionJson, sendSessionJson } from "./api";
import {
  ensureArray,
  normalizeChildCourse,
  normalizeParentRecord,
} from "./subscription";

export const readCurrentParent = (payload) => {
  const parent = payload?.data ?? null;

  if (parent !== null && (typeof parent !== "object" || Array.isArray(parent))) {
    throw new Error("Invalid parent response");
  }

  return parent ? normalizeParentRecord(parent) : null;
};

export const fetchCurrentParent = async () => {
  const payload = await fetchSessionJson("/parents/me");
  return readCurrentParent(payload);
};

export const readChildAccounts = (payload) => {
  const data = payload?.data;

  if (!data || typeof data !== "object" || Array.isArray(data) || !Array.isArray(data.children)) {
    throw new Error("Invalid child accounts response");
  }

  return {
    parent: data.parent ? normalizeParentRecord(data.parent) : null,
    children: data.children,
  };
};

export const fetchChildAccounts = async (userId) => {
  const payload = await fetchSessionJson(`/parents/${encodeURIComponent(userId)}/child-accounts`);
  return readChildAccounts(payload);
};

export const readPayments = (payload) => {
  if (!Array.isArray(payload?.data)) {
    throw new Error("Invalid payments response");
  }

  return payload.data;
};

export const fetchPayments = async () => {
  const payload = await fetchSessionJson("/payments/me");
  return readPayments(payload);
};

export const readChildEnrollment = (payload) => {
  const data = payload?.data;

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Invalid child enrollment response");
  }

  return {
    childId: data.childId,
    courses: ensureArray(data.courses).map(normalizeChildCourse),
  };
};

export const fetchChildEnrollment = async (childId) => {
  const payload = await fetchSessionJson(`/children/${childId}`);
  return readChildEnrollment(payload);
};

export const saveParent = (body) =>
  sendSessionJson("/parents", {
    method: "POST",
    body,
  });

export const activateSubscription = (body) =>
  sendSessionJson("/subscriptions/activate", {
    method: "POST",
    body,
  });

export const createSubscriptionCheckoutIntent = (body) =>
  sendSessionJson("/subscriptions/checkout-intents", {
    method: "POST",
    body,
  });

export const createChildPin = (body) =>
  sendSessionJson("/children", {
    method: "POST",
    body,
  });

export const changeChildPin = ({ childId, oldPin, newPin }) =>
  sendSessionJson(`/children/${childId}/pin`, {
    method: "PATCH",
    body: {
      oldPin,
      newPin,
    },
  });

export const verifyChildPin = ({ childId, pin, force = false }) =>
  sendSessionJson(`/children/${childId}/pin/verify`, {
    method: "POST",
    body: {
      pin,
      force,
    },
  });

export const resetChildPin = ({ childId, newPin }) =>
  sendSessionJson(`/children/${childId}/pin/reset`, {
    method: "POST",
    body: { newPin },
  });
