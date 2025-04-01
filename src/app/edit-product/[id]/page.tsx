"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/models/Product";
import Image from "next/image";

const EditProduct = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id, ...docSnap.data() } as Product);
        } else {
          console.log("No such product!");
          router.push("/admin/productmanage");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  const handleUpdate = async () => {
    if (!product) return;
    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        GameId: product.GameId,
        productName: product.productName,
        price: product.price,
        categoryName: product.categoryName,
        description: product.description,
        shortDescription: product.shortDescription,
        imageUrls: product.imageUrls,
        coverImageUrl: product.coverImageUrl,
      });
      alert("Product updated successfully!");
      router.push("/admin/productmanage");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (!product) return;
    const newImages = product.imageUrls.filter((_, i) => i !== index);
    setProduct({ ...product, imageUrls: newImages });
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-4">
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col lg:flex-row gap-16 mt-12">
        {/* Product Images */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max ">
          <h2 className="text-xl font-bold mb-4">Product Images</h2>
          <div className="flex gap-4 flex-wrap">
            {product.coverImageUrl && (
              <div className="relative w-32 h-32">
                <Image
                  src={product.coverImageUrl}
                  width={128}
                  height={128}
                  alt="Cover Image"
                  className="rounded border"
                />
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                  onClick={() => handleRemoveImage(-1)}
                >
                  ✕
                </button>
              </div>
            )}
            {product.imageUrls.map((img, index) => (
              <div key={index} className="relative w-32 h-32">
                <Image
                  src={img}
                  width={128}
                  height={128}
                  alt={`Product Image ${index + 1}`}
                  className="rounded border"
                />
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                  onClick={() => handleRemoveImage(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div className="flex flex-col gap-8">
            <h1 className="text-2xl font-bold">GAME-{product.id}</h1>
            <p className="text-lg text-[#D99F2B]">Price: ฿ {product.price}</p>
            <div className="h-[2px] bg-gray-200" />
            <p className="text-sm">{product.shortDescription}</p>
            <div className="h-[2px] bg-gray-200" />
            <p className="text-lg">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="mt-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <strong>Username Id</strong>
        <input
          type="text"
          value={product.GameId?.usernameId || ""}
          onChange={(e) =>
            setProduct({
              ...product,
              GameId: {
                ...product.GameId,
                usernameId: e.target.value,
              },
            })
          }
          className="border p-2 w-full mb-2"
        />
        <strong>Password Id</strong>
        <input
          type="text"
          value={product.GameId?.passwordId || ""}
          onChange={(e) =>
            setProduct({
              ...product,
              GameId: {
                ...product.GameId,
                passwordId: e.target.value,
              },
            })
          }
          className="border p-2 w-full mb-2"
        />
        <strong>Product Name</strong>
        <input
          type="text"
          value={product.productName}
          onChange={(e) =>
            setProduct({ ...product, productName: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <strong>Price</strong>
        <input
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
          className="border p-2 w-full mb-2"
        />
        <strong>Category</strong>
        <input
          type="text"
          value={product.categoryName}
          onChange={(e) =>
            setProduct({ ...product, categoryName: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <strong>Short description</strong>
        <input
          type="text"
          value={product.shortDescription}
          onChange={(e) =>
            setProduct({ ...product, shortDescription: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <strong>Description</strong>
        <input
          type="text"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default EditProduct;






