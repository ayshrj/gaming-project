import React, { useState } from "react";
import "./Dashboard.css";
import LeftPane from "../components/LeftPane";
import Content from "../components/Content";
import { BrowserRouter } from "react-router-dom";

const Dashboard = ({
  isMobileViewport,
  isLeftPaneOpen,
  darkMode,
  browserWindowWidth,
  currentStreak,
  highestStreak,
  targetStreak,
  setAuthenticationBoxOpen,
  leftPaneContainerWidth,
  setLeftPaneContainerWidth,
  setIsUserRegistered,
  setCurrentStreak,
  setHighestStreak,
  setTargetStreak,
  setUser,
  setSearchQuery,
  setSearchOpen,
}) => {
  return (
    <div className="dashboard">
      <LeftPane
        isMobileViewport={isMobileViewport}
        setLeftPaneContainerWidth={setLeftPaneContainerWidth}
        isLeftPaneOpen={isLeftPaneOpen}
        setAuthenticationBoxOpen={setAuthenticationBoxOpen}
        setUser={setUser}
        setSearchQuery={setSearchQuery}
      />
      <Content
        isMobileViewport={isMobileViewport}
        leftPaneContainerWidth={leftPaneContainerWidth}
        darkMode={darkMode}
        browserWindowWidth={browserWindowWidth}
        currentStreak={currentStreak}
        highestStreak={highestStreak}
        targetStreak={targetStreak}
        setIsUserRegistered={setIsUserRegistered}
        setCurrentStreak={setCurrentStreak}
        setHighestStreak={setHighestStreak}
        setTargetStreak={setTargetStreak}
        setAuthenticationBoxOpen={setAuthenticationBoxOpen}
        setUser={setUser}
        setSearchQuery={setSearchQuery}
        setSearchOpen={setSearchOpen}
      />
    </div>
  );
};

export default Dashboard;
