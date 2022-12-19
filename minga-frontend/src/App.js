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
import ShoppingBagProvider from "./contexts/ShoppingBagContext";
import CartProvider from "./contexts/CartContext";

function App() {
  return (
    <Router>
      <ShoppingBagProvider>
        <CartProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Accueil />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/*" element={<Admin />}></Route>
                <Route path="/:category/:slug" element={<Product />} />
                <Route path="/:category" element={<Category />} />
                <Route path="/search/:searchTerms" element={<Search />} />
              </Route>
            </Routes>
          </AuthProvider>
        </CartProvider>
      </ShoppingBagProvider>
    </Router>
  );
}

export default App;
