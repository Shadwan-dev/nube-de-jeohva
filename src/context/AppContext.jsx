// src/context/AppContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const value = {
    selectedProduct,
    setSelectedProduct,
    cart,
    addToCart,
    isMenuOpen,
    setIsMenuOpen
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);