import { fetchSessionJson, sendSessionJson } from "./api";
import {
  ensureArray,
  normalizeChildAccessRecord,
  normalizeParentRecord,
} from "./subscription";

export const fetchCurrentParent = async () => {
  const payload = await fetchSessionJson("/parents/me");
  return payload?.parent ? normalizeParentRecord(payload.parent) : null;
};

export const fetchPayments = async () => {
  const payload = await fetchSessionJson("/getPayments");
  return Array.isArray(payload) ? payload : [];
};

export const fetchChildAccessList = async () => {
  const payload = await fetchSessionJson("/getAllChild");
  return ensureArray(payload?.childCourse).map(normalizeChildAccessRecord);
};

export const fetchChildEnrollment = (childId) =>
  fetchSessionJson(`/getChild/${childId}`);

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

export const createChildPin = (body) =>
  sendSessionJson("/AddChildData", {
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

export const verifyChildPin = ({ childId, pin }) =>
  sendSessionJson("/verifyChildPin", {
    method: "POST",
    body: {
      childId,
      pin,
    },
  });
