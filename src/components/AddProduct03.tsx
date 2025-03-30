"use client";
import { uploadImage } from "@/utils/uploadImage";
import { useEffect, useState } from "react";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<(File | string)[]>([]);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [coverImageIndex, setCoverImageIndex] = useState<number | null>(null);
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
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // อัปโหลดรูปทั้งหมดพร้อมกัน
  const handleAddImageUrl = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      alert("Please select images!");
      return;
    }

    setLoading(true);
    try {
      const uploadedImages = await Promise.all(
        Array.from(files).map(async (file) => await uploadImage(file))
      );

      setImageUrls((prev) => [...prev, ...uploadedImages]);
      if (coverImageIndex === null) setCoverImageIndex(0);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCoverImageUpload = async (file: File | null) => {
    if (!file) return;

    setLoading(true);

    try {
      const uploadedCoverImage = await uploadImage(file);
      console.log("Uploaded Cover Image URL:", uploadedCoverImage);
      setCoverImageUrl(uploadedCoverImage);
    } catch (error) {
      console.error("Error uploading cover image:", error);
      alert("Error uploading cover image:");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    if (!productName || !price || imageUrls.length === 0 || !coverImageUrl) {
      alert("Please fill all fields and upload images!");
      return;
    }

    setLoading(true);
    try {
      if (
        newCategory &&
        !categories.some((cat) => cat.categoryName === newCategory)
      ) {
        await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categoryName: newCategory }),
        });
      }

      const categoryToUse = newCategory || category;

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          price,
          imageUrls,
          coverImageUrl,
          category: categoryToUse,
          shortDescription,
          description,
          isActive,
        }),
      });

      if (!response.ok) throw new Error("Failed to add product");

      alert("Product added successfully!");
      setProductName("");
      setPrice("");
      setShortDescription("");
      setDescription("");
      setCategory("");
      setNewCategory("");
      setIsActive(true);
      setImageUrls([]);
      setCoverImageUrl("");
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
          onChange={(e) => {
            setNewCategory(e.target.value);
            setCategory("add-new");
          }}
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
      {/* Upload Cover Image */}
      <div className="flex flex-col mb-4">
        <label className="mb-2 text-gray-700 font-semibold">
          Upload Cover Image:
        </label>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleCoverImageUpload(e.target.files[0]);
            }
          }}
          className="block border border-gray-300 rounded-lg p-2 w-full"
        />
        {coverImageUrl && (
          <img
            src={coverImageUrl}
            alt="Cover"
            className="mt-2 w-32 h-32 object-cover border"
          />
        )}
      </div>

      {/* แสดงภาพทั้งหมด และเลือก Cover Image */}
      <div className="flex flex-wrap">
        {imageUrls.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={typeof img === "string" ? img : URL.createObjectURL(img)}
              alt={`Uploaded Image ${index + 1}`}
              className={`w-24 h-24 object-cover m-2 border-2 ${
                coverImageIndex === index
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => setCoverImageIndex(index)}
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

      {/* Upload multiple images */}
      <div className="flex flex-col mb-4">
        <label
          className="mb-2 text-gray-700 font-semibold"
          htmlFor="file-upload"
        >
          Upload Images (Multiple) :
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={(e) => handleAddImageUrl(e.target.files)}
          className="block border border-gray-300 rounded-lg p-2 mb-2 w-full"
        />
      </div>

      <button
        onClick={handleAddProduct}
        disabled={loading}
        className="bg-[#D99F2B] text-white px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Add Product"}
      </button>
    </div>
  );
};

export default AddProduct;
