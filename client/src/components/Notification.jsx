import React, { useState, useEffect, useContext } from "react";
import { IconBell, IconCheck, IconX } from "@tabler/icons-react";
import { AuthContext } from "../context/AuthContext";
import "./Notification.css";
import FaceCreator from "../util/FaceCreator";

const Notification = ({
  openNotif,
  setOpenNotif,
  setSearchOpen,
  setSearchUsersInfoOpen,
  acceptRequest,
  rejectRequest,
  setSearchQuery,
  setAuthenticationBoxOpen,
  authenticationBoxOpen,
}) => {
  const { currentUser, userDoc } = useContext(AuthContext);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    if (userDoc) {
      setPendingRequests(userDoc.pendingRequests);
    }
  }, [userDoc]);

  useEffect(() => {
    if (openNotif === true && authenticationBoxOpen === true) {
      setAuthenticationBoxOpen(false);
    }
  }, [openNotif]);

  return (
    <>
      <div className="notification-container">
        <div className="notification-icon">
          <IconBell
            onClick={() => {
              if (!openNotif) {
                setOpenNotif(true);
                setSearchOpen(false);
                setSearchUsersInfoOpen(false);
                setSearchQuery("");
              } else {
                setOpenNotif(false);
              }
            }}
          />
          {userDoc && userDoc.pendingRequests.length > 0 && (
            <div className="notification-red-dot"></div>
          )}
        </div>
        {openNotif && pendingRequests.length > 0 && (
          <div className="notification-dropdown">
            <div className="notification-list">
              {pendingRequests.map((request) => (
                <div key={request.id} className="notification-item">
                  <div className="notification-user-detail">
                    <div>
                      {request.photoURL !== "" ? (
                        <img
                          src={request.photoURL}
                          alt={request.displayName}
                          className="notification-avatar"
                          onClick={() => {
                            console.log(request);
                          }}
                        />
                      ) : (
                        <FaceCreator
                          {...request.avatar}
                          height={30}
                          width={30}
                        />
                      )}
                    </div>
                    <div className="notification-text">
                      <p>
                        <strong>{request.displayName}</strong> sent you a friend
                        request
                      </p>
                    </div>
                  </div>
                  <div className="notification-buttons">
                    <IconCheck
                      className="notification-accept"
                      onClick={() =>
                        acceptRequest(
                          request.id,
                          request.photoURL,
                          request.displayName,
                          request.avatar
                        )
                      }
                    />
                    <IconX
                      className="notification-reject"
                      onClick={() => rejectRequest(request.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
