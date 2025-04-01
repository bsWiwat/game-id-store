import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "@/context/UserContext";

const LoginPopup = ({
  onClose,
  onSwitchToSignup,
}: {
  onClose: () => void;
  onSwitchToSignup: () => void;
}) => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      // Store userId in local storage or cookies
      document.cookie = `userId=${userId}; path=/`;

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setUser({
          uid: userId,
          name: userDoc.data()?.name || "",
          surname: userDoc.data()?.surname,
          email: userDoc.data()?.email || "",
          phone: userDoc.data()?.phone,
          role: userDoc.data()?.role,
        });
      }

      onClose();
      router.push("/"); // Redirect after login
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Sign-in error:", err);
        setError(err.message || "Failed to sign-in an account");
      } else {
        console.error("Sign-in error:", err);
        setError("Failed to sign-in an account");
      }
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-2xl flex rounded-lg overflow-hidden relative">
        {/* Left Side - Login Form */}
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSignIn} className="">
            <label className="block mb-2">Username</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            {error && <p className="text-red-500 text-center">{error}</p>}

            <label className="block mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <div className="flex items-center justify-between text-sm mb-4">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Remember me</span>
              </div>
              <a href="#" className="text-yellow-600">
                Forget Password?
              </a>
            </div>

            <button className="w-full bg-yellow-600 text-white py-2 rounded mb-4">
              Sign In
            </button>
          </form>
          <div className="text-center mb-4">
            Don&apos;t have an account?{" "}
            <button onClick={onSwitchToSignup} className="text-yellow-600">
              Sign Up
            </button>
          </div>

          <div className="text-center mb-4">or</div>

          <div className="flex justify-center gap-4 mb-4">
            <button className=" text-white p-2 rounded-full">
              <Image
                src="/facebook.png"
                alt="Game ID Store Logo"
                width={30}
                height={30}
              />
            </button>
            <button className=" text-white p-2 rounded-full">
              <Image
                src="/google-logo.png"
                alt="Game ID Store Logo"
                width={30}
                height={30}
              />
            </button>
          </div>

          <div className="flex justify-center">
            <Image
              src="/Game_ID_Store_Logo.svg"
              alt="Game ID Store Logo"
              width={150}
              height={50}
            />
          </div>
        </div>

        {/* Right Side - Banner */}
        <div className="w-1/2 relative  ">
          <Image
            src="/loginbanner.jpg"
            alt="Login Banner"
            width={400}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-xl text-white"
          onClick={onClose}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;

