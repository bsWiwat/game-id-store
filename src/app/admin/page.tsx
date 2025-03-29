"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/app/admin/dashboard/page";
import ProductManage from "@/app/admin/productmanage/page";
export default function AdminPanel() {
  const [selectedPage, setSelectedPage] = useState("dashboard");

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
