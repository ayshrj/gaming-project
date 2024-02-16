import React, { useState, useEffect } from "react";
import { IconToggleLeft, IconToggleRight } from "@tabler/icons-react";

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return darkMode ? (
    <IconToggleLeft onClick={toggleDarkMode} />
  ) : (
    <IconToggleRight onClick={toggleDarkMode} />
  );
};

export default DarkModeToggle;
