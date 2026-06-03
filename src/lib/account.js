import { fetchSessionJson, sendSessionJson } from "./api";
import { isRecord, readDataEnvelope } from "./apiEnvelope";
import { readChildSessionVerification } from "./childSession";
import {
  ensureArray,
  normalizeChildCourse,
  normalizeParentRecord,
} from "./subscription";

export const readCurrentParent = (payload) => {
  const parent = readDataEnvelope(
    payload,
    (value) => value === null || isRecord(value),
    "Invalid parent response",
  );

  return parent ? normalizeParentRecord(parent) : null;
};

export const fetchCurrentParent = async () => {
  const payload = await fetchSessionJson("/parents/me");
  return readCurrentParent(payload);
};

export const readChildAccounts = (payload) => {
  const data = readDataEnvelope(
    payload,
    (value) => isRecord(value) && Array.isArray(value.children),
    "Invalid child accounts response",
  );

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
  return readDataEnvelope(payload, Array.isArray, "Invalid payments response");
};

export const fetchPayments = async () => {
  const payload = await fetchSessionJson("/payments/me");
  return readPayments(payload);
};

export const readChildEnrollment = (payload) => {
  const data = readDataEnvelope(
    payload,
    isRecord,
    "Invalid child enrollment response",
  );

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

export const readSubscriptionCheckoutIntent = (payload) => {
  const data = readDataEnvelope(
    payload,
    isRecord,
    "Invalid subscription checkout response",
  );
  const message = typeof payload?.message === "string" ? payload.message.trim() : "";

  if (!message) {
    throw new Error("Invalid subscription checkout response");
  }

  return {
    message,
    subscription: data.subscription,
  };
};

export const readSubscriptionActivation = (payload) => {
  const data = readDataEnvelope(
    payload,
    isRecord,
    "Invalid subscription activation response",
  );
  const message = typeof payload?.message === "string" ? payload.message.trim() : "";

  if (!message) {
    throw new Error("Invalid subscription activation response");
  }

  return {
    message,
    subscription: data.subscription,
    enrolledChildren: ensureArray(data.enrolledChildren),
    courses: ensureArray(data.courses),
  };
};

export const activateSubscription = async (body) => {
  const payload = await sendSessionJson("/subscriptions/activate", {
    method: "POST",
    body,
  });

  return readSubscriptionActivation(payload);
};

export const createSubscriptionCheckoutIntent = async (body) => {
  const payload = await sendSessionJson("/subscriptions/checkout-intents", {
    method: "POST",
    body,
  });

  return readSubscriptionCheckoutIntent(payload);
};

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

export const verifyChildPin = async ({ childId, pin, force = false }) => {
  const payload = await sendSessionJson(`/children/${childId}/pin/verify`, {
    method: "POST",
    body: {
      pin,
      force,
    },
  });

  return readChildSessionVerification(payload);
};

export const resetChildPin = ({ childId, newPin }) =>
  sendSessionJson(`/children/${childId}/pin/reset`, {
    method: "POST",
    body: { newPin },
  });
