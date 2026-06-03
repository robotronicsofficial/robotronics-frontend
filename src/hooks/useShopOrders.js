import { useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { buildShopCartQuoteRequest } from "../lib/shopCheckout";
import { queryKeys } from "../lib/queryKeys";
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
    queryKey: queryKeys.shop.cartQuote(request.items),
    queryFn: () => requestShopCartQuote(request),
    enabled: request.items.length > 0,
    staleTime: 30_000,
    select: (payload) => payload.quote,
  });
};
