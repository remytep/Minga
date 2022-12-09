import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

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
    <FilterProvider>
      <CartProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </CartProvider>
    </FilterProvider>
  </ShoppingBagProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
