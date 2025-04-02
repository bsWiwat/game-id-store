import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; // adjust path as necessary
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (userId) {
      // Fetch a single user by ID
      console.log("Fetching user with ID:", userId);
      const userRef = doc(db, "users", userId);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json(
        { id: userSnapshot.id, ...userSnapshot.data() },
        { status: 200 }
      );
    }

    // Fetch all users
    console.log("Fetching all users");
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

export async function PATCH(req: Request) {
  try {
    const { userId, name, surname, email, phone, userImg } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const userRef = doc(db, "users", userId);

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

export async function DELETE(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const userRef = doc(db, "users", userId);
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