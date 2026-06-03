import { fetchBackendJson } from "./api";
import { isRecord, readDataEnvelope } from "./apiEnvelope";
import { buildChildSessionRequest } from "../utils/childSessionRequest";

export const readChildSessionVerification = (payload) => {
  const data = readDataEnvelope(
    payload,
    isRecord,
    "Invalid child session response",
  );

  return {
    message: payload.message,
    isValid: data.isValid === true,
    sessionId: data.sessionId || null,
  };
};

export const verifyChildSession = async ({ childId, sessionId }) => {
  const childSessionRequest = buildChildSessionRequest({
    method: "POST",
    childId,
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      childId,
      sessionId,
    },
  });

  if (!childSessionRequest) {
    throw new Error("Child session not found. Please re-enter the PIN.");
  }

  const payload = await fetchBackendJson(
    `/children/${childId}/session/verify`,
    childSessionRequest,
  );
  return readChildSessionVerification(payload).isValid;
};
