import React, { useContext, useEffect } from "react";
import "./Settings.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IconPencil } from "@tabler/icons-react";
import FaceCreator from "../util/FaceCreator";

const Settings = ({ setUser, setSearchQuery, setSearchOpen }) => {
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
    <div className="setting-container">
      <h1>Settings</h1>
      {userDoc && (
        <>
          <div className="setting">
            <div>
              {userDoc.photoURL !== "" ? (
                <img src={userDoc.photoURL} alt="" />
              ) : (
                <FaceCreator {...userDoc.avatar} height={60} width={60} />
              )}
            </div>
            <div>
              <IconPencil />
            </div>
          </div>
          <div className="setting">
            <div>{userDoc.displayName}</div>
            <div>
              <IconPencil />
            </div>
          </div>
          <div className="setting">
            <div>{userDoc.email}</div>
            {/* <div>
              <IconPencil />
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
