import { useEffect, useState } from "react";

const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const userIdCookie = cookies.find((row) => row.startsWith("userId="));
    if (userIdCookie) {
      setUserId(userIdCookie.split("=")[1]);
    }
  }, []);

  return userId;
};

export default useUserId;

/* "use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });

    return () => unsubscribe(); 
  }, []);

  return userId;
};

export default useUserId; */
