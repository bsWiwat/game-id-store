"use client";

import Image from "next/image";
import { useState } from "react";
import CartModal from "./CartModal";
import { useCart } from "@/components/CartContext";
import LoginPopup from "./LoginPopup";

const NavIcons = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart(); // ดึงข้อมูลตะกร้าจาก context

  const handleProfile = () => {
    setIsLoginOpen(true);
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

      {/* Login Popup */}
      {isLoginOpen && <LoginPopup onClose={() => setIsLoginOpen(false)} />}

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
