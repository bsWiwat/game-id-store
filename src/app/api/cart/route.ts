import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  interface CartItem {
    productId: string;
  }

  interface Product {
    id: string;
    isActive: boolean;
    [key: string]: unknown; // Allow additional properties
  }

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    if (!cartSnap.exists()) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const cartData = cartSnap.data();

    const productIds = cartData.items.map((item: CartItem) => item.productId);

    // Fetch product details
    const productsRef = collection(db, "products");
    const productSnaps = await getDocs(productsRef);

    const products = productSnaps.docs
      .map((doc) => ({ id: doc.id, ...doc.data() } as Product))
      .filter((product) => productIds.includes(product.id) && product.isActive);

    return NextResponse.json({ items: products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}


