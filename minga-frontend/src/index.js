import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// product provideer
import ProductProvider from "./contexts/ProductContext";

// ShoppingBag provider
import ShoppingBagProvider from "./contexts/ShoppingBagContext";

// cart provider
import CartProvider from "./contexts/CartContext";
import FilterProvider from "./contexts/FilterContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ShoppingBagProvider>
    <CartProvider>
      <ProductProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
      </ProductProvider>
    </CartProvider>
  </ShoppingBagProvider>
);
