import React, { useEffect, useState } from "react";
import {
  fetchCartItems,
  addToCartAPI,
  updateCartItem,
  deleteCartItem,
} from "./cartFunctions";

interface CartComponentProps {
  userId: string;
}

const CartComponent: React.FC<CartComponentProps> = ({ userId }) => {
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCartItems = async () => {
      const items = await fetchCartItems(userId);
      setCartItems(items);
    };
    loadCartItems();
  }, [userId]);


  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CartComponent;
