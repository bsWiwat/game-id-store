import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useUser } from "@/context/UserContext";

const SignupPopup = ({
  onClose,
  onSwitchToSignin,
}: {
  onClose: () => void;
  onSwitchToSignin: () => void;
}) => {
  const { setUser } = useUser();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      const userData = { name, surname, phone, email, role: "user", createdAt: new Date() };

      // Store user data in Firestore
      await setDoc(doc(db, "users", userId), userData);
      setUser({ uid: userId, ...userData });

      // Store userId in cookies
      document.cookie = `userId=${userId}; path=/`;

      onClose();
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Sign-up error:", err);
        setError(err.message || "Failed to create an account");
      } else {
        console.error("Sign-up error:", err);
        setError("Failed to create an account");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-2xl flex rounded-lg overflow-hidden relative">
        {/* Left Side - Signup Form */}
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <label className="block mb-2">Name</label>
            <input
              type="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <label className="block mb-2">Surname</label>
            <input
              type="surname"
              placeholder="Enter your surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <label className="block mb-2">Phone</label>
            <input
              type="phone"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <label className="block mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <label className="block mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />

            {error && <p className="text-red-500 text-center">{error}</p>}

            <button className="w-full bg-yellow-600 text-white py-2 rounded mb-4">
              Sign Up
            </button>
          </form>

          <div className="text-center mb-4">
            Already have an account?{" "}
            <button onClick={onSwitchToSignin} className="text-yellow-600">
              Login
            </button>
          </div>

          <div className="text-center mb-4">or</div>

          <div className="flex justify-center gap-4 mb-4">
            <button className="text-white p-2 rounded-full">
              <Image
                src="/facebook.png"
                alt="Facebook"
                width={30}
                height={30}
              />
            </button>
            <button className="text-white p-2 rounded-full">
              <Image
                src="/google-logo.png"
                alt="Google"
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
        <div className="w-1/2 relative">
          <Image
            src="/Silde_Marvel.jpg"
            alt="Signup Banner"
            width={400}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-xl text-red"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default SignupPopup;




























