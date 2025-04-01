"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import useUserId from "@/hooks/useUserId";
import { useNotification } from "@/components/NotificationContext";
import { useUser } from "@/context/UserContext";
import CreditCardForm from "@/components/CreditCardForm";
import { GameId } from "@/models/Product";
import { sendOrderEmail } from "@/utils/sendEmail/sendOrderEmail";

export default function CheckoutPage() {
  const router = useRouter();
  const { addNotification } = useNotification();
  const userId = useUserId();
  const { user } = useUser();

  const [cart, setCart] = useState<
    {
      GameId: GameId;
      id: string;
      categoryName: string;
      shortDescription: string;
      description: string;
      productName: string;
      price: number;
      coverImageUrl?: string;
      imageUrls: string[];
      createdAt: Date;
      isActive: boolean;
    }[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [creditCard, setCreditCard] = useState<{
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    firstName: user?.name || "",
    lastName: user?.surname || "",
    phone: user?.phone || "",
    email: user?.email || "",
    discountCode: "",
    paymentMethod: "credit-card",
    termsAccepted: false,
  });

  // Fetch cart data
  useEffect(() => {
    if (userId || user?.uid) {
      fetch(`/api/cart/${userId || user?.uid}`)
        .then((res) => res.json())
        .then(setCart)
        .finally(() => setLoading(false));
    }
  }, [userId || user?.uid]);

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    const checked =
      type === "checkbox" && (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert("กรุณายอมรับเงื่อนไขการใช้บริการ");
      return;
    }

    if (formData.paymentMethod === "credit-card" && !creditCard) {
      alert("กรุณาเพิ่มบัตรเครดิตของคุณก่อนทำรายการ");
      return;
    }

    try {
      // Save credit card first
      let creditCardId = null;
      let creditCardRes = null;
      if (formData.paymentMethod === "credit-card") {
        creditCardRes = await fetch(`/api/payment/credit-card/${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cardNumber: creditCard?.cardNumber,
            cardHolder: creditCard?.cardHolder,
            expiryDate: creditCard?.expiryDate,
            cvv: creditCard?.cvv,
          }),
        });

        const creditCardData = await creditCardRes.json();
        creditCardId = creditCardData?.id;
      }

      if (
        formData.paymentMethod !== "credit-card" ||
        (formData.paymentMethod === "credit-card" && creditCardRes?.ok)
      ) {
        // Place order
        const response = await fetch(`/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            cartItems: cart,
            totalAmount: total,
            paymentMethod: formData.paymentMethod,
            creditCardId, // Send saved credit card ID
          }),
        });
        if (!response.ok) throw new Error("Order failed");

        const responseData = await response.json();

        const orderData = {
          order_id: responseData.orderId,
          email: formData.email || user?.email,
          orders: cart.map((item: any) => ({
            usernameId: item.GameId.usernameId,
            passwordId: item.GameId.passwordId,
            image_url: item.coverImageUrl,
            units: 1,
            price: item.price,
          })),
          cost: {
            discount: 0,
            total: total,
          },
        };

        sendOrderEmail(orderData);
      }

      addNotification(`Payment Success - Total: ฿${total.toFixed(2)}`);
      router.push("/success");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading cart...</p>;
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-12">
      <h1 className="text-2xl font-bold text-[#D99F2B] mb-6">Checkout</h1>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        {/* Left Side: Cart Details */}
        <div className="lg:w-2/3">
          <h2 className="text-xl font-bold mb-4">Cart Details</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-4 text-left">Product</th>
                  <th className="border p-4 text-left">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border">
                    <td className="border p-4 flex items-center gap-4">
                      <div className="w-16 h-16 relative flex-shrink-0">
                        <Image
                          src={item.coverImageUrl || "/logo.png"}
                          alt={item.productName}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <span>{item.productName}</span>
                    </td>
                    <td className="border p-4">฿ {item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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

              {/* Payment Method */}
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

              {/* Credit Card Form */}
              {formData.paymentMethod === "credit-card" && (
                <CreditCardForm
                  userId={userId || user?.uid || ""}
                  creditCard={creditCard}
                  onCardUpdate={setCreditCard}
                />
              )}

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
                  <Link href="/term" className="text-blue-500 underline">
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

