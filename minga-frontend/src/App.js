import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";

// Pages
import Accueil from "./pages/Accueil";
import Search from "./pages/Search";
import Product from "./pages/Product";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Cart from "./pages/Checkout";

// Components
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import AdminPanel from "./components/AdminPanel";
import CartProvider from "./contexts/CartContext";
import axios from "axios";

function App() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_ENTRYPOINT}/product_categories`)
      .then((res) => {
        res.data["hydra:member"].map((obj) => {
          setCategories((categories) => [...categories, obj.name]);
        })
      })
  }, [true])

  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Accueil />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/*" element={<AdminPanel />}>
                <Route path="*" element={<AdminPanel />} />
              </Route>
              <Route path="/:category" element={<Category />} />
              <Route path="/:category/:subcategory" element={<SubCategory />} />
              {
                categories &&
                <Route
                  path={`/:category${categories.join('|')}/:subcategory/:slug`}
                  element={<Product />}
                />
              }
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
