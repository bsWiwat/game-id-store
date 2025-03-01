'use client';

import React from 'react';
import Link from 'next/link';

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl text-[#D99F2B] font-semibold mb-4">Checkout</h1>
        
        {/* Checkout Details */}
        <div className="mb-6">
          <h2 className="text-l font-medium mb-2">ชื่อ-นามสกุล</h2>
          <input type="text" placeholder="" className="w-full border p-2 rounded mb-2" />
          <h2 className="text-l font-medium mb-2">หมายเลขโทรศัพท์</h2>
          <input type="email" placeholder="" className="w-full border p-2 rounded mb-2" />
          <h2 className="text-l font-medium mb-2">อีเมล</h2>
          <input type="text" placeholder="" className="w-full border p-2 rounded mb-2" />
        </div>

        {/* Payment Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Payment Method</h2>
          <select className="w-full border p-2 rounded">
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Bank Transfer</option>
          </select>
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Order Summary</h2>
          <p>Game Title - ฿860</p>
          <p className="font-semibold mt-2">Total: ฿860</p>
        </div>

        {/* Confirm Order Button */}
        <div className="mt-6 text-right">
          <button className="bg-[#D99F2B] text-white px-6 py-2 rounded-lg">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
