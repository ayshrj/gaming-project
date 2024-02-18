import React, { useState, useEffect } from "react";
import "./Sudoku.css";
import SudokuGenerator from "../../util/games/SudokuGenerator";

const Sudoku = ({ browserWindowWidth }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(1);
  const [data, setData] = useState([]);
  const [currGrid, setCurrGrid] = useState([]);

  useEffect(() => {
    setData(SudokuGenerator(selectedDifficulty));
    console.log(data);
  }, [selectedDifficulty]);

  useEffect(() => {
    if (data !== null && Array.isArray(data.unsolvedSudo)) {
      setCurrGrid(data.unsolvedSudo);
    }
  }, [data]);

  const [completeGrid, setCompleteGrid] = useState([]);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [selectedCol, setSelectedCol] = useState(-1);

  const handleSelect = (e) => {
    const row = parseInt(e.currentTarget.getAttribute("row"));
    const col = parseInt(e.currentTarget.getAttribute("col"));

    if (selectedRow === row && selectedCol === col) {
      setSelectedRow(-1);
      setSelectedCol(-1);
    } else {
      setSelectedRow(row);
      setSelectedCol(col);

      let tempArray = [...currGrid];
      tempArray[row][col] = selectedNumber;
      setCurrGrid(tempArray);
    }
    console.log(row, col);
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
              }
              ${j % 3 === 0 ? "sudoku-cell-left-thick" : ""} ${
                j === 8 ? "sudoku-cell-right-thick" : ""
              } ${i % 3 === 0 ? "sudoku-cell-top-thick" : ""} ${
                i === 8 ? "sudoku-cell-bottom-thick" : ""
              } ${
                data.unsolvedSudo[i][j] === 0 &&
                selectedRow === i &&
                selectedCol === j
                  ? "sudoku-selected"
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

  const handleSelectedNumber = (number) => {
    if (selectedNumber === number) {
      setSelectedNumber(0);
    } else {
      setSelectedNumber(number);
    }
  };

  return (
    <div className="sudoku-container">
      <h1>Sudoku</h1>
      <div className="sudoku">{completeGrid ? completeGrid : ""}</div>
      <div className="sudoku-numbers">
        <div
          className={`sudoku-number ${
            selectedNumber === 1 ? "sudoku-selected" : ""
          }`}
          onClick={() => handleSelectedNumber(1)}
        >
          1
        </div>
        <div
          className={`sudoku-number ${
            selectedNumber === 2 ? "sudoku-selected" : ""
          }`}
          onClick={() => handleSelectedNumber(2)}
        >
          2
        </div>
        <div
          className={`sudoku-number ${
            selectedNumber === 3 ? "sudoku-selected" : ""
          }`}
          onClick={() => handleSelectedNumber(3)}
        >
          3
        </div>
        <div
          className={`sudoku-number ${
            selectedNumber === 4 ? "sudoku-selected" : ""
          }`}
          onClick={() => handleSelectedNumber(4)}
        >
          4
        </div>
        <div
          className={`sudoku-number ${
            selectedNumber === 5 ? "sudoku-selected" : ""
          }`}
          onClick={() => handleSelectedNumber(5)}
        >
          5
        </div>
        <div
          className={`sudoku-number ${
            selectedNumber === 6 ? "sudoku-selected" : ""
          }`}
          onClick={() => handleSelectedNumber(6)}
        >
          6
        </div>
        <div
          className={`sudoku-number ${
            selectedNumber === 7 ? "sudoku-selected" : ""
          }`}
          onClick={() => handleSelectedNumber(7)}
        >
          7
        </div>
        <div
          className={`sudoku-number ${
            selectedNumber === 8 ? "sudoku-selected" : ""
          }`}
          onClick={() => handleSelectedNumber(8)}
        >
          8
        </div>
        <div
          className={`sudoku-number ${
            selectedNumber === 9 ? "sudoku-selected" : ""
          }`}
          onClick={() => handleSelectedNumber(9)}
        >
          9
        </div>
      </div>
    </div>
  );
};

export default Sudoku;
