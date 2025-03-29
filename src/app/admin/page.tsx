// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getUserRole } from "@/lib/auth";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "@/lib/firebase";

// const AdminPage: React.FC = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (!user) {
//         router.push("/signin"); // Redirect to login if not logged in
//         return;
//       }

//       const role = await getUserRole(user.uid);
//       if (role !== "admin") {
//         router.push("/"); // Redirect if not admin
//       }

//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [router]);

//   if (loading) return <p>Loading...</p>; // Prevent flashing the admin page

//   return (
//     <div>
//       <h1>Admin Page</h1>
//       <p>Welcome, Admin!</p>
//     </div>
//   );
// };

// export default AdminPage;

"use client";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || role !== "admin")) {
      router.push("/");
    }
  }, [user, role, loading, router]);

  if (loading) return <p>Loading...</p>;

  return <h1>Welcome, Admin!</h1>;
}

