import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./index.css";
import { store, persistor } from "./store/store.js";
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
     
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
    </AuthProvider>
  </React.StrictMode>
);
