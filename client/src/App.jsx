import React, { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import ProfilePic from "./assets/ProfilePic.jfif";
import Navbar from "./components/Navbar";

function App() {
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isLeftPaneOpen, setIsLeftPaneOpen] = useState(false);
  const [browserWindowWidth, setBrowserWindowWidth] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "false" ? false : true
  );

  const [currentStreak, setCurrentStreak] = useState(null);
  const [highestStreak, setHighestStreak] = useState(null);
  const [targetStreak, setTargetStreak] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setBrowserWindowWidth(windowWidth);
      setIsMobileViewport(windowWidth <= 933);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsLeftPaneOpen(!isMobileViewport);
  }, [isMobileViewport]);

  useEffect(() => {
    console.log(currentStreak);
  }, ["Current Streak:", currentStreak]);

  return (
    <>
      <div className="app">
        <Navbar
          isLeftPaneOpen={isLeftPaneOpen}
          setIsLeftPaneOpen={setIsLeftPaneOpen}
          isMobileViewport={isMobileViewport}
          ProfilePic={ProfilePic}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setCurrentStreak={setCurrentStreak}
          setHighestStreak={setHighestStreak}
          setTargetStreak={setTargetStreak}
        />

        <Dashboard
          isMobileViewport={isMobileViewport}
          isLeftPaneOpen={isLeftPaneOpen}
          darkMode={darkMode}
          browserWindowWidth={browserWindowWidth}
          currentStreak={currentStreak}
          highestStreak={highestStreak}
          targetStreak={targetStreak}
        />
      </div>
    </>
  );
}

export default App;
