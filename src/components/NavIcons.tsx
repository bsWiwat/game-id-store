"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import CartModal from "./CartModal";
import { useCart } from "@/components/CartContext";
import { useNotification } from "@/components/NotificationContext";
import LoginPopup from "./LoginPopup";
import useUserId from "@/hooks/useUserId";
import SignupPopup from "./SignupPopup";
import UserProfile from "@/components/UserProfile";
import { useUser } from "@/context/UserContext";

const NavIcons = () => {
  const { user } = useUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const { cart } = useCart();
  const { notifications, markAsRead } = useNotification(); // ดึง markAsRead จาก useNotification
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const userId = useUserId();

  // ใช้ useRef เพื่อตรวจจับการคลิกนอก Notification
  const notiRef = useRef<HTMLDivElement>(null);

  const handleProfileClick = () => {
    if (user) {
      setIsLoginOpen(false);
      setIsSignupOpen(false);
      setIsProfileOpen(!isProfileOpen);
    } else {
      setIsLoginOpen(true);
      }
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

  // ใช้ useEffect เพื่อนับจำนวนการแจ้งเตือนที่ยังไม่ได้อ่าน
  useEffect(() => {
    const unreadCount = notifications.filter((noti) => !noti.read).length;
    setUnreadNotifications(unreadCount);
  }, [notifications]);

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {/* Profile Icon */}
      <Image
        src="/profile.png"
        alt="Profile"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={() => handleProfileClick()}
      />

      {/* Profile Dropdown */}
      {isProfileOpen && user && (
        <UserProfile />
      )}

      {/* Login Popup */}
      {isLoginOpen && !user && (
        <LoginPopup
          onClose={() => {
            setIsLoginOpen(false);
            setIsSignupOpen(false);
          }}
          onSwitchToSignup={() => {
            setIsLoginOpen(false);
            setIsSignupOpen(true);
          }}
        />
      )}

      {/* Signup Popup */}
      {isSignupOpen && !user && (
        <SignupPopup
          onClose={() => {
            setIsLoginOpen(false);
            setIsSignupOpen(false);
          }}
          onSwitchToSignin={() => {
            setIsLoginOpen(true);
            setIsSignupOpen(false);
          }}
        />
      )}

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
        {unreadNotifications > 0 && (
          <div className="absolute -top-2 -right-3 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            {unreadNotifications}
          </div>
        )}
      </div>

      {/* Notification Dropdown */}
      {isNotiOpen && (
        <div
          ref={notiRef}
          className="absolute right-0 mt-2 translate-y-24 w-64 bg-white border shadow-lg rounded-lg p-2 transition-transform"
        >
          <h3 className="text-sm font-bold mb-2">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm">No notifications</p>
          ) : (
            <ul className="text-sm">
              {notifications.map((noti) => (
                <li
                  key={noti.id}
                  className={`border-b last:border-none py-1 ${
                    noti.read ? "text-gray-400" : "text-black"
                  }`}
                  onClick={() => markAsRead(noti.id)} //คลิกข้อความเพื่อทำเครื่องหมายว่าอ่านแล้ว
                >
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
      {isCartOpen && <CartModal userId={userId || ""} />}
    </div>
  );
};

export default NavIcons;







