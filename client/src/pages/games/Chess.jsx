import React, { useState, useEffect } from "react";
import "./Chess.css";

import {
  IconChess,
  IconChessKing,
  IconChessRook,
  IconChessQueen,
  IconChessBishop,
  IconChessKnight,
  IconChessFilled,
  IconChessKingFilled,
  IconChessRookFilled,
  IconChessQueenFilled,
  IconChessBishopFilled,
  IconChessKnightFilled,
  IconX,
} from "@tabler/icons-react";

const Chess = ({ browserWindowWidth }) => {
  const [currBoard, setCurrBoard] = useState([]);
  const [reachable, setReachable] = useState([]);

  const newBoard = () => {
    let tempBoard = Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }).fill(0)
    );

    for (let i = 0; i < 10; ++i) {
      tempBoard[1][i] = 1; //black pawn
      tempBoard[6][i] = -1; //white pawn
    }

    tempBoard[0][0] = tempBoard[0][7] = 2; //black rook
    tempBoard[7][0] = tempBoard[7][7] = -2; //white rook

    tempBoard[0][1] = tempBoard[0][6] = 3; //black knight
    tempBoard[7][1] = tempBoard[7][6] = -3; //white knight

    tempBoard[0][2] = tempBoard[0][5] = 4; //black knight
    tempBoard[7][2] = tempBoard[7][5] = -4; //white knight

    tempBoard[0][3] = 5; //black queen
    tempBoard[7][3] = -5; //white queen

    tempBoard[0][4] = 6; //black king
    tempBoard[7][4] = -6; //white king

    return tempBoard;
  };

  useState(() => {
    const tempArray = newBoard();
    setCurrBoard(tempArray);
    setReachable(
      Array.from({ length: 8 }, () => Array.from({ length: 8 }).fill(false))
    );
  }, []);

  const [switchCell, setSwitchCell] = useState(false);
  const [completeBoard, setCompleteBoard] = useState([]);
  const [selectedCol, setSelectedCol] = useState(-1);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [currentPlayer, setCurrentPlayer] = useState(-1);
  const [currentPieceSelected, setCurrentPieceSelected] = useState(-1);

  const handleSelect = (e) => {
    const row = parseInt(e.currentTarget.getAttribute("row"));
    const col = parseInt(e.currentTarget.getAttribute("col"));

    console.log("selected", row, col);

    setSelectedRow(row);
    setSelectedCol(col);
  };

  const handleMove = (e) => {
    const row = parseInt(e.currentTarget.getAttribute("row"));
    const col = parseInt(e.currentTarget.getAttribute("col"));

    let tempArray = currBoard.map((row) => [...row]);
    tempArray[selectedRow][selectedCol] = 0;
    tempArray[row][col] = currentPieceSelected;
    setCurrBoard(tempArray);

    setSelectedRow(-1);
    setSelectedCol(-1);
    setCurrentPlayer(currentPlayer === 1 ? -1 : 1);
    setReachable(
      Array.from({ length: 8 }, () => Array.from({ length: 8 }).fill(false))
    );
  };

  useEffect(() => {
    if (selectedCol !== -1 && selectedRow !== -1) {
      setSwitchCell(!switchCell);
      setCurrentPieceSelected(currBoard[selectedRow][selectedCol]);
    }
  }, [selectedCol, selectedRow]);

  useEffect(() => {
    if (selectedCol !== -1 && selectedRow !== -1) {
      let tempArray = Array.from({ length: 8 }, () =>
        Array.from({ length: 8 }).fill(false)
      );

      if (currentPieceSelected === 1 && selectedRow !== 7) {
        //black pawn
        if (currBoard[selectedRow + 1][selectedCol] === 0)
          tempArray[selectedRow + 1][selectedCol] = true;

        if (selectedCol >= 0 && currBoard[selectedRow + 1][selectedCol - 1] < 0)
          tempArray[selectedRow + 1][selectedCol - 1] = true;

        if (selectedCol < 8 && currBoard[selectedRow + 1][selectedCol + 1] < 0)
          tempArray[selectedRow + 1][selectedCol + 1] = true;

        if (selectedRow === 1 && currBoard[selectedRow + 2][selectedCol] === 0)
          tempArray[selectedRow + 2][selectedCol] = true;
      } else if (currentPieceSelected === -1 && selectedRow !== 0) {
        //white pawn
        if (currBoard[selectedRow - 1][selectedCol] === 0)
          tempArray[selectedRow - 1][selectedCol] = true;

        if (selectedCol >= 0 && currBoard[selectedRow - 1][selectedCol - 1] > 0)
          tempArray[selectedRow - 1][selectedCol - 1] = true;

        if (selectedCol < 8 && currBoard[selectedRow - 1][selectedCol + 1] > 0)
          tempArray[selectedRow - 1][selectedCol + 1] = true;

        if (selectedRow === 6 && currBoard[selectedRow - 2][selectedCol] === 0)
          tempArray[selectedRow - 2][selectedCol] = true;
      } else if (Math.abs(currentPieceSelected) === 2) {
        //rook
        const directions = [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ];

        for (const [dx, dy] of directions) {
          for (
            let i = selectedRow + dx, j = selectedCol + dy;
            i >= 0 && i < 8 && j >= 0 && j < 8;
            i += dx, j += dy
          ) {
            if (currBoard[i][j] * currentPieceSelected > 0) break;
            tempArray[i][j] = true;
            if (currBoard[i][j] !== 0) break;
          }
        }
      } else if (Math.abs(currentPieceSelected) === 3) {
        //knight
        const knightMoves = [
          [-2, -1],
          [-2, 1],
          [-1, -2],
          [-1, 2],
          [1, -2],
          [1, 2],
          [2, -1],
          [2, 1],
        ];

        for (const [dx, dy] of knightMoves) {
          const row = selectedRow + dx,
            col = selectedCol + dy;
          if (
            row >= 0 &&
            row < 8 &&
            col >= 0 &&
            col < 8 &&
            currBoard[row][col] * currentPieceSelected <= 0
          )
            tempArray[row][col] = true;
        }
      } else if (Math.abs(currentPieceSelected) === 4) {
        //bishop
        const directions = [
          [-1, -1],
          [-1, 1],
          [1, 1],
          [1, -1],
        ];

        for (const [dx, dy] of directions) {
          for (
            let i = selectedRow + dx, j = selectedCol + dy;
            i >= 0 && i < 8 && j >= 0 && j < 8;
            i += dx, j += dy
          ) {
            if (currBoard[i][j] * currentPieceSelected > 0) break;
            tempArray[i][j] = true;
            if (currBoard[i][j] !== 0) break;
          }
        }
      } else if (Math.abs(currentPieceSelected) === 5) {
        // queen
        const directions = [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
          [-1, -1],
          [-1, 1],
          [1, 1],
          [1, -1],
        ];

        for (const [dx, dy] of directions) {
          for (
            let i = selectedRow + dx, j = selectedCol + dy;
            i >= 0 && i < 8 && j >= 0 && j < 8;
            i += dx, j += dy
          ) {
            if (currBoard[i][j] * currentPieceSelected > 0) break;
            tempArray[i][j] = true;
            if (currBoard[i][j] !== 0) break;
          }
        }
      } else if (Math.abs(currentPieceSelected) === 6) {
        //king
        for (
          let i = Math.max(selectedRow - 1, 0);
          i < Math.min(selectedRow + 2, 8);
          ++i
        ) {
          for (
            let j = Math.max(selectedCol - 1, 0);
            j < Math.min(selectedCol + 2, 8);
            ++j
          ) {
            if (currBoard[i][j] * currentPieceSelected <= 0)
              tempArray[i][j] = true;
          }
        }
      }

      setReachable(tempArray);
    }
  }, [switchCell]);

  useEffect(() => {
    if (currBoard !== null && currBoard.length > 0) {
      const renderCell = (value) => {
        switch (value) {
          case 1:
            return (
              <IconChess
                className="chess-piece chess-piece-black"
                size={browserWindowWidth > 665 ? 25 : 12}
              />
            );
          case -1:
            return (
              <IconChess
                className="chess-piece chess-piece-white"
                size={browserWindowWidth > 665 ? 25 : 12}
              />
            );
          case 2:
            return (
              <IconChessRook
                className="chess-piece chess-piece-black"
                size={browserWindowWidth > 665 ? 25 : 12}
              />
            );
          case -2:
            return (
              <IconChessRook
                className="chess-piece chess-piece-white"
                size={browserWindowWidth > 665 ? 25 : 12}
              />
            );
          case 3:
            return (
              <IconChessKnight
                className="chess-piece chess-piece-black"
                size={browserWindowWidth > 665 ? 25 : 12}
              />
            );
          case -3:
            return (
              <IconChessKnight
                className="chess-piece chess-piece-white"
                size={browserWindowWidth > 665 ? 25 : 12}
              />
            );
          case 4:
            return (
              <IconChessBishop
                className="chess-piece chess-piece-black"
                size={browserWindowWidth > 665 ? 25 : 12}
              />
            );
          case -4:
            return (
              <IconChessBishop
                className="chess-piece chess-piece-white"
                size={browserWindowWidth > 665 ? 25 : 12}
              />
            );
          case 5:
            return (
              <IconChessQueen
                className="chess-piece chess-piece-black"
                size={browserWindowWidth > 665 ? 25 : 12}
              />
            );
          case -5:
            return (
              <IconChessQueen
                className="chess-piece chess-piece-white"
                size={browserWindowWidth > 665 ? 25 : 12}
              />
            );
          case 6:
            return (
              <IconChessKing
                className="chess-piece chess-piece-black"
                size={browserWindowWidth > 665 ? 25 : 12}
              />
            );
          case -6:
            return (
              <IconChessKing
                className="chess-piece chess-piece-white"
                size={browserWindowWidth > 665 ? 25 : 12}
              />
            );
          default:
            return "";
        }
      };

      const rows = [];
      for (let i = 0; i < 8; i++) {
        const cols = [];
        for (let j = 0; j < 8; j++) {
          cols.push(
            <div
              key={`${i}-${j}`}
              className={`chess-cell ${
                (i + j) % 2 === 0 ? "chess-cell-white" : "chess-cell-black"
              } ${
                currBoard[i][j] * currentPlayer > 0
                  ? "chess-cell-selectable"
                  : ""
              } ${
                selectedRow === i && selectedCol === j
                  ? "chess-cell-selected"
                  : ""
              } ${reachable[i][j] === true ? "chess-cell-reachable" : ""}`}
              row={i}
              col={j}
              onClick={(e) =>
                currBoard[i][j] * currentPlayer > 0
                  ? handleSelect(e)
                  : reachable[i][j] === true
                  ? handleMove(e)
                  : undefined
              }
            >
              {currBoard[i][j] !== 0 && renderCell(currBoard[i][j])}
              {currBoard[i][j] !== 0 && reachable[i][j] === true && (
                <IconX
                  className="chess-cell-cross"
                  size={browserWindowWidth > 665 ? 40 : 20}
                />
              )}
            </div>
          );
        }
        rows.push(
          <div key={i} className="chess-row">
            {cols}
          </div>
        );
      }

      setCompleteBoard(rows);
    }
  }, [currBoard, selectedCol, selectedRow, reachable, browserWindowWidth]);

  const handleReset = () => {
    const tempArray = newBoard();
    setCurrBoard(tempArray);
    setReachable(
      Array.from({ length: 8 }, () => Array.from({ length: 8 }).fill(false))
    );
  };

  return (
    <div className="chess-container">
      <h1>Chess</h1>
      <div className="chess">{completeBoard}</div>
      <div className="chess-options-buttons">
        <div className="chess-button" onClick={handleReset}>
          Reset
        </div>
      </div>
    </div>
  );
};

export default Chess;
