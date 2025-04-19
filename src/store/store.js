import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import courseReducer from "./courses/courseSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import { combineReducers } from "redux";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "courses"],
};

// Root reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  courses: courseReducer,
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
