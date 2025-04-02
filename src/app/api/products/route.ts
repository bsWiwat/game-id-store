import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// GET: Retrieve all products
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const categoryName = url.searchParams.get("categoryName");

    if (id) {
      // Fetch a single product by ID
      console.log("Fetching product with ID:", id);
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { id: docSnap.id, ...docSnap.data() },
        { status: 200 }
      );
    }

    if (categoryName) {
      try {
        console.log("Fetching products for category:", categoryName);
        const productsRef = collection(db, "products");
        const q = query(
          productsRef,
          where("categoryName", "==", categoryName),
          where("isActive", "==", true)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No products found for this category");
          return NextResponse.json(
            { error: "No products found" },
            { status: 404 }
          );
        }

        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return NextResponse.json(products, { status: 200 });
      } catch (error) {
        console.error("Error fetching products by category:", error);
        return NextResponse.json(
          { error: "Failed to fetch products" },
          { status: 500 }
        );
      }
    }

    // Fetch all active products
    console.log("Fetching all active products");
    const q = query(collection(db, "products"), where("isActive", "==", true));
    const querySnapshot = await getDocs(q);

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST: Add a new product
export async function POST(req: Request) {
  try {
    const {
      GameId: GameId,
      productName,
      price,
      coverImageUrl,
      imageUrls,
      categoryName,
      shortDescription,
      description,
    } = await req.json();

    if (!productName || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await addDoc(collection(db, "products"), {
      GameId: GameId,
      productName,
      price: parseFloat(price),
      coverImageUrl: coverImageUrl || "no-data",
      imageUrls: imageUrls || ["no-data"],
      categoryName: categoryName || "new",
      shortDescription: shortDescription || "",
      description: description || "",
      isActive: true,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Product added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const {
      id,
      GameId,
      productName,
      price,
      imageUrls,
      coverImageUrl,
      categoryName,
      shortDescription,
      description,
      isActive,
    } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const docRef = doc(db, "products", id);

    await updateDoc(docRef, {
      GameId,
      productName,
      price,
      imageUrls,
      coverImageUrl,
      categoryName,
      shortDescription,
      description,
      isActive,
    });

    return NextResponse.json(
      { message: "Product updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const docRef = doc(db, "products", id);
    await deleteDoc(docRef);

    return NextResponse.json(
      { message: "Product deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
