import { fetchSessionJson, sendSessionJson } from "./api";
import {
  ensureArray,
  normalizeParentRecord,
} from "./subscription";

export const fetchCurrentParent = async () => {
  const payload = await fetchSessionJson("/parents/me");
  return payload?.parent ? normalizeParentRecord(payload.parent) : null;
};

export const fetchChildAccounts = async (userId) => {
  const payload = await fetchSessionJson(`/parents/${encodeURIComponent(userId)}/child-accounts`);

  return {
    parent: payload?.parent ? normalizeParentRecord(payload.parent) : null,
    children: ensureArray(payload?.children),
  };
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

export const fetchChildEnrollment = (childId) =>
  fetchSessionJson(`/children/${childId}`);

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
