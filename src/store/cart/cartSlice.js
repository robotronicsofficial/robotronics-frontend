import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async () => {
    try {
      const response = await fetch("http://localhost:8080/getProducts");
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
);

const initialState = {
  cart: [],
  items: [], // Will be populated via fetchProducts
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // const existingItem = state.cart.find((item) => item.id === action.payload.id);
      // console.log(state.cart);
      // console.log("++++++++++++++++")
      // // contotalPricesole.log(existingItem)
      
      // if (existingItem) {
      //   console.log("If")
      //   state.cart[existingItem].quantity += 1;
      // } else {
      //   console.log("<Else")

      //   state.cart.push({ ...action.payload, quantity: 1 });
      // }

      state.cart.push(action.payload );
      console.log(state.cart)

      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },
    
    removeFromCart: (state, action) => {
      const itemIndex = state.cart.findIndex((i) => i.id === action.payload.id);
      if (itemIndex !== -1) {
        state.totalQuantity -= state.cart[itemIndex].quantity;
        state.totalPrice -= state.cart[itemIndex].price * state.cart[itemIndex].quantity;
        state.cart.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
