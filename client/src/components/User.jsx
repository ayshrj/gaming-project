import React, { useContext } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

const User = ({ setCurrentStreak, setHighestStreak, setTargetStreak }) => {
  const { currentUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut(auth);
    setCurrentStreak(null);
    setHighestStreak(null);
    setTargetStreak(null);
  };
  return (
    <div className="authentication-box authentication-box-user">
      <div>
        <img
          src={currentUser?.photoURL}
          alt=""
          style={{ height: "50px", width: "50px", overflow: "hidden" }}
        />
      </div>
      <div>{currentUser?.displayName}</div>
      <p style={{ fontSize: "10px" }}>{currentUser?.email}</p>
      <div onClick={handleSignOut} className="authentication-sign-out-button">
        Sign Out
      </div>
    </div>
  );
};

export default User;
