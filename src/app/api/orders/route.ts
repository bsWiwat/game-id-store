import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, writeBatch } from "firebase/firestore";

// GET: Retrieve all orders
export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST: Add a new order
export async function POST(req: Request) {
  try {
    const { userId, cartItems, totalAmount, paymentMethod } = await req.json();

    console.log(
      "Received data for new order:",
      userId,
      cartItems,
      totalAmount,
      paymentMethod
    );

    // Validate required fields
    if (
      !userId ||
      !Array.isArray(cartItems) ||
      cartItems.length === 0 ||
      !totalAmount ||
      !paymentMethod
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    // Add the order to Firestore
    const orderRef = await addDoc(collection(db, "orders"), {
      userId,
      cartItems,
      totalAmount: Number(totalAmount), // Ensure it's a number
      paymentMethod,
      status: "success",
      createdAt: new Date(),
    });

    console.log("Order created with ID:", orderRef.id);

    // Firestore Batch for Efficiency
    const batch = writeBatch(db);

    // Clear user's cart after order is placed
    const cartRef = doc(db, "carts", userId);
    batch.update(cartRef, { items: [] });

    // Update product status
    cartItems.forEach((item: { id: string }) => {
      const productRef = doc(db, "products", item.id);
      batch.update(productRef, { isActive: false });
    });

    // Commit batch updates
    await batch.commit();

    return NextResponse.json(
      { message: "Order added successfully!", orderId: orderRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding order:", error);
    return NextResponse.json({ error: "Failed to add order" }, { status: 500 });
  }
}

