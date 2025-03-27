"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const CartModal = () => {
  const [isVisible, setIsVisible] = useState(true); //control modal visibility
  const modalRef = useRef<HTMLDivElement>(null);

  //Close modal when click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isVisible) return null; //Don't render the modal if it's not visible

  return (
    <div
      ref={modalRef}
      className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20"
    >
      {!true ? ( // Replace `true` with your cartItems condition
        <div className="text-center">Cart is empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* List */}
          <div className="flex flex-col gap-8">
            {/* Item */}
            <div className="flex gap-4">
              <Image
                src="https://images.pexels.com/photos/1658747/pexels-photo-1658747.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt=""
                width={72}
                height={96}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                {/* Top */}
                <div className="">
                  {/* Title */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm">500฿</div>
                  </div>
                  {/* Desc */}
                  <div className="text-sm text-gray-500">available</div>
                </div>
                {/* Bottom */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. 1</span>
                  <span className="text-red-500">Remove</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Image
                src="https://images.pexels.com/photos/1658747/pexels-photo-1658747.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt=""
                width={72}
                height={96}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                {/* Top */}
                <div className="">
                  {/* Title */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm">500฿</div>
                  </div>
                  {/* Desc */}
                  <div className="text-sm text-gray-500">available</div>
                </div>
                {/* Bottom */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. 1</span>
                  <span className="text-red-500">Remove</span>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">1000฿</span>
            </div>
            <p className="text-sm text-gray-500 mt-2 mb-4">
              {/* Lorem ipsum dolor, sit amet consectetur. */}
            </p>
            <div className="flex justify-between text-sm">
              <Link href="/cart">
                <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                  View Cart
                </button>
              </Link>
              <Link href="/checkout">
                <button className="rounded-md py-3 px-4 bg-black text-white">
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;