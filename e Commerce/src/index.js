import React from 'react';
import { createRoot } from 'react-dom/client'; // 👈 NEW
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // 👈 NEW
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
