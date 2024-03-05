import React, { useContext } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import FaceCreator from "../util/FaceCreator";

const User = ({ setCurrentStreak, setHighestStreak, setTargetStreak }) => {
  const { userDoc, currentUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut(auth);
    setCurrentStreak(null);
    setHighestStreak(null);
    setTargetStreak(null);
  };
  return (
    <div className="authentication-box authentication-box-user">
      <div>
        {userDoc.photoURL !== "" ? (
          <img
            src={currentUser?.photoURL}
            alt=""
            style={{
              height: "100px",
              width: "100px",
              overflow: "hidden",
              objectFit: "cover",
            }}
          />
        ) : (
          <FaceCreator {...userDoc.avatar} height={100} width={100} />
        )}
      </div>
      <div style={{ fontSize: "20px" }}>{currentUser?.displayName}</div>
      {/* <p style={{ fontSize: "10px" }}>{currentUser?.email}</p> */}
      <div onClick={handleSignOut} className="authentication-sign-out-button">
        Sign Out
      </div>
    </div>
  );
};

export default User;
