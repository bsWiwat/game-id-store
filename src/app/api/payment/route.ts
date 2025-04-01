import { addDoc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";

// POST: new credit card
export async function POST(req: Request) {
  try {
    const { userId, cardNumber, cardHolder, expiryDate, cvv } = await req.json();

    if (!userId || !cardNumber || !cardHolder || !expiryDate || !cvv) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await addDoc(collection(db, "creditCards"), {
      userId: userId,
      cardNumber,
      cardHolder,
      expiryDate,
      cvv,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Credit card added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding credit card:", error);
    return NextResponse.json(
      { error: "Failed to add credit card" },
      { status: 500 }
    );
  }
}

