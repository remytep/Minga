import React, { useContext, useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import Product from "./pages/Product";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Cart from "./pages/Cart";
import Success from "./pages/OrderSucess";
import Cancel from "./pages/OrderCancel";
import Shipping from "./pages/Shipping";

// Components
import Layout from "./components/Layout/Layout";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import AdminPanel from "./components/AdminPanel";
import CartProvider from "./contexts/CartContext";
import Profile from "./pages/Profile";


function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <Routes>
            <Route path="/admin/*" element={<AdminPanel />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/order/">
                <Route path="shipping" element={<Shipping />} />
                <Route path="success" element={<Success />} />
                <Route path="cancel" element={<Cancel />} />
              </Route>
              <Route path="/:category" element={<Category />} />
              <Route path="/:category/:subcategory" element={<SubCategory />} />
              <Route
                path={`/:category/:subcategory/*`}
                element={<Product />}
              />
              <Route path="/search/" element={<Search />}>
                <Route path=":searchTerms" element={<Search />} />
              </Route>
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
