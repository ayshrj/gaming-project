import React, { useEffect, useState, useContext } from "react";
import "./RockPaperScissor.css";
import {
  IconHandStop,
  IconHandTwoFingers,
  IconHandGrab,
} from "@tabler/icons-react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";

const RockPaperScissor = ({ browserWindowWidth }) => {
  const [handSize, setHandSize] = useState(
    browserWindowWidth >= 768 ? 300 : 160
  );
  const handStrokeSize = 1;

  useEffect(() => {
    const tempSize = browserWindowWidth >= 768 ? 300 : 160;
    setHandSize(tempSize);
  }, [browserWindowWidth]);

  const [currentHandSelected, setCurrentHandSelected] = useState(
    <IconHandGrab
      size={handSize}
      strokeWidth={handStrokeSize}
      data-name="rock"
    />
  );
  const [botHandSelected, setBotHandSelected] = useState(
    <IconHandGrab
      size={handSize}
      strokeWidth={handStrokeSize}
      data-name="rock"
    />
  );
  const [isShaking, setIsShaking] = useState(false);
  const [currScore, setCurrScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleSelectHand = (hand) => {
    const getRandomHand = () => {
      const hands = ["rock", "paper", "scissor"];
      const randomIndex = Math.floor(Math.random() * hands.length);
      return hands[randomIndex];
    };

    const botHand = getRandomHand();

    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);

    if (hand === "rock") {
      setCurrentHandSelected(
        <IconHandGrab
          size={handSize}
          strokeWidth={handStrokeSize}
          data-name="rock"
        />
      );
    } else if (hand === "paper") {
      setCurrentHandSelected(
        <IconHandStop
          size={handSize}
          strokeWidth={handStrokeSize}
          data-name="paper"
        />
      );
    } else if (hand === "scissor") {
      setCurrentHandSelected(
        <IconHandTwoFingers
          size={handSize}
          strokeWidth={handStrokeSize}
          data-name="scissor"
        />
      );
    }

    if (botHand === "rock") {
      setBotHandSelected(
        <IconHandGrab
          size={handSize}
          strokeWidth={handStrokeSize}
          data-name="rock"
        />
      );
    } else if (botHand === "paper") {
      setBotHandSelected(
        <IconHandStop
          size={handSize}
          strokeWidth={handStrokeSize}
          data-name="paper"
        />
      );
    } else if (botHand === "scissor") {
      setBotHandSelected(
        <IconHandTwoFingers
          size={handSize}
          strokeWidth={handStrokeSize}
          data-name="scissor"
        />
      );
    }
  };

  useEffect(() => {
    const winConditions = {
      rock: "scissor",
      paper: "rock",
      scissor: "paper",
    };

    const userHand = currentHandSelected.props["data-name"];
    const botHand = botHandSelected.props["data-name"];

    if (userHand === botHand) {
      return;
    }

    if (winConditions[userHand] === botHand) {
      setCurrScore(currScore + 1);
    } else {
      setCurrScore(0);
    }
  }, [currentHandSelected, botHandSelected]);

  const { userDoc } = useContext(AuthContext);

  useEffect(() => {
    try {
      if (userDoc) {
        setHighScore(userDoc.highscore.rps);
      } else {
        console.log("User data not found.");
      }
    } catch (err) {
      console.log(err);
    }
  }, [userDoc]);

  useEffect(() => {
    if (currScore > highScore) {
      setHighScore(currScore);
      try {
        if (userDoc && currScore > userDoc.highscore.rps) {
          const updatedHighscores = {
            ...userDoc.highscore,
            rps: currScore,
          };

          updateDoc(doc(db, "users", userDoc.uid), {
            highscore: updatedHighscores,
          })
            .then(() => {
              console.log("Highscore updated successfully");
            })
            .catch((error) => {
              console.error("Error updating highscore:", error);
            });
        } else {
          console.log("User data not found.");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [currScore]);

  return (
    <div className="rps-container">
      <h1>Rock Paper Scissor</h1>
      <div className="rps-score-label">
        <div className="rps-score-label rps-curr-score">
          <div>Score: {currScore}</div>
        </div>
        <div className="rps-score-label rps-curr-score">
          <div>High Score: {highScore}</div>
        </div>
      </div>
      <div className="rps">
        <div className="rps-hand rps-hand-left">
          <div style={{ animation: isShaking ? "shakeHand 0.6s" : "none" }}>
            {isShaking ? (
              <IconHandGrab size={handSize} strokeWidth={handStrokeSize} />
            ) : (
              currentHandSelected
            )}
          </div>
        </div>
        <div className="rps-hand rps-hand-right">
          <div style={{ animation: isShaking ? "shakeHand 0.6s" : "none" }}>
            {isShaking ? (
              <IconHandGrab size={handSize} strokeWidth={handStrokeSize} />
            ) : (
              botHandSelected
            )}
          </div>
        </div>
      </div>
      <div className="rps-options">
        <div
          className="rps-option"
          onClick={() => {
            handleSelectHand("rock");
          }}
        >
          <IconHandGrab />
          Rock
        </div>
        <div
          className="rps-option"
          onClick={() => {
            handleSelectHand("paper");
          }}
        >
          <IconHandStop />
          Paper
        </div>
        <div
          className="rps-option"
          onClick={() => {
            handleSelectHand("scissor");
          }}
        >
          <IconHandTwoFingers />
          Scissors
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissor;
