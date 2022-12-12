import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Admin from "./components/ApiPlatform";

// Pages
import Accueil from './pages/Accueil';
import Search from './pages/Search'
import DetailedProduct from './components/detailedProduct/DetailedProduct';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Components
import Header from './components/homePage/Header'
import ShoppingBag from './components/homePage/ShoppingBag'
// import Footer from './components/homePage/Footer'

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Accueil />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin/*' element={< Admin />}></Route>
          <Route path='/products/:id' element={<DetailedProduct />} />
        </Routes>
        <ShoppingBag />
      </Router>
  );
}

export default App;
