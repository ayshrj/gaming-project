import React, { useState, useEffect } from "react";
import "./Content.css";
import Games from "../pages/Games";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Nonogram from "../pages/games/Nonogram";
import Sudoku from "../pages/games/Sudoku";
import Chess from "../pages/games/Chess";
import Tetris from "../pages/games/Tetris";
import SnakeGame from "../pages/games/SnakeGame";
import RockPaperScissor from "../pages/games/RockPaperScissor";
import Concentration from "../pages/games/Concentration";
import MemoryGame from "../pages/games/MemoryGame";
import AvatarMaker from "../pages/AvatarMaker";
import Authentication from "../pages/Authentication";

const Content = ({
  isMobileViewport,
  leftPaneContainerWidth,
  darkMode,
  browserWindowWidth,
  currentStreak,
  highestStreak,
  targetStreak,
  setIsUserRegistered,
  setCurrentStreak,
  setHighestStreak,
  setTargetStreak,
  setAuthenticationBoxOpen,
}) => {
  return (
    <div
      className="content"
      style={{ marginLeft: isMobileViewport ? 0 : leftPaneContainerWidth }}
    >
      <Routes>
        <Route
          path=""
          element={
            <HomePage
              darkMode={darkMode}
              myCurrentDays={89}
              currentStreak={currentStreak}
              highestStreak={highestStreak}
              targetStreak={targetStreak}
              browserWindowWidth={browserWindowWidth}
            />
          }
        />
        <Route path="/games" element={<Games />} />
        <Route
          path="/login"
          element={
            <Authentication
              type={"Login"}
              setIsUserRegistered={setIsUserRegistered}
              setCurrentStreak={setCurrentStreak}
              setHighestStreak={setHighestStreak}
              setTargetStreak={setTargetStreak}
              setAuthenticationBoxOpen={setAuthenticationBoxOpen}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Authentication
              type={"Register"}
              setIsUserRegistered={setIsUserRegistered}
              setCurrentStreak={setCurrentStreak}
              setHighestStreak={setHighestStreak}
              setTargetStreak={setTargetStreak}
              setAuthenticationBoxOpen={setAuthenticationBoxOpen}
            />
          }
        />
        <Route path="/profile/avatarmaker" element={<AvatarMaker />} />
        <Route
          path="games/nonogram"
          element={<Nonogram browserWindowWidth={browserWindowWidth} />}
        />
        <Route path="games/sudoku" element={<Sudoku />} />
        <Route
          path="games/chess"
          element={<Chess browserWindowWidth={browserWindowWidth} />}
        />
        <Route
          path="games/tetris"
          element={<Tetris browserWindowWidth={browserWindowWidth} />}
        />
        <Route
          path="games/snakegame"
          element={<SnakeGame browserWindowWidth={browserWindowWidth} />}
        />
        <Route
          path="games/rockpaperscissor"
          element={<RockPaperScissor browserWindowWidth={browserWindowWidth} />}
        />
        <Route path="games/concentration" element={<Concentration />} />
        <Route path="games/memorygame" element={<MemoryGame />} />
      </Routes>
    </div>
  );
};

export default Content;
