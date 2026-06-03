import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getCommerceItemKey,
  normalizeCommerceCartItem,
} from "../lib/commerceItems";

const calculateCartQuantity = (cart) => cart.reduce(
  (runningTotal, item) => runningTotal + (Number(item.quantity) || 0),
  0,
);

const normalizeOwnerId = (ownerId) => String(ownerId || "").trim();

export const useCartStore = create(
  persist(
    (set, get) => ({
      ownerId: null,
      cart: [],
      claimOwner: (ownerId) => {
        const nextOwnerId = normalizeOwnerId(ownerId);
        if (!nextOwnerId) {
          return;
        }

        set((state) => (
          state.ownerId && state.ownerId !== nextOwnerId
            ? { ownerId: nextOwnerId, cart: [] }
            : { ownerId: nextOwnerId }
        ));
      },
      clearOwner: () => set({ ownerId: null, cart: [] }),
      addToCart: (payload) => {
        const normalizedItem = normalizeCommerceCartItem(payload);
        if (!normalizedItem?.itemId) {
          return;
        }

        const itemKey = getCommerceItemKey(normalizedItem);
        const quantityToAdd = Number(normalizedItem.quantity) || 1;
        const existingItem = get().cart.find(
          (item) => getCommerceItemKey(item) === itemKey,
        );

        set((state) => ({
          cart: existingItem
            ? state.cart.map((item) => (
                getCommerceItemKey(item) === itemKey
                  ? { ...item, quantity: (Number(item.quantity) || 0) + quantityToAdd }
                  : item
              ))
            : [...state.cart, { ...normalizedItem, quantity: quantityToAdd }],
        }));
      },
      removeFromCart: (payload) => {
        const normalizedItem = normalizeCommerceCartItem(payload);
        if (!normalizedItem?.itemId) {
          return;
        }

        const itemKey = getCommerceItemKey(normalizedItem);

        set((state) => ({
          cart: state.cart.flatMap((item) => {
            if (getCommerceItemKey(item) !== itemKey) {
              return item;
            }

            const nextQuantity = (Number(item.quantity) || 0) - 1;
            return nextQuantity > 0 ? [{ ...item, quantity: nextQuantity }] : [];
          }),
        }));
      },
      removeItemEntirely: (payload) => {
        const normalizedItem = normalizeCommerceCartItem(payload);
        if (!normalizedItem?.itemId) {
          return;
        }

        const itemKey = getCommerceItemKey(normalizedItem);

        set((state) => ({
          cart: state.cart.filter(
            (item) => getCommerceItemKey(item) !== itemKey,
          ),
        }));
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "robotronics.cart",
      partialize: (state) => ({ ownerId: state.ownerId, cart: state.cart }),
    },
  ),
);

export const selectCart = (state) => state.cart;
export const selectCartQuantity = (state) => calculateCartQuantity(state.cart);
