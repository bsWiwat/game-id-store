"use client";
import { createContext, useContext, useState } from "react";

type Notification = {
  id: number;
  message: string;
  timestamp: string;
  read: boolean;
};

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (message: string) => void;
  markAsRead: (id: number) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string) => {
    const newNotification = {
      id: notifications.length + 1,
      message,
      timestamp: new Date().toLocaleString(),
      read: false, // ตั้งค่าเริ่มต้นว่าไม่ได้อ่าน
    };
    setNotifications((prev) => [newNotification, ...prev]); // เก็บข้อมูลล่าสุดด้านบน
  };

  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((noti) =>
        noti.id === id ? { ...noti, read: true } : noti
      )
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
