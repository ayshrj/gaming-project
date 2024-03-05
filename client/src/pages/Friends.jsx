import React, { useContext, useState, useEffect } from "react";
import "./Friends.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FaceCreator from "../util/FaceCreator";

const Friends = ({ setUser, setSearchQuery, setSearchOpen }) => {
  const navigate = useNavigate();
  const { userDoc } = useContext(AuthContext);
  useEffect(() => {
    if (userDoc) {
      console.log(userDoc.friends);
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
    <div className="friends-container">
      <h1>Friends</h1>
      {userDoc && userDoc.friends && (
        <>
          {userDoc.friends.map((friend, index) => (
            <div key={index} className="friend">
              <div>
                {friend.photoURL !== "" ? (
                  <img src={friend.photoURL} draggable="false" />
                ) : (
                  <FaceCreator {...friend.avatar} height={50} width={50} />
                )}
              </div>
              <div>{friend.displayName}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Friends;
