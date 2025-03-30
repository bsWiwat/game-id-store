"use client";

import { uploadImage } from "@/utils/uploadImage";
import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    if (!name || !price || !image) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImage(image);

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, imageUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      alert("Product added successfully!");
      setName("");
      setPrice("");
      setImage(null);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-4 border rounded-lg">
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block border p-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="block border p-2 mb-2 w-full"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        className="block border p-2 mb-2 w-full"
      />
      <button
        onClick={handleAddProduct}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Add Product"}
      </button>
    </div>
  );
};

export default AddProduct;



