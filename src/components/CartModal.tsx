"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

const CartModal = () => {
  const { cart, removeFromCart } = useCart(); // ดึงข้อมูลตะกร้าจาก context

  return (
    <div className="w-80 absolute p-4 rounded-md shadow-lg bg-white top-12 right-0 flex flex-col gap-4 z-20">
      <h2 className="text-lg font-semibold">Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty</div>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={80}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-[#D99F2B]">
                    {item.currency} {item.price}
                  </p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <button
                  className="text-red-500 text-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>
              {cart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}{" "}
              ฿
            </span>
          </div>
          <div className="flex justify-between">
            <Link href="/cart">
              <button className="rounded-md py-2 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
            </Link>
            <Link href="/cart/checkout">
              <button className="rounded-md py-2 px-4 bg-black text-white">
                Check Out
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModal;
