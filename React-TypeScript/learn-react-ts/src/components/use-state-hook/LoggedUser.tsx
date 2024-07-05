import React, { useState } from "react";

const LoggedUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLoginUser = () => {
    setIsLoggedIn(true);
  };
  const handleLogOutUser = () => {
    setIsLoggedIn(false);
  };
  return (
    <>
      <button onClick={handleLoginUser}>Log In</button>
      <button onClick={handleLogOutUser}>Log Out</button>
      {
        isLoggedIn ? "Logged in" :" Logged Out"
      }
    </>
  );
};

export default LoggedUser;
