'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

const CheckoutPage = () => {
  const { totalPrice } = useCart();

  // Sample cart items (replace with dynamic data)
  const cartItems = [
    { id: 1, name: 'Product Name', price: 500, quantity: 1, image: 'https://images.pexels.com/photos/1658747/pexels-photo-1658747.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 2, name: 'Product Name', price: 500, quantity: 1, image: 'https://images.pexels.com/photos/1658747/pexels-photo-1658747.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl text-[#D99F2B] font-semibold mb-6">Checkout</h1>

        {/* Product Details Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Product Details</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-sm font-medium">฿{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-medium mb-4">Personal Details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">ชื่อ-นามสกุล</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">หมายเลขโทรศัพท์</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">อีเมล</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* Payment Method Section */}
          <div>
            <h2 className="text-lg font-medium mb-4">Payment Method</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Select Payment Method</label>
              <select className="w-full border p-2 rounded">
                <option>Credit Card</option>
                <option>PayPal</option>
                <option>Bank Transfer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-4">Order Summary</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span className="font-medium">฿{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="mt-6 text-right">
          <Link href="/success">
            <button className="bg-[#D99F2B] text-white px-6 py-2 rounded-lg">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;