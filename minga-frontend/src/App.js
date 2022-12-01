import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Accueil from './pages/Accueil';
import ProductDetail from './pages/ProductDetail';

// Components
import Header from './components/homePage/Header'
import ShoppingBag from './components/homePage/ShoppingBag'
import Footer from './components/homePage/Footer'

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Accueil />} />
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
        <Footer />
        <ShoppingBag />
      </Router>
    </div>
  );
}

export default App;
