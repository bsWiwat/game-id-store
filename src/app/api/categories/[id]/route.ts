// app/api/products/[category]/route.ts
import { db } from "@/lib/firebase"; // Adjust the import based on your project structure
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { categoryName: string } }
) {
  const { categoryName } = params;

  try {
    console.log("Fetching products for category:", categoryName);
    // Reference to the products collection
    const productsCollection = collection(db, "products");
    const q = query(productsCollection, where("category", "==", categoryName));
    const snapshot = await getDocs(q);

    // Map through the documents and extract data
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

