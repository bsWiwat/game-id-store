import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = await params;

  try {
    console.log("Fetching products for credit card:", userId);
    // Reference to the credit cards collection
    const ordersCollection = collection(db, "creditCards");
    const q = query(ordersCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    // Map through the documents and extract data
    const creditCard = snapshot.docs.map((doc) => ({
      idCard: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(creditCard, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// PATCH: Update a credit card
export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = await params;

  try {
    const { cardNumber, cardHolder, expiryDate, cvv } = await request.json();

    if (!cardNumber || !expiryDate) {
      return NextResponse.json(
        { error: "Card number and expiry date are required" },
        { status: 400 }
      );
    }

    const ordersCollection = collection(db, "creditCards");
    const q = query(ordersCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json(
        { error: "No credit card found for this user" },
        { status: 404 }
      );
    }
    const creditCardDoc = snapshot.docs[0]; // Assuming one credit card per user
    const creditCardId = creditCardDoc.id;
    const creditCardRef = doc(db, "creditCards", creditCardId);
    await updateDoc(creditCardRef, {
      cardNumber,
      cardHolder,
      expiryDate,
      cvv,
    });
    console.log("Credit card updated successfully!");

    return NextResponse.json(
      { message: "Credit card updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating credit card:", error);
    return NextResponse.json(
      { error: "Failed to update credit card" },
      { status: 500 }
    );
  }
}

