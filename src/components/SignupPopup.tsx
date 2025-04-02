import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useUser } from "@/context/UserContext";

interface SignupPopupProps {
  onClose: () => void;
  onSwitchToSignin: () => void;
}

const SignupPopup = ({ onClose, onSwitchToSignin }: SignupPopupProps) => {
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
      const userData = {
        name,
        surname,
        phone,
        email,
        role: "user",
        createdAt: new Date(),
        isActive: true,
      };

      await setDoc(doc(db, "users", userId), userData);
      setUser({ uid: userId, ...userData });

      document.cookie = `userId=${userId}; path=/`;

      onClose();
      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create an account"
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-2xl flex rounded-lg overflow-hidden relative">
        {/* Left Side - Signup Form */}
        <div className="w-2/3 p-6 ">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Surname</label>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border rounded"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 ">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border rounded "
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-center mb-2">{error}</p>}
            <button className="w-full bg-yellow-600 text-white py-2 rounded">
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            Already have an account?{" "}
            <button onClick={onSwitchToSignin} className="text-yellow-600">
              Login
            </button>
          </div>
        </div>

        {/* Right Side - Banner */}
        <div className="w-1/3 relative">
          <Image
            src="/Silde_Marvel.jpg"
            alt="Signup Banner"
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-xl text-red-600"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default SignupPopup;


