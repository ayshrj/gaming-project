import React, { useContext, useEffect } from "react";
import "./Profile.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FaceCreator from "../util/FaceCreator";

const Profile = ({ setUser, setSearchQuery, setSearchOpen }) => {
  const navigate = useNavigate();
  const { userDoc } = useContext(AuthContext);
  useEffect(() => {
    if (userDoc) {
      console.log(userDoc);
    } else {
      navigate("/");
    }
  }, [userDoc]);

  useEffect(() => {
    setUser(null);
    setSearchQuery("");
    setSearchOpen(false);
  }, []);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {userDoc && (
        <>
          <div className="profile-page-profile-photo-container">
            <div className="profile-page-profile-photo">
              {userDoc.photoURL !== "" ? (
                <img src={userDoc.photoURL} alt="" />
              ) : (
                <FaceCreator {...userDoc.avatar} />
              )}
            </div>
          </div>
          <div className="profile-page-username">
            <div>{userDoc.displayName}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
