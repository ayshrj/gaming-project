import React, { useState, useEffect } from "react";
import "./Nonogram.css";
import NonogramGenerator from "../../util/NonogramGenerator";

const Nonogram = ({ darkMode }) => {
  const [data, setData] = useState(NonogramGenerator(8));
  const [currentFilled, setCurrentFilled] = useState(
    Array.from({ length: 8 }, () => Array(8).fill(0))
  );

  useEffect(() => {
    console.log(data);
  }, []);

  const handleCellClick = (row, column) => {
    const newFilled = [...currentFilled];
    newFilled[row][column] = newFilled[row][column] === 0 ? 1 : 0;
    setCurrentFilled(newFilled);
    console.log(currentFilled);
  };

  return (
    <div className="nonogram-container">
      <h2>Nonogram</h2>
      <div className="nonogram">
        {currentFilled.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <div
              key={`${rowIndex}-${columnIndex}`}
              className="cell"
              style={{
                backgroundColor:
                  cell === 1
                    ? "rgb(193, 82, 31)"
                    : darkMode
                    ? "hsl(0, 0%, 24%)"
                    : "white",
              }}
              onClick={() => handleCellClick(rowIndex, columnIndex)}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

export default Nonogram;
