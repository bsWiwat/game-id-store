"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { Product } from "@/models/Product";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  // ดึงข้อมูลสินค้าจาก API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // แมตช์ข้อมูลสินค้าเข้ากับ cart
  const cartItems = cart.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    return product
      ? { ...product, quantity: cartItem.quantity }
      : { ...cartItem, name: "Product not found", price: 0, image: "" };
  });

  // คำนวณยอดรวม
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal; // สามารถเพิ่ม tax หรือส่วนลดได้ที่นี่

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-12">
      <h1 className="text-2xl font-bold text-[#D99F2B] mb-6">Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
          {/* Left Side: Table */}
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
                {cartItems.map((item) => (
                  <tr key={item.id} className="border">
                    <td className="border p-4 flex items-center gap-4">
                      <div className="w-16 h-16 relative flex-shrink-0">
                        {item.coverImageUrl && (
                          <Image
                            src={item.coverImageUrl}
                            alt={item.coverImageUrl}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                        )}
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

          {/* Right Side: Cart Totals */}
          <div className="lg:w-1/3">
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>฿{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>฿{total.toFixed(2)}</span>
              </div>
              <Link href="/checkout">
                <button className="mt-4 w-full bg-[#D99F2B] text-white py-3 rounded-md text-lg font-bold">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
