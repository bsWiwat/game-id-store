import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// Middleware to check authentication and role
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect the `/admin` page
  if (pathname.startsWith("/admin")) {
    const userId = req.cookies.get("userId")?.value; // Get user ID from cookies (or use session)

    if (!userId) {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect if not logged in
    }

    // Fetch user role from Firestore
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists() || userSnap.data().role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect if not admin
    }
  }

  return NextResponse.next();
}

// Apply middleware to `/admin` routes only
export const config = {
  matcher: "/admin/:path*",
};

