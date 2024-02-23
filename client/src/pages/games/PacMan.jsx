import React, { useState, useEffect } from "react";
import "./PacMan.css"; // Ensure this CSS file is linked correctly

const numRows = 10;
const numCols = 10;
const initialPacManPosition = { row: 5, col: 5 };
const ghostDelay = 100; // Delay in milliseconds (500ms here)

const PacMan = () => {
  const [pacManPosition, setPacManPosition] = useState(initialPacManPosition);
  const [ghostPosition, setGhostPosition] = useState(initialPacManPosition);
  const [pacManPath, setPacManPath] = useState([initialPacManPosition]);

  const movePacMan = (dir) => {
    setPacManPosition((prevPosition) => {
      let { row, col } = prevPosition;
      if (dir === "ArrowUp" && row > 0) row--;
      else if (dir === "ArrowDown" && row < numRows - 1) row++;
      else if (dir === "ArrowLeft" && col > 0) col--;
      else if (dir === "ArrowRight" && col < numCols - 1) col++;
      const newPosition = { row, col };
      setPacManPath((prevPath) => [...prevPath, newPosition]);
      return newPosition;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      movePacMan(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const moveGhost = () => {
      if (pacManPath.length > 1) {
        // Ensure there's a path to follow
        setGhostPosition(pacManPath[0]); // Move ghost to the next position in the path
        setPacManPath((prevPath) => prevPath.slice(1)); // Remove the position the ghost just moved to
      }
    };

    const intervalId = setInterval(moveGhost, ghostDelay);

    return () => clearInterval(intervalId);
  }, [pacManPath]);

  return (
    <div className="pacman-game">
      {Array.from({ length: numRows }, (_, rowIndex) => (
        <div key={rowIndex} className="pacman-row">
          {Array.from({ length: numCols }, (_, colIndex) => (
            <div
              key={colIndex}
              className={`pacman-cell ${
                pacManPosition.row === rowIndex &&
                pacManPosition.col === colIndex
                  ? "pacman"
                  : ghostPosition.row === rowIndex &&
                    ghostPosition.col === colIndex
                  ? "ghost"
                  : ""
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PacMan;
