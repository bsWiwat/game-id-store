import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// GET: Fetch order by ID
export async function GET(req: Request, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = await params;
    const docRef = doc(db, "orders", orderId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "order not found" }, { status: 404 });
    }

    return NextResponse.json(
      { id: docSnap.id, ...docSnap.data() },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }



}