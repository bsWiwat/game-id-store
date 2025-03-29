import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// GET: Retrieve all products
export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST: Add a new product
export async function POST(req: Request) {
  try {
    const {
      productName,
      price,
      imageUrls,
      categoryName,
      shortDescription,
      description,
    } = await req.json();

    if (!productName || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await addDoc(collection(db, "products"), {
      productName,
      price: parseFloat(price),
      imageUrls: imageUrls || ["no-data"],
      categoryName: categoryName || "test",
      shortDescription: shortDescription || "",
      description: description || "",
      isActive: true,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Product added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }






}