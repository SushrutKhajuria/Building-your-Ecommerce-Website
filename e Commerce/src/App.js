import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import ProductPage from './components/ProductPage';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login'; 
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/store" 
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } 
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
export default App;
