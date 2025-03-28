"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CartModal from "./CartModal";
import { useCart } from "@/components/CartContext";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart(); // ดึงข้อมูลตะกร้าจาก context
  const router = useRouter();

  const isLoggedIn = false; // เปลี่ยนเป็นตรวจสอบ session หรือ state

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {/* Profile */}
      <Image
        src="/profile.png"
        alt="Profile"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-md bg-white z-20">
          <Link href="/profile" className="block">
            Profile
          </Link>
          <div className="mt-2 cursor-pointer text-red-500">Logout</div>
        </div>
      )}

      {/* Notifications */}
      <Image
        src="/notification.png"
        alt="Notifications"
        width={22}
        height={22}
        className="cursor-pointer"
      />

      {/* Cart */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" alt="Cart" width={22} height={22} />
        {cart.length > 0 && (
          <div className="absolute -top-2 -right-3 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            {cart.length}
          </div>
        )}
      </div>

      {/* Cart Modal */}
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
