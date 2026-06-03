import { useMutation } from "@tanstack/react-query";
import { submitShopCheckoutIntent } from "../lib/shopOrders";

export const useSubmitShopCheckoutIntentMutation = () =>
  useMutation({
    mutationFn: submitShopCheckoutIntent,
  });
