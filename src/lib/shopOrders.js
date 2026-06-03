import { sendJson, sendSessionJson } from "./api";
import { isRecord, readDataEnvelope } from "./apiEnvelope";

export const readShopCartQuote = (payload) => {
  return readDataEnvelope(
    payload,
    (value) => isRecord(value) && isRecord(value.quote),
    "Invalid shop cart quote response",
  ).quote;
};

export const readShopCheckoutSubmission = (payload) => {
  const data = readDataEnvelope(
    payload,
    isRecord,
    "Invalid shop checkout response",
  );
  const message = typeof payload?.message === "string" ? payload.message.trim() : "";

  if (!message) {
    throw new Error("Invalid shop checkout response");
  }

  return {
    message,
    checkoutIntent: data.checkoutIntent,
    crmSyncQueued: Boolean(data.crmSyncQueued),
    crmSyncSkippedReason: data.crmSyncSkippedReason || null,
  };
};

export const requestShopCartQuote = async (body) => {
  const payload = await sendJson("/shop-checkout-intents/quote", {
    method: "POST",
    body,
  });

  return readShopCartQuote(payload);
};

export const submitShopCheckoutIntent = async (body) => {
  const payload = await sendSessionJson("/shop-checkout-intents", {
    method: "POST",
    body,
  });

  return readShopCheckoutSubmission(payload);
};
