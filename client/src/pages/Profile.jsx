import React, { useContext, useEffect } from "react";
import "./Profile.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IconPencil } from "@tabler/icons-react";
import FaceCreator from "../util/FaceCreator";

const Profile = () => {
  const navigate = useNavigate();
  const { userDoc } = useContext(AuthContext);
  useEffect(() => {
    if (userDoc) {
      console.log(userDoc);
    } else {
      navigate("/");
    }
  }, [userDoc]);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {userDoc && (
        <div>
          <div className="profile-page-profile-photo-container">
            <div className="profile-page-profile-photo">
              {userDoc.photoURL !== "" ? (
                <img src={userDoc.photoURL} alt="" />
              ) : (
                <FaceCreator {...userDoc.avatar} />
              )}
              <IconPencil
                color="white"
                className="profile-page-profile-photo-edit"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
