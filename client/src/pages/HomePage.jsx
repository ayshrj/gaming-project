import React, { useState, useEffect } from "react";
import "./HomePage.css";
import GetRandomFact from "../util/GetRandomFact";
import CurrentBadge from "../assets/badges/hierarchical/5-Realm.png";
import Streak from "../components/Streak";
import { Link } from "react-router-dom";

const HomePage = ({ darkMode, myCurrentDays }) => {
  const [randomFact, setRandomFact] = useState("");
  const [currStreak, setCurrStreak] = useState(0);

  useEffect(() => {
    setRandomFact(GetRandomFact());
    let streakIncrement = 0;
    const interval = setInterval(() => {
      if (streakIncrement < myCurrentDays) {
        setCurrStreak(streakIncrement);
        streakIncrement++;
      } else {
        clearInterval(interval);
      }
    }, 5);

    return () => clearInterval(interval);
  }, []);

  const targetStreak = 100;

  return (
    <div>
      <div className="welcome">
        <h2>Welcome back, Ayush</h2>
        <p>{randomFact.fact}</p>
      </div>
      <div className="row">
        <div className="column">
          <div className="column-text">Badge</div>
          <img src={CurrentBadge} alt="Current Badge" />
        </div>
        <div className="column">
          <div className="column-text">Streak</div>
          <Streak
            cx={150}
            cy={135}
            rx={100}
            ry={100}
            t1={Math.PI}
            Δ={(2 * currStreak * Math.PI) / targetStreak}
            φ={0}
            stroke={"rgb(193, 82, 31)"}
            fillColor={"none"}
            strokeWidth={20}
            strokeLinecap={"round"}
            text={`${myCurrentDays}/${targetStreak}`}
            darkMode={darkMode}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Link to="/games" style={{ textDecoration: "none" }}>
            <div className="column-text">Games</div>
          </Link>

          <div className="games">
            <Link to="/games/nonogram" style={{ textDecoration: "none" }}>
              <div className="game">Nonogram</div>
            </Link>
            <Link to="/games/sudoku" style={{ textDecoration: "none" }}>
              <div className="game">Sudoku</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
