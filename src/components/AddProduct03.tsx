"use client";
import { uploadImage } from "@/utils/uploadImage";
import { useEffect, useState } from "react";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<(File | string)[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [categories, setCategories] = useState<
    { id: string; categoryName: string }[]
  >([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data); // Assuming the API returns an array of category names
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddImageUrl = async () => {
    if (!image) {
      alert("Please upload an image!");
      return;
    }

    // Upload the image and get the URL
    const imageUrl = await uploadImage(image);
    console.log("Image URL:", imageUrl);
    setImageUrls((prev) => [...prev, imageUrl]); // Add the uploaded image URL to the images array
    setImage(null); // Reset the image input
  };

  const handleAddProduct = async () => {
    if (!productName || !price || imageUrls.length === 0) {
      alert("Please fill all fields and upload at least one image!");
      return;
    }

    setLoading(true);

    try {
      if (
        newCategory &&
        !categories.some((cat) => cat.categoryName === newCategory)
      ) {
        // If the new category doesn't exist, add it to the categories
        await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categoryName: newCategory }),
        });
      }

      const categoryToUse = newCategory || category;

      console.log("Images:", imageUrls);

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          price,
          imageUrls,
          category: categoryToUse,
          shortDescription,
          description,
          isActive,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      alert("Product added successfully!");

      setProductName("");
      setPrice("");
      setShortDescription("");
      setDescription("");
      setCategory("");
      setNewCategory("");
      setIsActive(true);
      setImageUrls([]);
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
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="block border p-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="block border p-2 mb-2 w-full"
      />
      <div className="mb-2">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            if (e.target.value !== "add-new") {
              setNewCategory(""); // Reset newCategory if an existing category is selected
            }
          }}
          className="block border p-2 w-full"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.categoryName}>
              {cat.categoryName}
            </option>
          ))}
          <option value="add-new">Add New Category</option>
        </select>
      </div>

      {category === "add-new" && (
        <input
          type="text"
          placeholder="Or add new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="block border p-2 mt-2 w-full"
        />
      )}

      <input
        type="text"
        placeholder="Short Description"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        className="block border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Full Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block border p-2 mb-2 w-full"
      />
      <div className="flex flex-wrap">
        {imageUrls.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={typeof img === "string" ? img : URL.createObjectURL(img)}
              alt={`Uploaded Image ${index + 1}`}
              className="w-24 h-24 object-cover m-2"
            />
            <button
              onClick={() => {
                const updatedImages = imageUrls.filter((_, i) => i !== index);
                setImageUrls(updatedImages);
              }}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col mb-4">
        <label
          className="mb-2 text-gray-700 font-semibold"
          htmlFor="file-upload"
        >
          Upload Image (can upload multiple)
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="block border border-gray-300 rounded-lg p-2 mb-2 w-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleAddImageUrl}
          disabled={loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out 
      ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
        >
          {loading ? "Adding..." : "Add Image"}
        </button>
      </div>
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










