import React from 'react';
import { Switch, Route } from 'react-router-dom'; 
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Navigation />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/store" component={Store} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={ContactUs} />
        </Switch>
      </main>
    </CartProvider>
  );
}

export default App;
