import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import planReducer from "./plans/planSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { combineReducers } from "redux";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "plans"],
};

// Root reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  plans: planReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
