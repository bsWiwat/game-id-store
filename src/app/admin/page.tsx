"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/app/admin/dashboard/page";
import ProductManage from "@/app/admin/productmanage/page";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
export default function AdminPanel() {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const checkAdmin = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          router.push("/");
          return;
        }

        // Fetch user role from Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          router.push("/");
        }
        setLoading(false);
      });
    };

    checkAdmin();
  }, [auth, router]);

  if (loading) return <div>Loading...</div>;

  if (!isAdmin) return null; // Prevent rendering if not admin

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar setSelectedPage={setSelectedPage} />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {selectedPage === "dashboard" && <Dashboard />}
        {selectedPage === "productmanage" && <ProductManage />}
        {/* Add other pages later */}
      </div>
    </div>
  );
}



