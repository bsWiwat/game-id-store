import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, productId } = await req.json(); // Read userId & productId from body

    // Validate input
    if (!userId || !productId) {
      return NextResponse.json(
        { error: "User ID and Product ID are required" },
        { status: 400 }
      );
    }

    // Fetch product data to check if it's active
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists() || !productSnap.data().isActive) {
      return NextResponse.json(
        { error: "Product is not active or does not exist" },
        { status: 400 }
      );
    }

    // Update the user's cart (append productId to the array)
    const cartRef = doc(db, "carts", userId);
    await updateDoc(cartRef, {
      products: arrayUnion(productId), // Add productId to the array
    });

    return NextResponse.json(
      { message: "Cart updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

