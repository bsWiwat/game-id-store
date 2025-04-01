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
