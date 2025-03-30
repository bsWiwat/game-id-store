"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/models/Product";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// ประกาศ Type ของ Cart Item
interface CartItem extends Product {
  quantity: number;
}

// ประกาศ Type ของ Context
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
}

// สร้าง Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider สำหรับใช้ในแอป
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ฟังก์ชันเพิ่มสินค้า
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // ฟังก์ชันลบสินค้า
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook สำหรับใช้ Context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}


const addToCartAPI = async (userId: string, product: Product) => {
  try {
    const cartRef = collection(db, "carts", userId, "products");
    await addDoc(cartRef, product);
    console.log("Product added to cart successfully!");
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

const fetchCartItems = async (userId: string) => {
  try {
    const cartRef = collection(db, "carts", userId, "products");
    const snapshot = await getDocs(cartRef);
    const cartItems = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }

};

const updateCartItem = async (userId: string, productId: string, updatedData: Partial<Product>) => {
  try {
    const productRef = doc(db, "carts", userId, "products", productId);
    await updateDoc(productRef, updatedData);
    console.log("Product updated successfully!");
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

const deleteCartItem = async (userId: string, productId: string) => {
  try {
    const productRef = doc(db, "carts", userId, "products", productId);
    await deleteDoc(productRef);
    console.log("Product removed from cart successfully!");
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }

};