import { useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { buildShopCartQuoteRequest } from "../lib/shopCheckout";
import {
  requestShopCartQuote,
  submitShopCheckoutIntent,
} from "../lib/shopOrders";

export const useSubmitShopCheckoutIntentMutation = () =>
  useMutation({
    mutationFn: submitShopCheckoutIntent,
  });

export const useShopCartQuoteQuery = (cart = []) => {
  const request = useMemo(
    () => buildShopCartQuoteRequest({ cart }),
    [cart],
  );

  return useQuery({
    queryKey: ["shop-cart-quote", request.items],
    queryFn: () => requestShopCartQuote(request),
    enabled: request.items.length > 0,
    staleTime: 30_000,
    select: (payload) => payload.quote,
  });
};
