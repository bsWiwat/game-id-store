"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useUserId from "@/hooks/useUserId";
import { fetchCart } from "@/utils/fetchCart";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function CartPage() {
  const userId = useUserId();
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUserActive, setIsUserActive] = useState(true); // Track user status

  useEffect(() => {
    if (userId) {
      // Fetch the user's information, including their active status
      const fetchUserStatus = async () => {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setIsUserActive(userSnap.data().isActive);
        } else {
          setIsUserActive(false); // If user does not exist, consider them inactive
        }
      };

      fetchUserStatus();

      // Fetch cart items
      fetchCart(userId)
        .then(setCart)
        .finally(() => setLoading(false));
    }
  }, [userId]);

  const removeFromCart = async (productId: string) => {
    try {
      const response = await fetch(`/api/cart/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (loading) {
    return <p className="text-center">Loading cart...</p>;
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-12">
      <h1 className="text-2xl font-bold text-[#D99F2B] mb-6">Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
          <div className="lg:w-2/3">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-4 text-left">Product</th>
                  <th className="border p-4 text-left">Category</th>
                  <th className="border p-4 text-left">Price</th>
                  <th className="border p-4 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border">
                    <td className="border p-4 flex items-center gap-4">
                      <div className="w-16 h-16 relative flex-shrink-0">
                        <Image
                          src={item.coverImageUrl || "/logo.png"}
                          alt={item.productName}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <span>{item.productName}</span>
                    </td>
                    <td className="border p-4">{item.categoryName}</td>
                    <td className="border p-4">฿{item.price.toFixed(2)}</td>
                    <td className="border p-4 text-center">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-full"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:w-1/3">
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>
                  ฿{cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>
                  ฿{cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
                </span>
              </div>

              <Link href="/checkout">
                <button
                  className={`mt-4 w-full ${
                    isUserActive ? "bg-[#D99F2B]" : "bg-gray-500"
                  } text-white py-3 rounded-md text-lg font-bold`}
                  disabled={!isUserActive} // Disable the button if user is inactive
                >
                  {isUserActive ? "Proceed to Checkout" : "Account Disabled"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
