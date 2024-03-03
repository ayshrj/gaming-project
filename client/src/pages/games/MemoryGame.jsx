import React, { useState, useEffect } from "react";
import "./MemoryGame.css";
import TimerSVG from "../../util/TimerSVG";
import FaceCreator from "../../util/FaceCreator";

const MemoryGame = () => {
  // Initialize timer with 10000 milliseconds (10 seconds)
  const [timeLeft, setTimeLeft] = useState(10000);

  useEffect(() => {
    const updateTimer = () => {
      const startTime = Date.now();
      const endTime = startTime + timeLeft;

      // Update the timer based on elapsed time
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = endTime - currentTime;
        if (elapsedTime > 0) {
          setTimeLeft(elapsedTime);
        } else {
          setTimeLeft(0); // Stop the timer at 0
          clearInterval(interval);
        }
      }, 1); // Update every 1 millisecond for precision

      return () => clearInterval(interval); // Clean up on component unmount or reset
    };

    const intervalId = updateTimer();

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [timeLeft]);

  // Reset the timer to 10 seconds (10000 milliseconds)
  const resetTimer = () => {
    setTimeLeft(10000); // Reset time left to 10 seconds in milliseconds
  };

  // Calculate progress in percentage for TimerSVG
  const progress = (timeLeft / 10000) * 100;

  return (
    <div className="memory-game-container">
      <h1>Memory Game</h1>
      <p>Time Left: {(timeLeft / 1000).toFixed(2)}s</p>{" "}
      {/* Display time left in seconds with 2 decimal points */}
      <TimerSVG
        height={20}
        width={400}
        innerRadius={4}
        boundaryColor={"rgb(193, 82, 31)"}
        boundaryClassText=""
        // fillerColor={"currentColor"}
        fillerClassText="progress-bar-filler"
        progressColor={"rgb(193, 82, 31)"}
        progressClassText=""
        progress={progress} // Pass calculated progress in percentage
      />
      {progress === 0 && (
        <button onClick={resetTimer} className="reset-button">
          Reset Timer
        </button>
      )}
    </div>
  );
};

export default MemoryGame;
