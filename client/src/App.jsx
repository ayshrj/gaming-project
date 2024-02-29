import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import ProfilePic from "./assets/ProfilePic.jfif";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebase";

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
  const [authenticationBoxOpen, setAuthenticationBoxOpen] = useState(false);

  const { currentUser, userDoc } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();

          setCurrentStreak(userData.currentStreak);
          setTargetStreak(userData.targetStreak);
          setHighestStreak(userData.highestStreak);
        }
      }
    };

    fetchData();
  }, [currentUser]);

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
    console.log("Current Streak Updated:", currentStreak);
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
          authenticationBoxOpen={authenticationBoxOpen}
          setAuthenticationBoxOpen={setAuthenticationBoxOpen}
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
        />
      </div>
    </>
  );
}

export default App;
