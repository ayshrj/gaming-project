import React, { useState, useEffect, useContext } from "react";
import {
  IconAlignLeft,
  IconAlignJustified,
  IconSearch,
  IconBell,
  IconChevronDown,
  IconChevronUp,
  IconUser,
} from "@tabler/icons-react";
import "./Navbar.css";
import DarkModeToggle from "./DarkModeToggle";
import Search from "./Search";
import Login from "./Login";
import Register from "./Register";
import User from "./User";
import { AuthContext } from "../context/AuthContext";
const Navbar = ({
  setIsLeftPaneOpen,
  isLeftPaneOpen,
  isMobileViewport,
  ProfilePic,
  darkMode,
  setDarkMode,
  setCurrentStreak,
  setHighestStreak,
  setTargetStreak,
  authenticationBoxOpen,
  setAuthenticationBoxOpen,
}) => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(true);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsAtTop(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="navbar">
      <div
        className="leftpane-open-close-button"
        onClick={() => {
          setIsLeftPaneOpen(!isLeftPaneOpen);
        }}
      >
        {isLeftPaneOpen ? <IconAlignJustified /> : <IconAlignLeft />}
      </div>
      <div className="content-user-top-right-options">
        <Search />
        <div>
          <IconBell />
        </div>
        <div>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
        <div
          className="current-user"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* <img src={ProfilePic} /> */}
          {currentUser && currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="" />
          ) : (
            <IconUser />
          )}
          {!isMobileViewport && (isAtTop || isHovered) && (
            <div className="display-name">
              {currentUser && currentUser.displayName
                ? currentUser.displayName
                : "Guest"}
            </div>
          )}
          <div
            onClick={() => {
              setAuthenticationBoxOpen(!authenticationBoxOpen);
            }}
          >
            {!authenticationBoxOpen ? <IconChevronDown /> : <IconChevronUp />}
          </div>

          {authenticationBoxOpen &&
            (currentUser ? (
              <User
                setCurrentStreak={setCurrentStreak}
                setHighestStreak={setHighestStreak}
                setTargetStreak={setTargetStreak}
              />
            ) : isUserRegistered ? (
              <Login
                setIsUserRegistered={setIsUserRegistered}
                setAuthenticationBoxOpen={setAuthenticationBoxOpen}
                setCurrentStreak={setCurrentStreak}
                setHighestStreak={setHighestStreak}
                setTargetStreak={setTargetStreak}
              />
            ) : (
              <Register
                setIsUserRegistered={setIsUserRegistered}
                setAuthenticationBoxOpen={setAuthenticationBoxOpen}
                setCurrentStreak={setCurrentStreak}
                setHighestStreak={setHighestStreak}
                setTargetStreak={setTargetStreak}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
