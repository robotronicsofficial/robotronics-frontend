import { sendJson, sendSessionJson } from "./api";

export const requestShopCartQuote = (body) =>
  sendJson("/shop-checkout-intents/quote", {
    method: "POST",
    body,
  });

export const submitShopCheckoutIntent = (body) =>
  sendSessionJson("/shop-checkout-intents", {
    method: "POST",
    body,
  });
