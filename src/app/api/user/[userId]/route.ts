import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; // adjust path as necessary
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userRef = doc(db, "users", params.userId);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { id: userSnapshot.id, ...userSnapshot.data() },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { name, surname, email, phone, userImg } = await req.json();
    const userRef = doc(db, "users", params.userId);

    await updateDoc(userRef, {
      name,
      surname,
      email,
      phone,
      userImg: userImg || "no-image",
    });

    return NextResponse.json(
      { message: "User updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userRef = doc(db, "users", params.userId);
    await deleteDoc(userRef);

    return NextResponse.json(
      { message: "User deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}

