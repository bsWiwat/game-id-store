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
  const [productCategory, setProductCategory] = useState<Product[]>([]);

  // ตรวจสอบสถานะการล็อกอิน (สมมุติว่าใช้ session หรือ state)
  const isLoggedIn = true; // แก้เป็น true หากมีระบบล็อกอินจริง

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data: Product = await response.json(); // Expecting a single product object
        console.log(data);
        setProduct(data || null); // Directly set the product

        // Fetch products based on category
        const productCategory = await fetch(
          `/api/products/category/${data.categoryName}`
        );
        const categoryData: Product[] = await productCategory.json();
        setProductCategory(categoryData || []); // Set the related products
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
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
        {/* Product Images */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max ">
          <ProductImages gallery={product.imageUrls || []} />
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div className="flex flex-col gap-8">
            {/* Show Relative path*/}
            <p className="text-sm text-gray-500">
              / {product.categoryName} / {product.productName}
            </p>
            <h2 className="text-3xl font-bold">GAME-{product.productName}</h2>
            <p className="text-lg text-[#D99F2B]">Price: ฿ {product.price}</p>
            <div className="h-[2px] bg-gray-200" />
            <p className="text-sm">{product.shortDescription}</p>
            <div className="h-[2px] bg-gray-200" />
            <p className="text-lg">{product.description}</p>
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

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-32">
        <h1 className="text-2xl font-bold mb-6">Similar Products</h1>
        <div className="flex flex-wrap gap-10 justify-center mx-5">
          {productCategory
            .filter(
              (item) =>
                item.id !== product.id &&
                item.categoryName === product.categoryName
            )
            .slice(0, 4)
            .map((product) => (
              <ProductList key={product.id} product={product} />
            ))}
        </div>
      </div>

      {/* Popup Login */}
      {isLoginOpen && <LoginPopup onClose={() => setIsLoginOpen(false)} />}
    </>
  );
}
