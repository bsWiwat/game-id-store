'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { setTotalPrice } = useCart();

  // sample cart items(add dynamic data later!!)
  const cartItems = [
    { id: 1, name: 'Product name 1', price: 500, image: 'https://images.pexels.com/photos/1658747/pexels-photo-1658747.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 2, name: 'Product name 2', price: 500, image: 'https://images.pexels.com/photos/1658747/pexels-photo-1658747.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ];

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    setTotalPrice(totalPrice); // Set the total price in the context
  }, [totalPrice, setTotalPrice]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl text-[#D99F2B] font-semibold mb-4">Your Shopping Cart</h1>
        <div className="h-96 overflow-y-scroll">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-medium">{item.name}</h2>
                <p className="text-gray-600">฿{item.price}</p>
              </div>
              <button className="text-red-500 hover:text-red-700">Remove</button>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-lg font-semibold text-[#000000]">฿{totalPrice}</span>
          </div>
        </div>
        <div className="mt-6 text-right">
          <Link href="/checkout">
            <button className="bg-[#D99F2B] text-white px-6 py-2 rounded-lg">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;