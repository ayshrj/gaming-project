import React, { useState, useEffect } from "react";
import "./Sudoku.css";
import SudokuGenerator from "../../util/games/SudokuGenerator";

const Sudoku = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(1);
  const [data, setData] = useState([]);
  const [currGrid, setCurrGrid] = useState([]);
  const [errorField, setErrorField] = useState(
    Array.from({ length: 9 }, () => Array.from({ length: 9 }).fill(false))
  );

  useEffect(() => {
    setData(SudokuGenerator(selectedDifficulty));
    console.log(data);
  }, [selectedDifficulty]);

  useEffect(() => {
    if (data !== null && Array.isArray(data.unsolvedSudo)) {
      const tempArray = data.unsolvedSudo.map((row) => [...row]);
      setCurrGrid(tempArray);
    }
  }, [data]);

  const [completeGrid, setCompleteGrid] = useState([]);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [selectedCol, setSelectedCol] = useState(-1);

  const handleSelect = (e) => {
    setPrompt("");
    const row = parseInt(e.currentTarget.getAttribute("row"));
    const col = parseInt(e.currentTarget.getAttribute("col"));
    let tempArray = [...currGrid];

    if (selectedRow === row && selectedCol === col) {
      if (selectedNumber !== 0) {
        if (currGrid[row][col] === selectedNumber) {
          tempArray[row][col] = 0;
          setCurrGrid(tempArray);
        } else {
          tempArray[row][col] = selectedNumber;
          setCurrGrid(tempArray);
        }
      } else {
        setSelectedRow(-1);
        setSelectedCol(-1);
      }
    } else {
      setSelectedRow(row);
      setSelectedCol(col);

      if (selectedNumber !== 0) {
        if (currGrid[row][col] === selectedNumber) {
          tempArray[row][col] = 0;
          setCurrGrid(tempArray);
        } else {
          tempArray[row][col] = selectedNumber;
          setCurrGrid(tempArray);
        }
      }
    }
  };

  const handleSelectedNumber = (number) => {
    setPrompt("");
    if (selectedNumber === number) {
      setSelectedNumber(0);
      return;
    } else {
      setSelectedNumber(number);
    }
    if (selectedRow !== -1 && selectedCol !== -1) {
      if (currGrid[selectedRow][selectedCol] === number) {
        let tempArray = [...currGrid];
        tempArray[selectedRow][selectedCol] = 0;
        setCurrGrid(tempArray);
      } else {
        let tempArray = [...currGrid];
        tempArray[selectedRow][selectedCol] = number;
        setCurrGrid(tempArray);
      }
    }
  };

  useEffect(() => {
    if (currGrid !== null && currGrid.length > 0) {
      const rows = [];
      for (let i = 0; i < 9; i++) {
        const cols = [];
        for (let j = 0; j < 9; j++) {
          cols.push(
            <div
              key={`${i}-${j}`}
              className={`sudoku-cell ${
                data.unsolvedSudo[i][j] === 0 ? "sudoku-fillable" : ""
              } ${j % 3 === 0 ? "sudoku-cell-left-thick" : ""} ${
                j === 8 ? "sudoku-cell-right-thick" : ""
              } ${i % 3 === 0 ? "sudoku-cell-top-thick" : ""} ${
                i === 8 ? "sudoku-cell-bottom-thick" : ""
              } ${
                data.unsolvedSudo[i][j] === 0 &&
                selectedRow === i &&
                selectedCol === j
                  ? "sudoku-selected"
                  : ""
              } ${
                data.unsolvedSudo[i][j] === 0 && errorField[i][j]
                  ? "sudoku-error-cell"
                  : ""
              }`}
              row={i}
              col={j}
              onClick={(e) =>
                data.unsolvedSudo[i][j] === 0 ? handleSelect(e) : undefined
              }
            >
              {currGrid[i][j] ? currGrid[i][j] : ""}
            </div>
          );
        }
        rows.push(
          <div key={i} className="sudoku-row">
            {cols}
          </div>
        );
      }

      setCompleteGrid(rows);
    }
  }, [currGrid, selectedCol, selectedRow]);

  const [selectedNumber, setSelectedNumber] = useState(0);

  const [prompt, setPrompt] = useState("");

  const handleDifficulty = (diff) => {
    setPrompt("");
    setSelectedDifficulty(diff);
    setData(SudokuGenerator(selectedDifficulty));
    setSelectedNumber(0);
    setSelectedCol(-1);
    setSelectedRow(-1);
  };

  const handleClearAll = () => {
    setPrompt("");
    if (data !== null && Array.isArray(data.unsolvedSudo)) {
      const tempArray = data.unsolvedSudo.map((row) => [...row]);
      setCurrGrid(tempArray);
    }
  };

  const handleReset = () => {
    setData(SudokuGenerator(selectedDifficulty));
    setSelectedCol(-1);
    setSelectedRow(-1);
  };

  const handleCheck = () => {
    for (let i = 0; i < 9; ++i) {
      for (let j = 0; j < 9; ++j) {
        if (data.solvedSudo[i][j] !== currGrid[i][j]) {
          setPrompt("Something is wrong!");
          return;
        }
      }
    }

    setPrompt("Everything looks good!");
  };

  return (
    <div className="sudoku-container">
      <h1>Sudoku</h1>
      <div className="sudoku">{completeGrid ? completeGrid : ""}</div>
      <div className="sudoku-numbers">
        {[...Array(9)].map((_, index) => (
          <div
            key={index + 1}
            className={`sudoku-number ${
              selectedNumber === index + 1 ? "sudoku-selected" : ""
            }`}
            onClick={() => handleSelectedNumber(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="game-prompt" onClick={handleCheck}>
        {prompt}
      </div>
      <div className="sudoku-options-buttons">
        <div className="sudoku-button" onClick={handleReset}>
          Reset
        </div>
        <div className="sudoku-button">Check</div>
      </div>
      <div className="sudoku-difficulty-buttons">
        <div
          className={`sudoku-button ${
            selectedDifficulty === 0 ? "game-active-button" : ""
          }`}
          onClick={() => handleDifficulty(0)}
        >
          Easy
        </div>
        <div
          className={`sudoku-button ${
            selectedDifficulty === 1 ? "game-active-button" : ""
          }`}
          onClick={() => handleDifficulty(1)}
        >
          Medium
        </div>
        <div
          className={`sudoku-button ${
            selectedDifficulty === 2 ? "game-active-button" : ""
          }`}
          onClick={() => handleDifficulty(2)}
        >
          Hard
        </div>
      </div>
      <div className="sudoku-board-buttons">
        <div className="sudoku-button" onClick={handleClearAll}>
          Clear All
        </div>
      </div>
    </div>
  );
};

export default Sudoku;
