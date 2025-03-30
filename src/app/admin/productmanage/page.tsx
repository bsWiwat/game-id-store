"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AddProduct from "@/components/AddProduct03";
import Link from "next/link";
import { Product } from "@/models/Product";

const ProductManage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#D99F2B]">
        Product Management
      </h1>
      <AddProduct />
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Image</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border">
                <td className="border p-2">
                  <Image
                    src={product.coverImageUrl || "/logo.png"}
                    width={50}
                    height={50}
                    alt={product.productName}
                    className="rounded"
                  />
                </td>
                <td className="border p-2">{product.categoryName}</td>
                <td className="border p-2">{product.productName}</td>
                <td className="border p-2">{product.isActive ? "1" : "0"}</td>
                <td className="border p-2">฿ {product.price}</td>
                <td className="border p-2 flex gap-2">
                  <Link href={`/edit-product/${product.id}`}>
                    <button className="bg-[#D99F2B] text-white px-3 py-1 rounded">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductManage;
