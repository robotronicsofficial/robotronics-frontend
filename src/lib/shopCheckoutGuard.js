import { redirect } from "@tanstack/react-router";

import { queryKeys } from "./queryKeys";
import {
  buildShopCartQuoteRequest,
  hasShopCartQuoteItems,
} from "./shopCheckout";
import { requestShopCartQuote } from "./shopOrders";
import { CART_PATH } from "@/router/paths";
import { selectCart, useCartStore } from "@/stores/cartStore";

export const requireShopCartQuote = async ({ context }) => {
  const cart = selectCart(useCartStore.getState());
  const request = buildShopCartQuoteRequest({ cart });

  if (!request.items.length) {
    throw redirect({ to: CART_PATH, replace: true });
  }

  const quote = await context.queryClient.fetchQuery({
    queryKey: queryKeys.shop.cartQuote(request.items),
    queryFn: () => requestShopCartQuote(request),
    retry: false,
    staleTime: 30_000,
  }).catch(() => null);

  if (!hasShopCartQuoteItems(quote)) {
    throw redirect({ to: CART_PATH, replace: true });
  }

  return { shopCartQuote: quote };
};
