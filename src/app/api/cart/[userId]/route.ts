import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
  arrayRemove,
  setDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = await params;

  try {
    console.log("Fetching cart for user:", userId);

    const cartsCollection = collection(db, "carts");
    const q = query(cartsCollection, where("userId", "==", userId));
    const docSnap = await getDocs(q);

    if (docSnap.empty) {
      return NextResponse.json(
        { message: "No cart found for this user." },
        { status: 404 }
      );
    }

    const cartItems = [];

    for (const doc of docSnap.docs) {
      const products = doc.data().products || [];

      for (const productId of products) {
        const baseUrl = request.url.split("/api")[0];
        const res = await fetch(`${baseUrl}/api/products/${productId}`);
        if (!res.ok) continue;

        const productData = await res.json();
        if (productData.isActive) {
          cartItems.push({
            id: productId,
            ...productData,
            createdAt: new Date(productData.createdAt.seconds * 1000),
          });
        }
      }
    }

    console.log("Cart document data:", cartItems);
    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = await params; // Extract userId from params

  try {
    const { productId } = await req.json(); // Extract productId from request body

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

    // Reference the user's cart
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    if (!cartSnap.exists()) {
      // Create a new cart if it doesn't exist
      await setDoc(cartRef, { userId, products: [productId] });
    } else {
      // Update the existing cart
      await updateDoc(cartRef, {
        products: arrayUnion(productId), // Add productId to the array
      });
    }

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

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = await params; // Extract userId from params

  try {
    const { productId } = await req.json(); // Extract productId from request body

    // Validate input
    if (!userId || !productId) {
      return NextResponse.json(
        { error: "User ID and Product ID are required" },
        { status: 400 }
      );
    }

    // Update the user's cart (remove productId from the array)
    const cartRef = doc(db, "carts", userId);
    await updateDoc(cartRef, {
      products: arrayRemove(productId), // Remove productId from the array
    });

    return NextResponse.json(
      { message: "Product removed from cart successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove product from cart" },
      { status: 500 }
    );
  }
}
