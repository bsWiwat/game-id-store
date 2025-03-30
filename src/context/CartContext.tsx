'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  totalPrice: number;
  setTotalPrice: (price: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <CartContext.Provider value={{ totalPrice, setTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};