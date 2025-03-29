"use client";
import Link from "next/link";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaStar,
  FaMoneyCheckAlt,
  FaStore,
  FaTags,
  FaCog,
} from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  setSelectedPage: Dispatch<SetStateAction<string>>;
}

export default function Sidebar({ setSelectedPage }: SidebarProps) {
  const [active, setActive] = useState("Dashboard");
  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
    { name: "Products", icon: <FaBox />, path: "/admin/productmanage" },
    { name: "Customers", icon: <FaUsers />, path: "/admin/customers" },
    { name: "Settings", icon: <FaCog />, path: "/admin/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Admin</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <div
              className={`flex items-center p-3 rounded-md cursor-pointer transition-all hover:bg-gray-700 ${
                active === item.name ? "bg-gray-700" : ""
              }`}
              onClick={() => setActive(item.name)}
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
