import React, { useEffect, useRef } from "react";
import "./LeftPane.css";
import {
  IconDeviceGamepad,
  IconUsersGroup,
  IconSettings2,
  IconLogout,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const LeftPane = ({
  isMobileViewport,
  setLeftPaneContainerWidth,
  isLeftPaneOpen,
}) => {
  const leftpaneContainerRef = useRef(null);

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
          <div className="leftpane-option">
            <IconLogout />
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPane;
