import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const User = ({ setCurrentStreak, setHighestStreak, setTargetStreak }) => {
  const handleSignOut = () => {
    signOut(auth);
    setCurrentStreak(null);
    setHighestStreak(null);
    setTargetStreak(null);
  };
  return (
    <div className="authentication-box authentication-box-user">
      <div onClick={handleSignOut} className="authentication-sign-out-button">
        Sign Out
      </div>
    </div>
  );
};

export default User;
