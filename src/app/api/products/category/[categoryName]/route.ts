import { db } from "@/lib/firebase"; // Adjust the import based on your project
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryName: string } }
) {
  try {
    const { categoryName } = await params;

    console.log("Fetching products for category:", categoryName);
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("categoryName", "==", categoryName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No products found for this category");
      return NextResponse.json({ error: "No products found" }, { status: 404 });
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





