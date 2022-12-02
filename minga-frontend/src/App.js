import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Accueil from './pages/Accueil';

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
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Accueil />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products/:id' element={<DetailedProduct />} />
        </Routes>
        <Footer />
        <ShoppingBag />
        <Filter/>
      </Router>
    </div>
  );
}

export default App;
