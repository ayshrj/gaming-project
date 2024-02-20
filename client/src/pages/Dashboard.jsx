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
}) => {
  const [leftPaneContainerWidth, setLeftPaneContainerWidth] = useState(0);

  return (
    <BrowserRouter>
      <div className="dashboard">
        <LeftPane
          isMobileViewport={isMobileViewport}
          setLeftPaneContainerWidth={setLeftPaneContainerWidth}
          isLeftPaneOpen={isLeftPaneOpen}
          setAuthenticationBoxOpen={setAuthenticationBoxOpen}
        />
        <Content
          isMobileViewport={isMobileViewport}
          leftPaneContainerWidth={leftPaneContainerWidth}
          darkMode={darkMode}
          browserWindowWidth={browserWindowWidth}
          currentStreak={currentStreak}
          highestStreak={highestStreak}
          targetStreak={targetStreak}
        />
      </div>
    </BrowserRouter>
  );
};

export default Dashboard;
