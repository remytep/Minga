import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./components/AdminPanel";

// Pages
import Accueil from "./pages/Accueil";
import Search from "./pages/Search";
import Product from "./pages/Product";
import Category from "./pages/Category";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Components
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import CartProvider from "./contexts/CartContext";
import Cart from "./components/Layout/Header/cart/Cart";
import Paiement from "./components/Layout/Header/cart/Paiement";

function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Accueil />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/:category/:slug" element={<Product />} />
              <Route path="/:category" element={<Category />} />
              <Route path="/search/" element={<Search />}>
                <Route path=":searchTerms" element={<Search />} />
              </Route>
              <Route path="/cart" element={<Cart />} />
              <Route path="/paiement" element={<Paiement />} />
            </Route>
          </Routes>
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
