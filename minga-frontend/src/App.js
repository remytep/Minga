import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Accueil from "./pages/Accueil";
import Search from "./pages/Search";
import Product from "./pages/Product";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Components
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import AdminPanel from "./components/AdminPanel";
import CartProvider from "./contexts/CartContext";
import Cart from "./components/Layout/Header/cart/Cart";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Accueil />} />
              <Route path="/admin/panel/*" element={<AdminPanel />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/:category" element={<Category />} />
              <Route path="/:category/:subcategory" element={<SubCategory />} />
              <Route
                path="/:category/:subcategory/:slug"
                element={<Product />}
              />
              <Route path="/search/" element={<Search />}>
                <Route path=":searchTerms" element={<Search />} />
              </Route>
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route path="/profil" element={<Profile />} />

          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
