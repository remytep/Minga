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

function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
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
            </Route>
          </Routes>
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
