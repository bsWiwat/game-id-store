"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ใช้เช็คหน้า
import { FaTachometerAlt, FaBox, FaUsers, FaCog } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname(); // ดึง path ปัจจุบัน

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
    { name: "Products", icon: <FaBox />, path: "/admin/productmanage" },
    { name: "Customers", icon: <FaUsers />, path: "/admin/customers" },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "https://console.firebase.google.com/u/0/project/game-id-strore/overview?fb_gclid=Cj0KCQiAwtu9BhC8ARIsAI9JHanepppryX_MOrNheeutyKphn9gNE8DdDOoF_aPj0pynMb6-CVQbG-8aAkhREALw_wcB",
    },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Admin</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <div
              className={`flex items-center p-3 rounded-md cursor-pointer transition-all hover:bg-gray-700 ${
                pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
