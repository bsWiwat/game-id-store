import { useUser } from "@/context/UserContext";
import LogoutButton from "./LogoutButton";

const UserProfile = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="w-80 absolute p-4 rounded-md shadow-lg bg-white top-12 right-0 flex flex-col gap-4 z-20">
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


