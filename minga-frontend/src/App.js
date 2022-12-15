import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./components/AdminPanel";

// Pages
import Accueil from "./pages/Accueil";
import Search from "./pages/Search";
import DetailedProduct from "./components/ProductPage/Product";
import Category from "./pages/Category";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Components
import Header from "./components/Layout/Header";
import ShoppingBag from "./components/Layout/ShoppingBag";
import { AuthProvider } from "./contexts/AuthContext";
import ShoppingBagProvider from "./contexts/ShoppingBagContext";
import CartProvider from "./contexts/CartContext";

function App() {
  return (
    <Router>
      <ShoppingBagProvider>
        <CartProvider>
          <AuthProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/*" element={<Admin />}></Route>
              <Route path="/:category/:slug" element={<DetailedProduct />} />
              <Route path="/:category" element={<Category />} />
            </Routes>
            <ShoppingBag />
          </AuthProvider>
        </CartProvider>
      </ShoppingBagProvider>
    </Router>
  );
}

export default App;
