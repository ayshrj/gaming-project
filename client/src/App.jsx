import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import ProfilePic from "./assets/ProfilePic.jfif";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { BrowserRouter } from "react-router-dom";
import CircleCursor from "./util/CircleCursor";

function App() {
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isLeftPaneOpen, setIsLeftPaneOpen] = useState(false);
  const [browserWindowWidth, setBrowserWindowWidth] = useState(null);
  const [leftpaneWidth, setLeftPaneWidth] = useState(null);
  const [leftPaneContainerWidth, setLeftPaneContainerWidth] = useState(0);
  const [searchUsersInfoOpen, setSearchUsersInfoOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "false" ? false : true
  );

  const [currentStreak, setCurrentStreak] = useState(null);
  const [highestStreak, setHighestStreak] = useState(null);
  const [targetStreak, setTargetStreak] = useState(null);
  const [authenticationBoxOpen, setAuthenticationBoxOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { userDoc } = useContext(AuthContext);

  useEffect(() => {
    if (userDoc) {
      setCurrentStreak(userDoc.currentStreak);
      setTargetStreak(userDoc.targetStreak);
      setHighestStreak(userDoc.highestStreak);
    }
  }, [userDoc]);

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
    console.log(leftpaneWidth);
  }, [leftpaneWidth]);

  useEffect(() => {
    console.log("Current Streak Updated:", currentStreak);
  }, ["Current Streak:", currentStreak]);

  return (
    <>
      <BrowserRouter>
        {/* <CircleCursor circleSize={20} /> */}
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
            authenticationBoxOpen={authenticationBoxOpen}
            setAuthenticationBoxOpen={setAuthenticationBoxOpen}
            browserWindowWidth={browserWindowWidth}
            leftPaneContainerWidth={leftPaneContainerWidth}
            searchUsersInfoOpen={searchUsersInfoOpen}
            setSearchUsersInfoOpen={setSearchUsersInfoOpen}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            user={user}
            setUser={setUser}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
          />

          <Dashboard
            isMobileViewport={isMobileViewport}
            isLeftPaneOpen={isLeftPaneOpen}
            darkMode={darkMode}
            browserWindowWidth={browserWindowWidth}
            currentStreak={currentStreak}
            highestStreak={highestStreak}
            targetStreak={targetStreak}
            setAuthenticationBoxOpen={setAuthenticationBoxOpen}
            setLeftPaneWidth={setLeftPaneWidth}
            leftPaneContainerWidth={leftPaneContainerWidth}
            setLeftPaneContainerWidth={setLeftPaneContainerWidth}
            setCurrentStreak={setCurrentStreak}
            setHighestStreak={setHighestStreak}
            setTargetStreak={setTargetStreak}
            setUser={setUser}
            setSearchQuery={setSearchQuery}
            setSearchOpen={setSearchOpen}
          />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
