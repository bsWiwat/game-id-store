"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

const CartModal = ({ userId }: { userId: string }) => {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUserActive, setIsUserActive] = useState(true);

  useEffect(() => {
    if (!userId) return;

    // Fetch user active status
    const fetchUserStatus = async () => {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      setIsUserActive(userSnap.exists() ? userSnap.data().isActive : false);
    };
    fetchUserStatus();

    // Real-time listener for cart
    const cartRef = collection(db, "users", userId, "cart");
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      setCart(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [userId]);

  const removeFromCart = async (productId: string) => {
    try {
      await fetch(`/api/cart/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="w-80 absolute p-4 rounded-md shadow-lg bg-white top-12 right-0 flex flex-col gap-4 z-20">
      <h2 className="text-lg font-semibold">Shopping Cart</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : cart.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty</div>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4">
              <Image
                src={item.coverImageUrl || "/logo.png"}
                alt={item.id}
                width={64}
                height={80}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h3 className="font-semibold">{item.productName}</h3>
                  <p className="text-sm text-[#D99F2B]">฿ {item.price}</p>
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
            <span>฿{cart.reduce((total, item) => total + item.price, 0)}</span>
          </div>
          <div className="flex justify-between">
            <Link href="/cart">
              <button className="rounded-md py-2 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
            </Link>
            <Link href="/checkout">
              <button
                className={`rounded-md py-2 px-4 ${
                  isUserActive
                    ? "bg-black text-white"
                    : "bg-gray-500 text-gray-300"
                }`}
                disabled={!isUserActive}
              >
                {isUserActive ? "Check Out" : "Account Disabled"}
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModal;
