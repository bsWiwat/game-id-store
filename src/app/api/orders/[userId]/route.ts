import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = await params;

  try {
    console.log("Fetching products for category:", userId);
    // Reference to the orders collection
    const ordersCollection = collection(db, "orders");
    const q = query(ordersCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    // Map through the documents and extract data
    const orders = snapshot.docs.map((doc) => ({
      orderId: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
