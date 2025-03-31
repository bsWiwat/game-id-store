import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const LogoutButton = () => {
  const router = useRouter();
  const {logout } = useUser();

  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    logout();
    router.push("/");
  };

  return <button className="" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;


