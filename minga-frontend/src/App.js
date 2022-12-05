import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from "./components/AdminDashboard";
import Admin from "./components/ApiPlatform";

// Pages
import Accueil from './pages/Accueil';
import DetailedProduct from './components/products/DetailedProduct';

// Components
import Header from './components/homePage/Header'
import ShoppingBag from './components/homePage/ShoppingBag'
// import Footer from './components/homePage/Footer'

function App() {
  return (
    
      <Router>
        <div>
        <Header />
        <Routes>
          <Route path='/' element={<Accueil />} />
          <Route  path='/login' element={<Login />} />
          <Route  path='/register' element={<Register />} />
          <Route path='/admin/*' element={< Admin />}></Route>
          <Route path='/products/:id' element={<DetailedProduct />} />
        </Routes>
        <ShoppingBag />
        </div>
      </Router>
  );
}

export default App;
