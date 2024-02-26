import React, { useState, useEffect } from "react";
import "./Nonogram.css";
import NonogramGenerator from "../../util/games/NonogramGenerator";
import { IconX } from "@tabler/icons-react";

const Nonogram = ({ browserWindowWidth }) => {
  const [selectedSize, setSelectedSize] = useState(15);
  const [data, setData] = useState([]);
  const [currGrid, setCurrGrid] = useState(
    Array.from({ length: selectedSize }, () =>
      Array.from({ length: selectedSize }).fill(0)
    )
  );

  const [xModeOn, setXModeOn] = useState(false);

  useEffect(() => {
    setCurrGrid(
      Array.from({ length: selectedSize }, () =>
        Array.from({ length: selectedSize }).fill(0)
      )
    );
  }, [selectedSize]);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [fillingValue, setFillingValue] = useState(0);

  const handleEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let row, col;

    if (e.touches) {
      const touches = e.touches[0];
      if (touches) {
        const targetElement = document.elementFromPoint(
          touches.clientX,
          touches.clientY
        );
        if (targetElement && row !== undefined && col !== undefined) {
          row = targetElement.getAttribute("row");
          col = targetElement.getAttribute("col");
        }
      }
    }
    switch (e.type) {
      case "mousedown":
        setIsMouseDown(true);

        const rowDown = e.currentTarget.getAttribute("row");
        const colDown = e.currentTarget.getAttribute("col");

        if (xModeOn || e.button === 2) {
          setFillingValue(currGrid[rowDown][colDown] === 2 ? 0 : 2);
        } else if (e.button === 0) {
          setFillingValue(currGrid[rowDown][colDown] === 0 ? 1 : 0);
        }

        let tempDataMouseDown = [...currGrid];
        tempDataMouseDown[rowDown][colDown] = fillingValue;
        setCurrGrid(tempDataMouseDown);
        break;
      case "touchstart":
        setIsMouseDown(true);

        if (!e.touches) {
          row = e.currentTarget.getAttribute("row");
          col = e.currentTarget.getAttribute("col");
        }

        if (xModeOn || e.button === 2 || (e.type === "touchstart" && xModeOn)) {
          setFillingValue(currGrid[row][col] === 2 ? 0 : 2);
        } else if (e.button === 0 || (e.type === "touchstart" && !xModeOn)) {
          setFillingValue(currGrid[row][col] === 0 ? 1 : 0);
        }

        let tempDataTouchStart = [...currGrid];
        tempDataTouchStart[row][col] = fillingValue;
        setCurrGrid(tempDataTouchStart);
        break;
      case "mouseenter":
        if (isMouseDown) {
          const rowEnter = e.currentTarget.getAttribute("row");
          const colEnter = e.currentTarget.getAttribute("col");

          if (
            fillingValue === 0 ||
            fillingValue === 2 ||
            (fillingValue === 1 && currGrid[rowEnter][colEnter] !== 2)
          ) {
            let tempDataEnter = [...currGrid];
            tempDataEnter[rowEnter][colEnter] = fillingValue;
            setCurrGrid(tempDataEnter);
          }
        }
        break;
      case "touchmove":
        if (isMouseDown) {
          if (e.touches) {
            const touch = e.touches[0];
            const targetElement = document.elementFromPoint(
              touch.clientX,
              touch.clientY
            );
            row = targetElement.getAttribute("row");
            col = targetElement.getAttribute("col");
          } else {
            row = e.currentTarget.getAttribute("row");
            col = e.currentTarget.getAttribute("col");
          }

          if (
            fillingValue === 0 ||
            fillingValue === 2 ||
            (fillingValue === 1 && currGrid[row][col] !== 2)
          ) {
            let tempDataEnter = [...currGrid];
            tempDataEnter[row][col] = fillingValue;
            setCurrGrid(tempDataEnter);
          }
        }
        break;
      case "mouseup":
        setIsMouseDown(false);
        setFillingValue(0);
        console.log(currGrid);
        break;
      case "touchend":
        setIsMouseDown(false);
        setFillingValue(0);
        console.log(currGrid);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setData(NonogramGenerator(selectedSize));
  }, [selectedSize]);

  const [firstPart, setFirstPart] = useState([]);

  useEffect(() => {
    if (data !== null) {
      const rows = [];
      for (let i = 0; i < data.maxCol; i++) {
        const cols = [];
        for (let j = 0; j < data.maxRow; j++) {
          cols.push(
            <div
              key={`${i}-${j}`}
              className={`nonogram-cell nonogram-size-${selectedSize} no-border`}
            ></div>
          );
        }
        for (let j = 0; j < selectedSize; j++) {
          cols.push(
            <div
              key={`${i}-${j + selectedSize}`}
              className={`nonogram-cell nonogram-size-${selectedSize} no-border`}
            >
              {data?.colClues[j][i] !== 0 ? data.colClues[j][i] : ""}
            </div>
          );
        }
        rows.push(
          <div key={i} className="nonogram-row">
            {cols}
          </div>
        );
      }

      setFirstPart(rows);
    }
  }, [data, selectedSize]);

  const [secondPart, setSecondPart] = useState([]);

  useEffect(() => {
    if (data !== null) {
      const rows = [];
      for (let i = 0; i < selectedSize; i++) {
        const cols = [];
        for (let j = 0; j < data.maxRow; j++) {
          cols.push(
            <div
              key={`${i}-${j}`}
              className={`nonogram-cell nonogram-size-${selectedSize} no-border`}
            >
              {data?.rowClues[i][j] !== 0 ? data.rowClues[i][j] : ""}
            </div>
          );
        }
        for (let j = 0; j < selectedSize; j++) {
          cols.push(
            <div
              key={`${i}-${j + selectedSize}`}
              className={`nonogram-cell nonogram-size-${selectedSize} fillable ${
                currGrid[i][j] === 1 ? "filled" : ""
              }`}
              row={i}
              col={j}
              draggable="false"
              onMouseDown={(e) => {
                handleEvent(e);
              }}
              onMouseEnter={(e) => {
                handleEvent(e);
              }}
              onMouseUp={(e) => {
                handleEvent(e);
              }}
              onTouchStart={(e) => {
                handleEvent(e);
              }}
              onTouchMove={(e) => {
                handleEvent(e);
              }}
              onTouchEnd={(e) => {
                handleEvent(e);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            >
              {currGrid[i][j] === 2 ? <IconX /> : ""}
            </div>
          );
        }
        rows.push(
          <div key={i} className="nonogram-row">
            {cols}
          </div>
        );
      }

      setSecondPart(rows);
    }
  }, [data, selectedSize, currGrid]);

  useEffect(() => {
    console.log(browserWindowWidth);
  }, [browserWindowWidth]);

  const [prompt, setPrompt] = useState("");

  const setNewData = (givenSize) => {
    setData(NonogramGenerator(givenSize));
    console.log("New data", data.grid);
    setCurrGrid(
      Array.from({ length: givenSize }, () =>
        Array.from({ length: givenSize }).fill(0)
      )
    );
    setPrompt("");
    console.log("Curr grid reseted", currGrid);
  };

  const checkNonogram = () => {
    console.log("Curr Grid", currGrid);
    console.log("Curr Data", data.grid);
    for (let i = 0; i < selectedSize; ++i) {
      for (let j = 0; j < selectedSize; ++j) {
        if (
          ((currGrid[i][j] === 0 || currGrid[i][j] === 2) &&
            data.grid[i][j] === 0) ||
          ((currGrid[i][j] === 0 || currGrid[i][j] === 1) &&
            data.grid[i][j] === 1)
        ) {
          continue;
        } else {
          setPrompt("Something is wrong!");
          return;
        }
      }
    }

    setPrompt("Everything looks good!");
  };

  return (
    <div className="nonogram-container">
      <h1>Nonogram</h1>
      <div
        className="nonogram"
        style={{
          transform: `translateX(-${
            selectedSize === 15
              ? browserWindowWidth >= 1134
                ? 14 * data?.maxRow
                : browserWindowWidth >= 665
                ? 11.5 * data?.maxRow
                : browserWindowWidth >= 508
                ? 9 * data?.maxRow
                : 7 * data?.maxRow
              : selectedSize === 10
              ? browserWindowWidth >= 1134
                ? 22.5 * data?.maxRow
                : browserWindowWidth >= 665
                ? 16.375 * data?.maxRow
                : browserWindowWidth >= 508
                ? 12.25 * data?.maxRow
                : 8.945 * data?.maxRow
              : browserWindowWidth >= 1134
              ? 34 * data?.maxRow
              : browserWindowWidth >= 665
              ? 26.5 * data?.maxRow
              : browserWindowWidth >= 508
              ? 19 * data?.maxRow
              : 13 * data?.maxRow
          }px)`,
        }}
      >
        {firstPart ? firstPart : ""}
        {secondPart ? secondPart : ""}
      </div>
      <div className="game-prompt">{prompt}</div>
      <div className="nonogram-options-buttons">
        <div
          className="nonogram-button"
          onClick={() => {
            setNewData(selectedSize);
          }}
        >
          Reset
        </div>
        <div className="nonogram-button" onClick={checkNonogram}>
          Check
        </div>
      </div>
      <div className="nonogram-size-buttons">
        <div
          className={`nonogram-button ${
            selectedSize === 5 ? "game-active-button" : ""
          }`}
          onClick={
            selectedSize !== 5
              ? () => {
                  setSelectedSize(5);
                  setNewData(5);
                }
              : undefined
          }
        >
          5x5
        </div>
        <div
          className={`nonogram-button ${
            selectedSize === 10 ? "game-active-button" : ""
          }`}
          onClick={
            selectedSize !== 10
              ? () => {
                  setSelectedSize(10);
                  setNewData(10);
                }
              : undefined
          }
        >
          10x10
        </div>
        <div
          className={`nonogram-button ${
            selectedSize === 15 ? "game-active-button" : ""
          }`}
          onClick={
            selectedSize !== 15
              ? () => {
                  setSelectedSize(15);
                  setNewData(15);
                }
              : undefined
          }
        >
          15x15
        </div>
      </div>
      <div className="nonogram-board-button">
        <div
          className="nonogram-button"
          onClick={() => {
            setCurrGrid(
              Array.from({ length: selectedSize }, () =>
                Array.from({ length: selectedSize }).fill(0)
              )
            );
          }}
        >
          Clear All
        </div>
        <div
          className={`nonogram-button ${xModeOn ? "game-active-button" : ""}`}
          onClick={() => {
            setXModeOn(!xModeOn);
          }}
        >
          X Mode
        </div>
      </div>
    </div>
  );
};

export default Nonogram;
