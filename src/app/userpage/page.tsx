"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import LogoutButton from "@/components/LogoutButton";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";

const UserPage = () => {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  interface Order {
    id: string;
    createdAt: { seconds: number };
    cartItems: {
      coverImageUrl?: string;
      productName?: string;
      categoryName?: string;
      price?: number;
    }[];
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserData(user.uid);
      fetchUserOrders(user.uid);
    }
  }, [user]);

  // ✅ ดึงข้อมูลผู้ใช้จาก Firestore
  const fetchUserData = async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setName(data.name || "");
        setSurname(data.surname || "");
        setPhone(data.phone || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // ✅ บันทึกข้อมูลที่แก้ไขไปยัง Firestore
  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { name, surname, phone });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ดึง Order จาก API ตาม userId
  const fetchUserOrders = async (userId: string) => {
    try {
      const res = await fetch(`/api/orders/${userId}`);
      const data = await res.json();
      if (Array.isArray(data)) setOrders(data);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  if (!user) return <p className="text-center mt-10">Please log in.</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* User Profile (25%) */}
      <div className="md:col-span-1 bg-white p-6 rounded-md shadow">
        <h2 className="text-lg font-bold mb-4">Profile</h2>
        {isEditing ? (
          <div className="flex flex-col gap-4">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <label>Surname</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleUpdateProfile}
              className="bg-[#D99F2B] text-white p-2 rounded mt-4 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white p-2 rounded mt-2 mb-4"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Surname:</strong> {surname}
            </p>
            <p>
              <strong>Phone:</strong> {phone}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white p-2 rounded mt-4 mb-4 w-full"
            >
              Edit Profile
            </button>
          </div>
        )}
        <div className="flex justify-center">
          <LogoutButton />
        </div>
      </div>

      {/* Order History (75%) */}
      <div className="md:col-span-3 bg-white p-6 rounded-md shadow">
        <h2 className="text-lg font-bold mb-4">History</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2"></th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Product</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Price (฿)</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) =>
                order.cartItems.map((cartItem: Order["cartItems"][number], index: number) => (
                  <tr key={`${order.id}-${index}`} className="border">
                    <td className="border p-2 flex items-center justify-center">                      
                      <Image
                        src={cartItem.coverImageUrl || "/default-image.png"}
                        alt="Product"
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </td>
                    <td className="border p-2">
                      {order.createdAt
                        ? new Date(
                            order.createdAt.seconds * 1000
                          ).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="border p-2">
                      {cartItem.productName || "N/A"}
                    </td>
                    <td className="border p-2">
                      {cartItem.categoryName || "N/A"}
                    </td>
                    <td className="border p-2">฿ {cartItem.price || "0.00"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserPage;
