import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UserProfileForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userImg, setUserImg] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("User Profile Submitted");
  };

  return (
    <Card className="w-full max-w-md p-6 shadow-lg">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">User Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="First Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="User Image URL"
            value={userImg}
            onChange={(e) => setUserImg(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Submit Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfileForm;

