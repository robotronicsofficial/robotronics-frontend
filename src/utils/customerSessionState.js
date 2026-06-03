import { claimShopCheckoutOwner, clearPendingCartItems, clearShopCheckout } from "@/lib/shopCheckout";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";

export const claimCustomerSessionState = (ownerId) => {
  useCartStore.getState().claimOwner(ownerId);
  useCheckoutStore.getState().claimOwner(ownerId);
  claimShopCheckoutOwner(ownerId);
};

export const clearCustomerSessionState = () => {
  useCartStore.getState().clearOwner();
  useCheckoutStore.getState().clearOwner();
  clearShopCheckout();
  clearPendingCartItems();
};
