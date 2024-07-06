import React, { useState } from "react";

const User = () => {
  const [user, setUser] = useState<authUser | null>(null);
  type authUser = {
    name: string;
    email: string;
  };
  const handleLogin = () => {
    setUser({
      name: "Pawan Kumar",
      email: "abc@gmail.com",
    });
  };
  const handleLogout = () => {
    setUser(null);
  };
  return (
    <div>
      <button className="bg-red-600 py-1 px-3 rounded-sm font-semibold text-white" onClick={handleLogin}>Login</button>
      <button className="bg-green-600 py-1 px-3 rounded-sm font-semibold text-white ml-2" onClick={handleLogout}>LogOut</button>
      <div>UserName is {user?.name}</div>
      <div>Email is {user?.email}</div>
    </div>
  );
};

export default User;
