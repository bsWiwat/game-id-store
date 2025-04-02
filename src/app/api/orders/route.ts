import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  writeBatch,
  query,
  where,
  getDoc,
} from "firebase/firestore";

// GET: Retrieve all orders
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const orderId = url.searchParams.get("orderId");

    const ordersCollection = collection(db, "orders");

    let snapshot;
    if (userId) {
      // Fetch orders for a specific user
      console.log("Fetching orders for user:", userId);
      const q = query(ordersCollection, where("userId", "==", userId));
      snapshot = await getDocs(q);
    } else {
      // Fetch all orders if no userId is provided
      console.log("Fetching all orders");
      snapshot = await getDocs(ordersCollection);
    }

    if (orderId) {
      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return NextResponse.json({ error: "order not found" }, { status: 404 });
      }
      
      return NextResponse.json(
        { id: docSnap.id, ...docSnap.data() },
        { status: 200 }
      );
    }

    // Map through the documents and extract data
    const orders = snapshot.docs.map((doc) => ({
      orderId: doc.id,
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

