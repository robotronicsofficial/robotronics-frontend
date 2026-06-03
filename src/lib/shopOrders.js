import { sendSessionJson } from "./api";

export const submitShopCheckoutIntent = (body) =>
  sendSessionJson("/shop-checkout-intents", {
    method: "POST",
    body,
  });
