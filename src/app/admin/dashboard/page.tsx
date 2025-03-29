"use client";
import { FaDollarSign, FaShoppingCart, FaBox } from "react-icons/fa";

const Dashboard = () => {
  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        data: [900, 700, 1000, 1100, 800, 600, 900, 1200, 700, 950, 1050, 1150],
        backgroundColor: "#D99F2B",
      },
    ],
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-[#D99F2B]">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-md shadow flex items-center gap-4">
          <FaDollarSign className="text-[#D99F2B] text-4xl" />
          <div>
            <p className="text-gray-500 text-sm">Total Sales</p>
            <h2 className="text-xl font-bold">$19,626,058.20</h2>
          </div>
        </div>
        <div className="bg-white p-6 rounded-md shadow flex items-center gap-4">
          <FaShoppingCart className="text-green-500 text-4xl" />
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h2 className="text-xl font-bold">3290</h2>
          </div>
        </div>
        <div className="bg-white p-6 rounded-md shadow flex items-center gap-4">
          <FaBox className="text-blue-500 text-4xl" />
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h2 className="text-xl font-bold">322</h2>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-md shadow">
        <h2 className="text-lg font-bold mb-4">Sales Statistics</h2>
      </div>
    </div>
  );
};

export default Dashboard;
