import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import Accueil from './pages/Accueil';
import Search from './pages/Search';

// Components
import Header from './components/homePage/Header'
import ShoppingBag from './components/homePage/ShoppingBag'
import Footer from './components/homePage/Footer'
import Login from './components/users/Login';
import Register from './components/users/Register';
import DetailedProduct from './components/detailedProduct/DetailedProduct'
import Filter from './components/homePage/Filter';

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Accueil />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products/:id' element={<DetailedProduct />} />
        </Routes>
        <ShoppingBag />
        <Filter/>
        <Footer />
      </Router>
  );
}

export default App;
