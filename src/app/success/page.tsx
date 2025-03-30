"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96">
        {/* ไอคอนเช็คถูก */}
        <div className="flex justify-center">
          <Image
            src="/checkmark.png"
            alt="Checkmark"
            width={50}
            height={50}
            priority
          />
        </div>

        {/* ข้อความแสดงผล */}
        <h1 className="text-2xl font-bold mt-4 m-10">Payment Success!</h1>
        <p className="text-lg mt-2">Thanks for using our service</p>
        <p className="text-gray-500 text-sm mt-1 m-10">
          Your receipt will be sent to your email address
        </p>

        {/* ปุ่มกลับไปหน้าแรก */}
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-2 bg-[#D99F2B] text-white font-bold rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
