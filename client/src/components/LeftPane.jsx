import React, { useEffect, useRef, useContext } from "react";
import "./LeftPane.css";
import {
  IconUserSquare,
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
import IconNoCanDo from "../assets/IconNoCanDo.svg";
import { useNavigate } from "react-router-dom";

const LeftPane = ({
  isMobileViewport,
  setLeftPaneContainerWidth,
  isLeftPaneOpen,
  setAuthenticationBoxOpen,
  setCurrentStreak,
  setHighestStreak,
  setTargetStreak,
  setUser,
  setSearchQuery,
}) => {
  const leftpaneContainerRef = useRef(null);
  const navigate = useNavigate();

  const { userDoc, currentUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut(auth);
    setCurrentStreak(null);
    setHighestStreak(null);
    setTargetStreak(null);
    setUser(null);
    setSearchQuery("");
    setSearchOpen(false);
  };
  useEffect(() => {
    if (leftpaneContainerRef.current) {
      const width = leftpaneContainerRef.current.offsetWidth;
      setLeftPaneContainerWidth(width);
      console.log("Width: ", width);
    }
  }, [isLeftPaneOpen, isMobileViewport]);

  const Option = ({ icon, children, onClick }) => (
    <div className="leftpane-option" onClick={onClick}>
      <div style={{ display: "flex", alignContent: "center", gap: "10px" }}>
        {icon}
        {children}
      </div>
    </div>
  );

  return (
    <div
      className={`leftpane-container ${isLeftPaneOpen ? "" : "hidden"}`}
      ref={leftpaneContainerRef}
    >
      <div className="leftpane">
        <div className="leftpane-logo-container">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="leftpane-logo">
              {/* <IconDeviceGamepad size={50} /> */}
              <svg
                className="icon-no-can-do-path"
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.65 5.71875H7.35C4.4 5.71875 2 8.11875 2 11.0687V16.6488C2 19.5988 4.4 21.9988 7.35 21.9988H16.65C19.6 21.9988 22 19.5988 22 16.6488V11.0687C22 8.11875 19.6 5.71875 16.65 5.71875ZM14.5 12.0188C14.5 11.4688 14.95 11.0188 15.5 11.0188C16.05 11.0188 16.5 11.4688 16.5 12.0188C16.5 12.5688 16.05 13.0287 15.5 13.0287C14.95 13.0287 14.5 12.5888 14.5 12.0388V12.0188ZM10.13 16.0688C9.98 16.2188 9.79 16.2888 9.6 16.2888C9.41 16.2888 9.22 16.2188 9.07 16.0688L8.04 15.0387L7.05 16.0288C6.9 16.1788 6.71 16.2488 6.52 16.2488C6.33 16.2488 6.14 16.1788 5.99 16.0288C5.7 15.7388 5.7 15.2587 5.99 14.9688L6.98 13.9788L6.02 13.0188C5.73 12.7288 5.73 12.2488 6.02 11.9588C6.31 11.6688 6.79 11.6688 7.08 11.9588L8.04 12.9188L9.03 11.9288C9.32 11.6388 9.8 11.6388 10.09 11.9288C10.38 12.2188 10.38 12.6988 10.09 12.9887L9.1 13.9788L10.13 15.0088C10.42 15.2988 10.42 15.7788 10.13 16.0688ZM13.54 14.9988C12.99 14.9988 12.53 14.5488 12.53 13.9988C12.53 13.4488 12.97 12.9988 13.52 12.9988H13.54C14.09 12.9988 14.54 13.4488 14.54 13.9988C14.54 14.5488 14.1 14.9988 13.54 14.9988ZM15.5 16.9688C14.95 16.9688 14.5 16.5288 14.5 15.9788V15.9587C14.5 15.4087 14.95 14.9587 15.5 14.9587C16.05 14.9587 16.5 15.4087 16.5 15.9587C16.5 16.5087 16.06 16.9688 15.5 16.9688ZM17.48 14.9988C16.93 14.9988 16.47 14.5488 16.47 13.9988C16.47 13.4488 16.91 12.9988 17.46 12.9988H17.48C18.03 12.9988 18.48 13.4488 18.48 13.9988C18.48 14.5488 18.04 14.9988 17.48 14.9988Z" />
                <path d="M13.6394 2.71L13.6294 3.65C13.6194 4.53 12.8894 5.26 11.9994 5.26C11.8494 5.26 11.7594 5.36 11.7594 5.49C11.7594 5.62 11.8594 5.72 11.9894 5.72H10.3794C10.3694 5.65 10.3594 5.57 10.3594 5.49C10.3594 4.59 11.0894 3.86 11.9794 3.86C12.1294 3.86 12.2294 3.76 12.2294 3.63L12.2394 2.69C12.2494 2.31 12.5594 2 12.9394 2H12.9494C13.3394 2 13.6394 2.32 13.6394 2.71Z" />
              </svg>

              <div>NoCanDo</div>
            </div>
          </Link>
        </div>
        <div className="leftpane-options">
          <Option
            icon={<IconUserSquare />}
            onClick={() => {
              currentUser
                ? navigate("/profile")
                : setAuthenticationBoxOpen(true);
            }}
          >
            Profile
          </Option>
          <Option
            icon={<IconUsersGroup />}
            onClick={() => {
              currentUser
                ? navigate("/friends")
                : setAuthenticationBoxOpen(true);
            }}
          >
            Friends
          </Option>
          <Option
            icon={<IconSettings2 />}
            onClick={() => {
              currentUser
                ? navigate("/settings")
                : setAuthenticationBoxOpen(true);
            }}
          >
            Settings
          </Option>
        </div>
        <div className="leftpane-user">
          <Option>Help</Option>
          <Option>Contact Us</Option>
          {currentUser ? (
            <Option onClick={handleSignOut}>
              <IconLogout />
              Logout
            </Option>
          ) : (
            <Option onClick={() => navigate("/login")}>
              <IconLogin />
              Login
            </Option>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftPane;
