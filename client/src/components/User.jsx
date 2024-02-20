import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const User = () => {
  return (
    <div className="authentication-box authentication-box-user">
      <div
        onClick={() => signOut(auth)}
        className="authentication-sign-out-button"
      >
        Sign Out
      </div>
    </div>
  );
};

export default User;
