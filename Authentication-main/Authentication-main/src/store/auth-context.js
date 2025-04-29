import React, { useState, createContext, useEffect, useCallback } from 'react';

export const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);

  const isLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setTokenExpiration(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }, []);

  const loginHandler = (token, expiresIn = 300000) => { // 5 minutes (300000ms)
    setToken(token);
    const expiration = new Date(new Date().getTime() + expiresIn);
    setTokenExpiration(expiration);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration.toISOString());
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedExpiration = localStorage.getItem('expiration');
    
    if (storedToken && storedExpiration) {
      const expiration = new Date(storedExpiration);
      if (expiration > new Date()) {
        setToken(storedToken);
        setTokenExpiration(expiration);
      } else {
        logoutHandler(); 
      }
    }
  }, [logoutHandler]);

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      const timer = setTimeout(logoutHandler, remainingTime);
      return () => clearTimeout(timer); 
    }
  }, [token, tokenExpiration, logoutHandler]);

  const contextValue = {
    token,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};