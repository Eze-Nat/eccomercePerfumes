import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import CartContextProvider from "./contexts/cart/CartContextProvider.jsx";
import AuthProvider from "./contexts/auth/AuthContextProvider.jsx"; // <-- importá el AuthProvider

import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* Envuelve todo con AuthProvider */}
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
