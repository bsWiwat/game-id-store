import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return NextResponse.json({ user: userCredential.user }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 400 });
  }
}