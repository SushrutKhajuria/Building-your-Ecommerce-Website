import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const sanitizeEmail = (email) => {
    return email ? email.replace(/[@.]/g, '') : '';
  };

  useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        const sanitizedEmail = sanitizeEmail(user.email);
        try {
          const response = await fetch(
            `https://crudcrud.com/api/764d634f2583411287bedbea92788167/cart${sanitizedEmail}`
          );
          const data = await response.json();
          if (data) setCartItems(data);
        } catch (error) {
          console.error('Failed to fetch cart items:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCartItems();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && !isLoading) {
      const saveCartItems = async () => {
        const sanitizedEmail = sanitizeEmail(user.email);
        try {
          await fetch(
            `https://crudcrud.com/api/YOUR_CRUDCRUD_ID/cart${sanitizedEmail}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(cartItems),
            }
          );
        } catch (error) {
          console.error('Failed to save cart items:', error);
        }
      };
      saveCartItems();
    }
  }, [cartItems, user, isLoading]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartItemCount,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);