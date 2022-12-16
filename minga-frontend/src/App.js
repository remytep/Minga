import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Pages
import Accueil from "./pages/Accueil";
import Search from "./pages/Search";
import DetailedProduct from "./components/detailedProduct/DetailedProduct";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Components
import Header from "./components/homePage/Header";
import ShoppingBag from "./components/homePage/ShoppingBag";
import Footer from "./components/homePage/Footer";
import Filter from "./components/homePage/Filter";
import { AuthProvider } from "./contexts/AuthContext";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminPanel />}></Route>
          <Route path="/products/:slug" element={<DetailedProduct />} />
        </Routes>
        <ShoppingBag />
        <Filter />
      </AuthProvider>
    </Router>
  );
}

export default App;
