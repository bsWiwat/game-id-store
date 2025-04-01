import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export type UserRole = "user" | "admin";

export const signUp = async (
  email: string,
  password: string,
  role: UserRole
) => {
  return await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, role }),
    headers: { "Content-Type": "application/json" },
  });
};

export const signIn = async (email: string, password: string) => {
  return await fetch("/api/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
};

export const getUserRole = async (uid: string): Promise<UserRole | null> => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data().role as UserRole) : null;
};
