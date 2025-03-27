'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-2xl bg-white shadow-lg rounded-lg p-10 text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <Image
            src="/success.png" // Replace with your success icon path
            alt=""
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-[#D99F2B] mb-6">Order Successful!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase.
          <br></br> 
          Your receipt will send to your email address.
        </p>

        {/* Back to Home Button */}
        <Link href="/">
          <button className="bg-[#D99F2B] text-white px-8 py-3 text-lg rounded-lg">
            Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;