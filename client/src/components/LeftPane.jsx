import React, { useEffect, useRef, useContext } from "react";
import "./LeftPane.css";
import {
  IconDeviceGamepad,
  IconUsersGroup,
  IconSettings2,
  IconLogout,
  IconLogin,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

const LeftPane = ({
  isMobileViewport,
  setLeftPaneContainerWidth,
  isLeftPaneOpen,
  setAuthenticationBoxOpen,
}) => {
  const leftpaneContainerRef = useRef(null);

  const { currentUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut(auth);
    setCurrentStreak(null);
    setHighestStreak(null);
    setTargetStreak(null);
  };
  useEffect(() => {
    if (leftpaneContainerRef.current) {
      const width = leftpaneContainerRef.current.offsetWidth;
      setLeftPaneContainerWidth(width);
      console.log("Width: ", width);
    }
  }, [isLeftPaneOpen, isMobileViewport]);

  console.log(isLeftPaneOpen);

  return (
    <div
      className={`leftpane-container ${isLeftPaneOpen ? "" : "hidden"}`}
      ref={leftpaneContainerRef}
    >
      <div className="leftpane">
        <div className="leftpane-logo-container">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="leftpane-logo">
              <IconDeviceGamepad size={50} />
              <div>NoCanDo</div>
            </div>
          </Link>
        </div>
        <div className="leftpane-options">
          <div className="leftpane-option">
            <IconUsersGroup /> Friends
          </div>
          <div className="leftpane-option">
            <IconSettings2 /> Options
          </div>
        </div>
        <div className="leftpane-user">
          <div className="leftpane-option">Help</div>
          <div className="leftpane-option">Contact Us</div>
          {/* <div className="leftpane-option" onClick={handleSignOut}> */}
          <div className="leftpane-option">
            {currentUser ? (
              <div
                style={{ display: "flex", alignContent: "center", gap: "10px" }}
                onClick={handleSignOut}
              >
                {" "}
                <IconLogout />
                Logout
              </div>
            ) : (
              <div
                style={{ display: "flex", alignContent: "center", gap: "10px" }}
                onClick={() => setAuthenticationBoxOpen(true)}
              >
                <IconLogin />
                Login
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPane;
