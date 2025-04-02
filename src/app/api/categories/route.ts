import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

// GET: Fetch all categories
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const categoryName = url.searchParams.get("categoryName");

    const categoriesCollection = collection(db, "categories");

    if (categoryName) {
      // Fetch a specific category by name
      console.log("Fetching category:", categoryName);
      const q = query(
        categoriesCollection,
        where("categoryName", "==", categoryName)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }

      const categoryData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return NextResponse.json(categoryData[0], { status: 200 });
    }

    // Fetch all categories if no query parameter is provided
    console.log("Fetching all categories");
    const snapshot = await getDocs(categoriesCollection);
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

