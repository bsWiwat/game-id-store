"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import CartModal from "./CartModal";
import { useNotification } from "@/components/NotificationContext";
import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";
import { useUser } from "@/context/UserContext";
import { fetchCart } from "@/utils/fetchCart";
import LogoutButton from "@/components/LogoutButton";
import { useRouter } from "next/navigation";
import useUserId from "@/hooks/useUserId";
const NavIcons = () => {
  const { user } = useUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const { notifications, markAsRead } = useNotification();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const userId = useUserId();
  const [cart, setCart] = useState([]);

  // ใช้ useRef เพื่อตรวจจับการคลิกนอก Notification
  const notiRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleProfileClick = () => {
    if (user) {
      setIsLoginOpen(false);
      setIsSignupOpen(false);
      setIsProfileOpen(!isProfileOpen);
    } else {
      setIsLoginOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notiRef.current && !notiRef.current.contains(event.target as Node)) {
        setIsNotiOpen(false);
      }
    };

    if (isNotiOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotiOpen]);

  useEffect(() => {
    setUnreadNotifications(notifications.filter((noti) => !noti.read).length);
  }, [notifications]);

  useEffect(() => {
    if (userId) {
      fetchCart(userId).then(setCart);
    }
  }, [userId, user?.uid]);

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt="Profile"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfileClick}
      />
      {isProfileOpen && user && (
        <div className="absolute right-0 mt-48 w-48 bg-white border shadow-lg rounded-lg p-2 flex flex-col items-center">
          <p
            className="cursor-pointer p-2 hover:bg-gray-100 w-full text-center"
            onClick={() => router.push("/userpage")}
          >
            My Profile
          </p>
          {user.role === "admin" && (
            <p
              className="cursor-pointer p-2 mb-3 hover:bg-gray-100 w-full text-center"
              onClick={() => router.push("/admin/dashboard")}
            >
              Admin Dashboard
            </p>
          )}
          <div className="w-full flex justify-center">
            <LogoutButton />
          </div>
        </div>
      )}
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
      {isNotiOpen && (
        <div
          ref={notiRef}
          className="absolute right-0 mt-36 w-64 bg-white border shadow-lg rounded-lg p-2"
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
                  onClick={() => markAsRead(noti.id)}
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

      <div
        className="relative cursor-pointer"
        onClick={() => {
          setIsCartOpen(!isCartOpen);
        }}
      >
        <Image src="/cart.png" alt="Cart" width={22} height={22} />
        {cart.length > 0 && (
          <div className="absolute -top-2 -right-3 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            {cart.length}
          </div>
        )}
      </div>
      {isCartOpen && <CartModal userId={userId || ""} />}
    </div>
  );
};

export default NavIcons;
