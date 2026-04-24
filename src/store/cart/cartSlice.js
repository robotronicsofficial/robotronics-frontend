import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCommerceItemKey,
  normalizeCommerceCartItem,
} from "../../lib/commerceItems";

import { fetchBackendJson, getContentLoadErrorMessage } from "../../lib/api";
// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchBackendJson("/getProducts");
      return Array.isArray(data?.products) ? data.products : [];
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(getContentLoadErrorMessage(error, "Failed to load products"));
    }
  }
);

const initialState = {
  cart: [],
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const recalculateCartTotals = (state) => {
  state.totalQuantity = state.cart.reduce(
    (runningTotal, item) => runningTotal + (Number(item.quantity) || 0),
    0,
  );
  state.totalPrice = state.cart.reduce(
    (runningTotal, item) => runningTotal + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0,
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const normalizedItem = normalizeCommerceCartItem(action.payload);
      if (!normalizedItem?.itemId) {
        return;
      }

      const itemKey = getCommerceItemKey(normalizedItem);
      const existingItem = state.cart.find((item) => getCommerceItemKey(item) === itemKey);
      const quantityToAdd = Number(normalizedItem.quantity) || 1;

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
      } else {
        state.cart.push({ ...normalizedItem, quantity: quantityToAdd });
      }

      recalculateCartTotals(state);
    },

    removeFromCart: (state, action) => {
      const normalizedItem = normalizeCommerceCartItem(action.payload);
      if (!normalizedItem?.itemId) {
        return;
      }

      const itemKey = getCommerceItemKey(normalizedItem);
      const existingItem = state.cart.find((item) => getCommerceItemKey(item) === itemKey);
    
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => getCommerceItemKey(item) !== itemKey);
        }

        recalculateCartTotals(state);
      }
    },
    

    clearCart: (state) => {
      state.cart = [];
      recalculateCartTotals(state);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.error("Fetch products failed:", action.payload);
      });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
