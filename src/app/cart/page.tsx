'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CartPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl text-[#D99F2B] font-semibold mb-4">Your Shopping Cart</h1>
        
        {/* Sample Cart Item */}
        <div className="flex items-center border-b py-4">
          <Image
            src="/images/"
            alt="game"
            width={80}
            height={80}
            className="rounded-md"
          />
          <div className="ml-4 flex-1">
            <h2 className="text-lg font-medium">Game</h2>
            <p className="text-gray-600">฿860</p>
          </div>
          <button className="text-red-500 hover:text-red-700">Remove</button>
        </div>

        {/* Checkout Button */}
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
