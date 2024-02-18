import React from "react";
import "./Content.css";
import HomePage from "../pages/HomePage";
import Nonogram from "../pages/games/Nonogram";
import Sudoku from "../pages/games/Sudoku";
import Games from "../pages/Games";
import { Routes, Route, Link } from "react-router-dom";

const Content = ({
  isMobileViewport,
  leftPaneContainerWidth,
  darkMode,
  browserWindowWidth,
}) => {
  console.log("Mobile View: ", isMobileViewport);
  console.log("LeftContainerWidth: ", leftPaneContainerWidth);
  return (
    <div
      className="content"
      style={{ marginLeft: isMobileViewport ? 0 : leftPaneContainerWidth }}
    >
      <Routes>
        <Route
          path=""
          element={<HomePage darkMode={darkMode} myCurrentDays={59} />}
        />
        <Route path="/games" element={<Games />} />
        <Route
          path="games/nonogram"
          element={<Nonogram browserWindowWidth={browserWindowWidth} />}
        />
        <Route
          path="games/sudoku"
          element={<Sudoku browserWindowWidth={browserWindowWidth} />}
        />
      </Routes>
    </div>
  );
};

export default Content;
