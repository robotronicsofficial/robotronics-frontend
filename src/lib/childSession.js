import { fetchBackendJson } from "./api";
import { buildChildSessionRequest } from "../utils/childSessionRequest";

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
  return Boolean(payload?.isValid);
};
