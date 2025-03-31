import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; // adjust path as necessary
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));

    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
