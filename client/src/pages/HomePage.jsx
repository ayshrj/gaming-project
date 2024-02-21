import React, { useState, useEffect, useContext } from "react";
import "./HomePage.css";
import GetRandomFact from "../util/GetRandomFact";
import CurrentBadge1 from "../assets/badges/hierarchical/1-Hamlet.png";
import CurrentBadge2 from "../assets/badges/hierarchical/2-Barony.png";
import CurrentBadge3 from "../assets/badges/hierarchical/3-Domain.png";
import CurrentBadge4 from "../assets/badges/hierarchical/4-Province.png";
import CurrentBadge5 from "../assets/badges/hierarchical/5-Realm.png";
import CurrentBadge6 from "../assets/badges/hierarchical/6-Empire.png";
import Streak from "../components/Streak";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage = ({
  darkMode,
  myCurrentDays,
  currentStreak,
  highestStreak,
  targetStreak,
}) => {
  const [randomFact, setRandomFact] = useState("");
  const [currStreak, setCurrStreak] = useState(0);
  const [badge, setBadge] = useState(null);

  const { currentUser } = useContext(AuthContext);

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
    }, 1);

    return () => clearInterval(interval);
  }, [myCurrentDays]);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const [randomSVG, setRandomSVG] = useState(null);

  // const targetStreak = 100;

  useEffect(() => {
    const getBadge = () => {
      if (highestStreak <= 7) setBadge(CurrentBadge1);
      else if (highestStreak <= 15) setBadge(CurrentBadge2);
      else if (highestStreak <= 30) setBadge(CurrentBadge3);
      else if (highestStreak <= 60) setBadge(CurrentBadge4);
      else if (highestStreak <= 120) setBadge(CurrentBadge5);
      else setBadge(CurrentBadge6);
    };

    getBadge();
  }, [highestStreak]);

  return (
    <div>
      <div className="welcome">
        <h2>
          Welcome
          {currentUser && currentUser.displayName
            ? `back, ${currentUser.displayName}`
            : " guest"}
        </h2>
        {randomSVG}
        <p>{randomFact.fact}</p>
      </div>
      <div className="row">
        <div className="column">
          <div className="column-text">Streak</div>
          {currentStreak !== null && targetStreak !== null ? (
            <Streak
              cx={150}
              cy={135}
              rx={100}
              ry={100}
              t1={Math.PI}
              Δ={(2 * currentStreak * Math.PI) / targetStreak}
              φ={0}
              stroke={"rgb(193, 82, 31)"}
              fillColor={"none"}
              strokeWidth={20}
              strokeLinecap={"round"}
              text={`${currentStreak}/${targetStreak}`}
              darkMode={darkMode}
            />
          ) : (
            <>
              <Streak
                cx={150}
                cy={135}
                rx={100}
                ry={100}
                t1={Math.PI}
                Δ={(2 * 1 * Math.PI) / 7}
                φ={0}
                stroke={"rgb(193, 82, 31)"}
                fillColor={"none"}
                strokeWidth={20}
                strokeLinecap={"round"}
                text={`${1}/${7} Days`}
                darkMode={darkMode}
              />
              <div style={{ fontSize: "9px" }}>
                Log In to continue your streak
              </div>
            </>
          )}
        </div>
        <div className="column">
          <div className="column-text">Badge</div>
          {highestStreak ? (
            <>
              <img src={badge} alt="Current Badge" />
              <div>{`Highest Streak: ${highestStreak} Days`}</div>
            </>
          ) : (
            <>
              <img src={CurrentBadge1} alt="Current Badge" />
              <div>{`Highest Streak: 1 Days`}</div>
              <div style={{ fontSize: "9px", marginTop: "6px" }}>
                Log In to continue your streak
              </div>
            </>
          )}
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Link to="/games" style={{ textDecoration: "none" }}>
            <div className="column-text">Games</div>
          </Link>

          <div className="games">
            <Link to="/games/sudoku" style={{ textDecoration: "none" }}>
              <div className="game">Sudoku</div>
            </Link>
            <Link to="/games/chess" style={{ textDecoration: "none" }}>
              <div className="game">Chess</div>
            </Link>
            <Link to="/games/tetris" style={{ textDecoration: "none" }}>
              <div className="game">Tetris</div>
            </Link>
            <Link to="/games/snakegame" style={{ textDecoration: "none" }}>
              <div className="game">Snake Game</div>
            </Link>
            <Link to="/games/nonogram" style={{ textDecoration: "none" }}>
              <div className="game">Nonogram</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
