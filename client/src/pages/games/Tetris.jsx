import React, { useState, useEffect } from "react";
import "./Tetris.css";

const Tetris = () => {
  const typeOfBlock = {
    I: [
      [
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
      ],
    ], //I
    J: [
      [
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 1, 1],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 1],
      ],
      [
        [0, 0, 1, 1],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 1],
      ],
    ], //J
    L: [
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 1],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [1, 0, 0, 0],
      ],
      [
        [0, 0, 1, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1],
        [1, 1, 1, 1],
      ],
    ], //L
    O: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 0, 1, 1],
      ],
    ], //O
    S: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 1],
        [0, 0, 0, 1],
      ],
    ], //S
    T: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 1, 1],
        [0, 0, 1, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 0, 0, 1],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 1, 1, 1],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 1],
        [0, 0, 1, 0],
      ],
    ], //T
    Z: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 1],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
      ],
    ], //Z
  };

  const [currGrid, setCurrGrid] = useState([]);
  const [completeBoard, setCompleteBoard] = useState(null);

  const [nextBlockShapesArray, setNextBlockShapesArray] = useState([]);
  const [nextBlockShape, setNextBlockShape] = useState([]);

  const [nextBlockHint, setNextBlockHint] = useState(null);

  useEffect(() => {
    setCurrGrid(
      Array.from({ length: 20 }, () => Array.from({ length: 10 }).fill(0))
    );
    setNextBlockShape(
      Array.from({ length: 4 }, () => Array.from({ length: 4 }).fill(0))
    );
  }, []);

  useEffect(() => {
    if (currGrid.length > 0) {
      const rows = [];
      for (let i = 0; i < 20; i++) {
        const cols = [];
        for (let j = 0; j < 10; j++) {
          cols.push(
            <div
              key={`${i}-${j}`}
              className="tetris-cell"
              row={i}
              col={j}
            ></div>
          );
        }
        rows.push(
          <div key={`${i}`} className="tetris-row">
            {cols}
          </div>
        );
      }

      setCompleteBoard(rows);
    }
  }, [currGrid]);

  useEffect(() => {
    if (currGrid.length > 0) {
      const rows = [];
      for (let i = 0; i < 4; i++) {
        const cols = [];
        for (let j = 0; j < 4; j++) {
          cols.push(
            <div
              key={`${i}-${j}`}
              className="tetris-cell"
              row={i}
              col={j}
            ></div>
          );
        }
        rows.push(
          <div key={`${i}`} className="tetris-row">
            {cols}
          </div>
        );
      }

      setNextBlockHint(rows);
    }
  }, [completeBoard]);

  useEffect(() => {
    if (completeBoard !== null) {
      const blockTypes = Object.keys(typeOfBlock);

      const randomBlockType =
        blockTypes[Math.floor(Math.random() * blockTypes.length)];

      const blockShapes = typeOfBlock[randomBlockType];

      setNextBlockShapesArray(blockShapes);
    }
  }, [nextBlockHint]);

  useState(() => {
    if (nextBlockShapesArray !== null) {
      setNextBlockShape(nextBlockShapesArray[0]);
    }
  }, [nextBlockShapesArray]);

  useEffect(() => {
    console.log(nextBlockShape);
    // if (completeBoard !== null && nextBlockShape !== null) {
    //   console.log("Next block shape", nextBlockShape);

    //   const rows = [];
    //   for (let i = 0; i < 4; i++) {
    //     const cols = [];
    //     for (let j = 0; j < 4; j++) {
    //       cols.push(
    //         <div
    //           key={`${i}-${j}`}
    //           className="tetris-cell"
    //           row={i}
    //           col={j}
    //         ></div>
    //       );
    //     }
    //     rows.push(
    //       <div key={`${i}`} className="tetris-row">
    //         {cols}
    //       </div>
    //     );
    //   }

    //   setNextBlockHint(rows);
    // }
  }, [nextBlockShape]);

  return (
    <div className="tetris-container">
      <h1>Tetris</h1>
      <div className="tetris">
        <div className="tetris-board">{completeBoard ? completeBoard : ""}</div>
        <div className="tetris-hint">{nextBlockHint ? nextBlockHint : ""}</div>
      </div>
    </div>
  );
};

export default Tetris;
