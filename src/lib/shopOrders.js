import { sendSessionJson } from "./api";

export const saveCheckoutAddress = (body) =>
  sendSessionJson("/addresses", {
    method: "POST",
    body,
  });

export const submitShopCheckoutIntent = (body) =>
  sendSessionJson("/shop-checkout-intents", {
    method: "POST",
    body,
  });
