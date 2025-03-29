import { useState } from "react";
import Image from "next/image";

const LoginPopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-2xl flex rounded-lg overflow-hidden relative">
        {/* Left Side - Login Form */}
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <label className="block mb-2">Username</label>
          <input type="text" className="w-full p-2 border rounded mb-4" />

          <label className="block mb-2">Password</label>
          <input type="password" className="w-full p-2 border rounded mb-4" />

          <div className="flex items-center justify-between text-sm mb-4">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Remember me</span>
            </div>
            <a href="#" className="text-yellow-600">
              Forget Password?
            </a>
          </div>

          <button className="w-full bg-yellow-600 text-white py-2 rounded mb-4">
            Submit
          </button>

          <div className="text-center mb-4">or</div>

          <div className="flex justify-center gap-4 mb-4">
            <button className="bg-blue-600 text-white p-2 rounded-full">
              F
            </button>
            <button className="bg-red-600 text-white p-2 rounded-full">
              G
            </button>
          </div>

          <div className="flex justify-center">
            <Image
              src="/Game_ID_Store_Logo.svg"
              alt="Game ID Store Logo"
              width={150}
              height={50}
            />
          </div>
        </div>

        {/* Right Side - Banner */}
        <div className="w-1/2 relative  ">
          <Image
            src="/loginbanner.jpg"
            alt="Login Banner"
            width={400}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-xl text-white"
          onClick={onClose}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
