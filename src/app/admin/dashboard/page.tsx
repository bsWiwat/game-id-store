"use client";
import { useEffect, useState } from "react";
import { FaDollarSign, FaShoppingCart, FaBox } from "react-icons/fa";

const Dashboard = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    fetchOrders();
    fetchTotalProducts();
  }, []);

  // ✅ ดึง Order จาก API
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
        setTotalOrders(data.length);
        setTotalSales(data.reduce((sum, order) => sum + order.totalAmount, 0)); // รวมยอดขาย
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // ✅ ดึงจำนวนสินค้าทั้งหมดจาก API
  const fetchTotalProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (Array.isArray(data)) {
        setTotalProducts(data.length);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-[#D99F2B]">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ✅ Total Sales */}
        <div className="bg-white p-6 rounded-md shadow flex items-center gap-4">
          <FaDollarSign className="text-[#D99F2B] text-4xl" />
          <div>
            <p className="text-gray-500 text-sm">Total Sales</p>
            <h2 className="text-xl font-bold">฿ {totalSales.toFixed(2)}</h2>
          </div>
        </div>

        {/* ✅ Total Orders */}
        <div className="bg-white p-6 rounded-md shadow flex items-center gap-4">
          <FaShoppingCart className="text-green-500 text-4xl" />
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h2 className="text-xl font-bold">{totalOrders}</h2>
          </div>
        </div>

        {/* ✅ Total Products */}
        <div className="bg-white p-6 rounded-md shadow flex items-center gap-4">
          <FaBox className="text-blue-500 text-4xl" />
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h2 className="text-xl font-bold">{totalProducts}</h2>
          </div>
        </div>
      </div>

      {/* ✅ Lastest Orders */}
      <div className="bg-white p-6 rounded-md shadow">
        <h2 className="text-lg font-bold mb-4">Lastest Orders</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Total (฿)</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .sort(
                (a, b) =>
                  new Date(b.createdAt.seconds * 1000).getTime() -
                  new Date(a.createdAt.seconds * 1000).getTime()
              ) // ✅ เรียงจากล่าสุด
              .slice(0, 5) // ✅ แสดงแค่ 5 ออเดอร์ล่าสุด
              .flatMap((order) =>
                order.cartItems.map((cartItem: any, index: number) => (
                  <tr key={`${order.id}-${cartItem.id}`} className="border">
                    {index === 0 && (
                      <>
                        <td
                          rowSpan={order.cartItems.length}
                          className="border p-2"
                        >
                          {order.id}
                        </td>
                        <td
                          rowSpan={order.cartItems.length}
                          className="border p-2"
                        >
                          {order.userId}
                        </td>
                        <td
                          rowSpan={order.cartItems.length}
                          className="border p-2"
                        >
                          ฿ {order.totalAmount.toFixed(2)}
                        </td>
                        <td
                          rowSpan={order.cartItems.length}
                          className="border p-2"
                        >
                          {order.status}
                        </td>
                        <td
                          rowSpan={order.cartItems.length}
                          className="border p-2"
                        >
                          {new Date(
                            order.createdAt.seconds * 1000
                          ).toLocaleString()}
                        </td>
                      </>
                    )}
                    <td className="border p-2">{cartItem.productName}</td>
                    <td className="border p-2">
                      ฿ {cartItem.price.toFixed(2)}
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

export default Dashboard;
