import { sendJson, sendSessionJson } from "./api";

export const readShopCartQuote = (payload) => {
  const quote = payload?.data?.quote;

  if (!quote || typeof quote !== "object" || Array.isArray(quote)) {
    throw new Error("Invalid shop cart quote response");
  }

  return quote;
};

export const readShopCheckoutSubmission = (payload) => {
  const data = payload?.data;
  const message = typeof payload?.message === "string" ? payload.message.trim() : "";

  if (!message || !data || typeof data !== "object" || Array.isArray(data)) {
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
