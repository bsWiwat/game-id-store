"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import CartModal from "./CartModal";
import { useCart } from "@/components/CartContext";
import { useNotification } from "@/components/NotificationContext";
import LoginPopup from "./LoginPopup";

const NavIcons = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const { cart } = useCart();
  const { notifications } = useNotification();

  // ใช้ useRef เพื่อตรวจจับการคลิกนอก Notification
  const notiRef = useRef<HTMLDivElement>(null);

  const handleProfile = () => {
    setIsLoginOpen(true);
  };

  // ตรวจจับการคลิกนอก Notification แล้วปิดมัน
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notiRef.current && !notiRef.current.contains(event.target as Node)) {
        setIsNotiOpen(false);
      }
    };

    if (isNotiOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotiOpen]);

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
      <div
        className="relative cursor-pointer"
        onClick={() => setIsNotiOpen(!isNotiOpen)}
      >
        <Image
          src="/notification.png"
          alt="Notifications"
          width={22}
          height={22}
        />
        {notifications.length > 0 && (
          <div className="absolute -top-2 -right-3 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            {notifications.length}
          </div>
        )}
      </div>

      {/* Notification Dropdown */}
      {isNotiOpen && (
        <div
          ref={notiRef}
          className="absolute right-0 mt-2 translate-y-16 w-64 bg-white border shadow-lg rounded-lg p-2 transition-transform"
        >
          <h3 className="text-sm font-bold mb-2">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm">No notifications</p>
          ) : (
            <ul className="text-sm">
              {notifications.map((noti) => (
                <li key={noti.id} className="border-b last:border-none py-1">
                  🛒 {noti.message} <br />
                  <span className="text-gray-400 text-xs">
                    {noti.timestamp}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Cart */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen(!isCartOpen)}
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
