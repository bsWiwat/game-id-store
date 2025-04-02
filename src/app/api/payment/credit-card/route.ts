import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    console.log("Fetching credit cards for user:", userId);
    // Reference to the credit cards collection
    const creditCardsCollection = collection(db, "creditCards");
    const q = query(creditCardsCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    // Map through the documents and extract data
    const creditCard = snapshot.docs.map((doc) => ({
      idCard: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(creditCard, { status: 200 });
  } catch (error) {
    console.error("Error fetching credit cards:", error);
    return NextResponse.json(
      { error: "Failed to fetch credit cards" },
      { status: 500 }
    );
  }
}

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

