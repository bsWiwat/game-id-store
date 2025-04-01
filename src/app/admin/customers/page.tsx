"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore"; // ✅ ใช้จาก `firebase/firestore`

const Customers = () => {
  interface User {
    id: string;
    name?: string;
    surname?: string;
    phone?: string;
    email?: string;
    role?: string;
    isActive: boolean;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isActive: doc.data().isActive ?? true,
        }));
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { isActive: !isActive });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isActive: !isActive } : user
        )
      );

      alert(`User ${!isActive ? "enabled" : "disabled"} successfully!`);
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Failed to update user status.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#D99F2B] mb-4">Customers</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">User ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Surname</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border">
                  <td className="border p-2">{user.id}</td>
                  <td className="border p-2">{user.name || "N/A"}</td>
                  <td className="border p-2">{user.surname || "N/A"}</td>
                  <td className="border p-2">{user.phone || "N/A"}</td>
                  <td className="border p-2">{user.email || "N/A"}</td>
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        user.isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => toggleUserStatus(user.id, user.isActive)}
                      className={`px-3 py-1 rounded text-white ${
                        user.role ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {user.role ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
