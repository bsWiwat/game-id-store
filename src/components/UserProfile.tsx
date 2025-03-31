import { useUser } from "@/context/UserContext";
import LogoutButton from "./LogoutButton";

const UserProfile = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-80">
      <h2 className="text-lg font-bold">Profile</h2>
      <p>
        <strong>Name:</strong> {user.name} {user.surname}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <LogoutButton />
    </div>
  );
};

export default UserProfile;

