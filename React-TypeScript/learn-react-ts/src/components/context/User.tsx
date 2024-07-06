import React, { useContext } from "react";
import { AuthContext } from "./UserContext";

const User = () => {
  const authContext = useContext(AuthContext);
  console.log(authContext);
  const handleLogout = () => {
    authContext?.setUser(null);
  };

  const handleLogIn = () => {
    authContext?.setUser({
      name: "Pawan Kumar",
      email: "pawaninkhiya760@gmail.com",
    });
  };

  return (
    <>
      <button
        className="bg-red-600 py-1 px-3 rounded-sm font-semibold text-white"
        onClick={handleLogout}
      >
        LogOut
      </button>
      <button
        className="bg-green-600 py-1 px-3 rounded-sm font-semibold text-white ml-2"
        onClick={handleLogIn}
      >
        Log In
      </button>

      <div className="">
        <p>User Name : {authContext?.user?.name}</p>
        <p>User Email : {authContext?.user?.email}</p>
      </div>
    </>
  );
};

export default User;
