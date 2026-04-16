import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getProducts`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  cart: [],
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const normalizeCartItem = (payload = {}) => {
  const _id = payload._id ?? payload.id;
  const price = Number(payload.price) || 0;
  const images = Array.isArray(payload.images)
    ? payload.images.filter(Boolean)
    : payload.thumbnail
      ? [payload.thumbnail]
      : payload.image
        ? [payload.image]
        : [];

  return {
    ...payload,
    _id,
    name: payload.name ?? payload.title ?? "Item",
    price,
    images,
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const normalizedItem = normalizeCartItem(action.payload);
      if (!normalizedItem._id) {
        return;
      }

      const existingItem = state.cart.find((item) => item._id === normalizedItem._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...normalizedItem, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += normalizedItem.price;
    },

    removeFromCart: (state, action) => {
      const normalizedItem = normalizeCartItem(action.payload);
      const existingItem = state.cart.find((item) => item._id === normalizedItem._id);
    
      if (existingItem) {
        const itemPrice = Number(existingItem.price ?? normalizedItem.price) || 0;
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalQuantity -= 1;
          state.totalPrice -= itemPrice;
        } else {
          // If quantity is 1, remove the product from cart
          state.cart = state.cart.filter((item) => item._id !== normalizedItem._id);
          state.totalQuantity -= 1;
          state.totalPrice -= itemPrice;
        }
      }
    },
    

    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
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
