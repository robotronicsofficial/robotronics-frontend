import { useMutation } from "@tanstack/react-query";
import {
  saveCheckoutAddress,
  submitShopCheckoutIntent,
} from "../lib/shopOrders";

export const useSaveCheckoutAddressMutation = () =>
  useMutation({
    mutationFn: saveCheckoutAddress,
  });

export const useSubmitShopCheckoutIntentMutation = () =>
  useMutation({
    mutationFn: submitShopCheckoutIntent,
  });
