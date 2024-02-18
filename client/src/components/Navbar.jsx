import React, { useState, useEffect } from "react";
import {
  IconAlignLeft,
  IconAlignJustified,
  IconSearch,
  IconBell,
  IconChevronDown,
} from "@tabler/icons-react";
import "./Navbar.css";
import DarkModeToggle from "./DarkModeToggle";
import Search from "./Search";

const Navbar = ({
  setIsLeftPaneOpen,
  isLeftPaneOpen,
  isMobileViewport,
  ProfilePic,
  darkMode,
  setDarkMode,
}) => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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
          style={{ gap: "10px" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src={ProfilePic} />
          {!isMobileViewport && (isAtTop || isHovered) && (
            <div className="display-name">Ayush Raj</div>
          )}
          <IconChevronDown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
