import React, { useState, useEffect, useContext } from "react";
import "./HomePage.css";
import GetRandomFact from "../util/GetRandomFact";
import StreakColumn from "../components/StreakColumn";
import BadgeColumn from "../components/BadgeColumn";
import GamesColumn from "../components/GamesColumn";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage = ({
  darkMode,
  myCurrentDays,
  currentStreak,
  highestStreak,
  targetStreak,
  browserWindowWidth,
}) => {
  const [randomFact, setRandomFact] = useState("");

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setRandomFact(GetRandomFact());
  }, []);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  // const targetStreak = 100;

  return (
    <div>
      <div className="welcome">
        <h2>
          Welcome
          {currentUser && currentUser.displayName
            ? `back, ${currentUser.displayName}`
            : " guest"}
        </h2>
        <p>{randomFact.fact}</p>
      </div>
      <div className="row">
        <StreakColumn
          currentStreak={currentStreak}
          targetStreak={targetStreak}
          darkMode={darkMode}
        />
        <BadgeColumn highestStreak={highestStreak} />
      </div>
      <div className="row">
        <GamesColumn browserWindowWidth={browserWindowWidth} />
      </div>
    </div>
  );
};

export default HomePage;
