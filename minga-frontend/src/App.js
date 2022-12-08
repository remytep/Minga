import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from "./components/AdminDashboard";
import Admin from "./components/ApiPlatform";

// Pages
import Accueil from './pages/Accueil';

// Components
import Header from './components/homePage/Header'
import ShoppingBag from './components/homePage/ShoppingBag'
// import Footer from './components/homePage/Footer'
import Footer from './components/homePage/Footer'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DetailedProduct from './components/detailedProduct/DetailedProduct'
import Filter from './components/homePage/Filter';
import Admin from './components/ApiPlatform';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Accueil />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products/:id' element={<DetailedProduct />} />
        <Route path='/admin/*' element={<Admin />} />
      </Routes>
      <Footer />
      <ShoppingBag />
      <Filter />
    </Router>
  );
}

export default App;
