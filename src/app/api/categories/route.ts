import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

const categoryCollection = collection(db, "categories");

// GET: Fetch all categories
export async function GET() {
  try {
    const snapshot = await getDocs(categoryCollection);
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST: Create a new category
export async function POST(req: Request) {
  try {
    const { categoryName } = await req.json();
    if (!categoryName)
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );

    // await addDoc(categoryCollection, { categoryName });
    await addDoc(collection(db, "categories"), {
      categoryName: categoryName,
    });
    return NextResponse.json(
      { message: "Category added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding category:", error);
    return NextResponse.json(
      { error: "Failed to add category" },
      { status: 500 }
    );
  }
}







