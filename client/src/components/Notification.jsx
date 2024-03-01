import React, { useState, useEffect, useContext } from "react";
import { IconBell, IconPointFilled } from "@tabler/icons-react";
import { AuthContext } from "../context/AuthContext";
import "./Notification.css";

const Notification = () => {
  const { userDoc } = useContext(AuthContext);

  useEffect(() => {
    if (userDoc) {
      console.log("pending req: ", userDoc.pendingRequests);
    }
  }, [userDoc]);

  return (
    <>
      <div className="notification-icon">
        <IconBell />
        {userDoc && userDoc.pendingRequests.length > 0 && (
          <div className="notification-red-dot"></div>
        )}
      </div>
    </>
  );
};

export default Notification;
