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
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>LogOut</button>
      <div>UserName is {user?.name}</div>
      <div>Email is {user?.email}</div>
    </div>
  );
};

export default User;
