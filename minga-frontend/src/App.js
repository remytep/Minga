import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Pages
import Accueil from "./pages/Accueil";

// Components
import Header from "./components/homePage/Header";
import ShoppingBag from "./components/homePage/ShoppingBag";
import Footer from "./components/homePage/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import DetailedProduct from "./components/detailedProduct/DetailedProduct";
import Filter from "./components/homePage/Filter";
import Admin from "./components/ApiPlatform";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/:id" element={<DetailedProduct />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
        <Footer />
        <ShoppingBag />
        <Filter />
      </AuthContextProvider>
    </Router>
  );
}

export default App;
