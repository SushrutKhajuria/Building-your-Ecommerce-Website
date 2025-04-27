import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import ProductPage from './components/ProductPage';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
