// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { auth, db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { User, onAuthStateChanged } from "firebase/auth";

// interface AuthContextType {
//   user: User | null;
//   role: string | null;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   role: null,
//   loading: true,
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [role, setRole] = useState<string | null>(
//     typeof window !== "undefined" ? localStorage.getItem("role") : null
//   );
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);

//         // Check localStorage first to avoid unnecessary fetches
//         const storedRole = localStorage.getItem("role");
//         if (storedRole) {
//           setRole(storedRole);
//         } else {
//           // Fetch from Firestore if not found in localStorage
//           const userDoc = await getDoc(doc(db, "users", currentUser.uid));
//           if (userDoc.exists()) {
//             const fetchedRole = userDoc.data().role;
//             setRole(fetchedRole);
//             localStorage.setItem("role", fetchedRole); // Persist role
//           }
//         }
//       } else {
//         setUser(null);
//         setRole(null);
//         localStorage.removeItem("role"); // Only remove on logout
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, role, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

