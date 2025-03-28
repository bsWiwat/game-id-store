"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { useNotification } from "@/components/NotificationContext";

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const { addNotification } = useNotification();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    discountCode: "",
    paymentMethod: "credit-card",
    termsAccepted: false,
  });

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("กรุณายอมรับเงื่อนไขการใช้บริการ");
      return;
    }

    addNotification(`Payment Success - Total: ฿${total.toFixed(2)}`);

    router.push("/success");
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-12">
      <h1 className="text-2xl font-bold text-[#D99F2B] mb-6">Checkout</h1>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        {/* Left Side: Cart Details */}
        <div className="lg:w-2/3">
          <h2 className="text-xl font-bold mb-4">Cart Details</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-4 text-left">Product</th>
                <th className="border p-4 text-left">Quantity</th>
                <th className="border p-4 text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border">
                  <td className="border p-4 flex items-center gap-4">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <span>{item.name}</span>
                  </td>
                  <td className="border p-4">{item.quantity}</td>
                  <td className="border p-4">
                    {item.currency} {(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Side: Checkout Form */}
        <div className="lg:w-1/3">
          <div className="p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold mb-4">Checkout</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-1/2 p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-1/2 p-2 border rounded-md"
                  required
                />
              </div>

              <div className="flex gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-1/2 p-2 border rounded-md"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-1/2 p-2 border rounded-md"
                  required
                />
              </div>

              <input
                type="text"
                name="discountCode"
                placeholder="Discount Code (Optional)"
                value={formData.discountCode}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />

              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>฿{total.toFixed(2)}</span>
              </div>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank-transfer">Bank Transfer</option>
              </select>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="w-5 h-5"
                  required
                />
                <span>
                  ข้าพเจ้าได้อ่านและยอมรับ{" "}
                  <Link href="/terms" className="text-blue-500 underline">
                    เงื่อนไขการใช้บริการ
                  </Link>
                  *
                </span>
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-[#D99F2B] text-white py-3 rounded-md text-lg font-bold"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
