"use client";

import { useParams } from "next/navigation";
import ProductImages from "@/components/ProductImages";
import { useEffect, useState } from "react";
import ProductList from "@/components/ProductList";
import { Product } from "@/models/Product";
import { useCart } from "@/components/CartContext";
import Link from "next/link";
import LoginPopup from "@/components/LoginPopup";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // ตรวจสอบสถานะการล็อกอิน (สมมุติว่าใช้ session หรือ state)
  const isLoggedIn = false; // แก้เป็น true หากมีระบบล็อกอินจริง

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/products.json");
      const data: Product[] = await response.json();
      console.log(data);
      const foundProduct = data.find((p) => p.id === String(id));
      setProduct(foundProduct || null);
    };
    fetchData();
  }, [id]);

  if (!product) {
    return <h1 className="text-center text-red-500">Product Not Found</h1>;
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
    } else {
      addToCart(product);
    }
  };

  return (
    <>
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col lg:flex-row gap-16 mt-12">
        {/* รูปสินค้า */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max ">
          <ProductImages gallery={product.gallery || []} />
        </div>

        {/* ข้อมูลสินค้า */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-bold">GAME-{product.id}</h1>
            <p className="text-sm">{product.description}</p>
            <div className="h-[2px] bg-gray-200" />
            <p className="text-lg text-[#D99F2B]">
              Price: {product.currency} {product.price}
            </p>
          </div>
          <div className="flex justify-between items-center w-1/2 mt-8 gap-4">
            <Link href="/cart">
              <button
                className="rounded-md bg-[#D99F2B] text-white py-3 px-4"
                onClick={handleAddToCart}
              >
                Buy now
              </button>
            </Link>
            <button
              className="rounded-md bg-black text-white py-3 px-4"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-32">
        <h1 className="text-2xl px-12 font-bold mb-6">Related Products</h1>
        <div className="flex flex-wrap gap-10 justify-start mx-5">
          {product
            ? [product].map((p) => <ProductList key={p.id} product={p} />)
            : null}
        </div>
      </div>

      {/* Popup Login */}
      {isLoginOpen && <LoginPopup onClose={() => setIsLoginOpen(false)} />}
    </>
  );
}
