"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { useEffect, useState } from "react";
import { Product } from "@/models/Product";

const CartModal = () => {
  const { cart, removeFromCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getProductDetails = (id: string) => {
    return products.find((product) => product.id === id);
  };

  return (
    <div className="w-80 absolute p-4 rounded-md shadow-lg bg-white top-12 right-0 flex flex-col gap-4 z-20">
      <h2 className="text-lg font-semibold">Shopping Cart</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : cart.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty</div>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item) => {
            const product = getProductDetails(item.id);
            return product ? (
              <div key={item.id} className="flex gap-4">
                <Image
                  src={product.coverImageUrl}
                  alt={product.id}
                  width={64}
                  height={80}
                  className="object-cover rounded-md"
                />
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <h3 className="font-semibold">{product.productName}</h3>
                    <p className="text-sm text-[#D99F2B]">฿ {product.price}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <button
                    className="text-red-500 text-sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : null;
          })}
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>
              {cart.reduce((total, item) => {
                const product = getProductDetails(item.id);
                return total + (product ? product.price * item.quantity : 0);
              }, 0)}{" "}
              ฿
            </span>
          </div>
          <div className="flex justify-between">
            <Link href="/cart">
              <button className="rounded-md py-2 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
            </Link>
            <Link href="/checkout">
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
