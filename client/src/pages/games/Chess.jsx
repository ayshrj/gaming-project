import React, { useState, useEffect, useCallback } from "react";
import "./Chess.css";

import {
  IconChess,
  IconChessKing,
  IconChessRook,
  IconChessQueen,
  IconChessBishop,
  IconChessKnight,
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
  const [completeBoard, setCompleteBoard] = useState(null);
  const [selectedCol, setSelectedCol] = useState(-1);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [currentPlayer, setCurrentPlayer] = useState(-1);
  const [currentPieceSelected, setCurrentPieceSelected] = useState(-1);
  const [hasKingMoved, setHasKingMoved] = useState({
    white: false,
    black: false,
  });
  const [hasRookMoved, setHasRookMoved] = useState({
    white: { left: false, right: false },
    black: { left: false, right: false },
  });

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

    if (currentPieceSelected === 6 && hasKingMoved.black === false) {
      let tempHasKingMoved = { ...hasKingMoved, black: true };
      setHasKingMoved(tempHasKingMoved);
    } else if (currentPieceSelected === -6 && hasKingMoved.white === false) {
      let tempHasKingMoved = { ...hasKingMoved, white: true };
      setHasKingMoved(tempHasKingMoved);
    } else if (currentPieceSelected === 2) {
      if (col === 0 && hasRookMoved.black.left === false) {
        let tempHasRookMoved = {
          ...hasRookMoved,
          black: { ...hasRookMoved.black, left: true },
        };
        setHasRookMoved(tempHasRookMoved);
      } else if (col === 7 && hasRookMoved.black.right === false) {
        let tempHasRookMoved = {
          ...hasRookMoved,
          black: { ...hasRookMoved.black, right: true },
        };
        setHasRookMoved(tempHasRookMoved);
      }
    } else if (currentPieceSelected === -2) {
      if (col === 0 && hasRookMoved.white.left === false) {
        let tempHasRookMoved = {
          ...hasRookMoved,
          white: { ...hasRookMoved.white, left: true },
        };
        setHasRookMoved(tempHasRookMoved);
      } else if (col === 7 && hasRookMoved.white.right === false) {
        let tempHasRookMoved = {
          ...hasRookMoved,
          white: { ...hasRookMoved.white, right: true },
        };
        setHasRookMoved(tempHasRookMoved);
      }
    }

    let tempArray = currBoard.map((row) => [...row]);
    tempArray[selectedRow][selectedCol] = 0;
    if (Math.abs(currBoard[row][col]) === 6) {
      setGameOver("Game Over");
      setCurrentPlayer(0);
      tempArray[row][col] = currentPieceSelected;
      setCurrBoard(tempArray);
      setSelectedRow(-1);
      setSelectedCol(-1);
      setReachable(
        Array.from({ length: 8 }, () => Array.from({ length: 8 }).fill(false))
      );
      return;
    }
    tempArray[row][col] = currentPieceSelected;

    if (currentPieceSelected === 6 && selectedRow === 0 && selectedCol === 4) {
      if (row === 0 && col === 2) {
        tempArray[0][0] = 0;
        tempArray[0][3] = 2;
      } else if (row === 0 && col === 6) {
        tempArray[0][7] = 0;
        tempArray[0][5] = 2;
      }
    } else if (
      currentPieceSelected === -6 &&
      selectedRow === 7 &&
      selectedCol === 4
    ) {
      if (row === 7 && col === 2) {
        tempArray[7][0] = 0;
        tempArray[7][3] = -2;
      } else if (row === 7 && col === 6) {
        tempArray[7][7] = 0;
        tempArray[7][5] = -2;
      }
    }

    if (Math.abs(currentPieceSelected) === 1) {
      const isBlackPawnPromotion = currentPieceSelected === 1 && row === 7;
      const isWhitePawnPromotion = currentPieceSelected === -1 && row === 0;
      if (isBlackPawnPromotion || isWhitePawnPromotion) {
        const promotionPiece = window.prompt(
          "Promote your pawn to Q, R, B, or K:"
        );
        switch (promotionPiece.toUpperCase()) {
          case "Q":
            tempArray[row][col] = currentPieceSelected > 0 ? 5 : -5; // Queen
            break;
          case "R":
            tempArray[row][col] = currentPieceSelected > 0 ? 2 : -2; // Rook
            break;
          case "B":
            tempArray[row][col] = currentPieceSelected > 0 ? 4 : -4; // Bishop
            break;
          case "N":
            tempArray[row][col] = currentPieceSelected > 0 ? 3 : -3; // Knight
            break;
          default:
            // Optionally handle invalid input; default to queen
            tempArray[row][col] = currentPieceSelected > 0 ? 5 : -5;
        }
      }
    }

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

        if (currentPieceSelected === 6 && hasKingMoved.black === false) {
          if (
            hasRookMoved.black.left === false &&
            currBoard[0][1] === 0 &&
            currBoard[0][2] === 0 &&
            currBoard[0][3] === 0
          ) {
            tempArray[0][2] = true;
          }
          if (
            hasRookMoved.black.right === false &&
            currBoard[0][6] === 0 &&
            currBoard[0][5] === 0
          ) {
            tempArray[0][6] = true;
          }
        } else if (
          currentPieceSelected === -6 &&
          hasKingMoved.white === false
        ) {
          if (
            hasRookMoved.white.left === false &&
            currBoard[7][1] === 0 &&
            currBoard[7][2] === 0 &&
            currBoard[7][3] === 0
          ) {
            tempArray[7][2] = true;
          }
          if (
            hasRookMoved.white.right === false &&
            currBoard[7][6] === 0 &&
            currBoard[7][5] === 0
          ) {
            tempArray[7][6] = true;
          }
        }
      }

      setReachable(tempArray);
    }
  }, [switchCell]);

  const pieceSize = useCallback(() => {
    return browserWindowWidth > 665 ? 35 : 20;
  });

  useEffect(() => {
    if (currBoard !== null && currBoard.length > 0) {
      const renderCell = (value) => {
        switch (value) {
          case 1:
            return (
              <IconChess
                className="chess-piece chess-piece-black"
                size={pieceSize()}
              />
            );
          case -1:
            return (
              <IconChess
                className="chess-piece chess-piece-white"
                size={pieceSize()}
              />
            );
          case 2:
            return (
              <IconChessRook
                className="chess-piece chess-piece-black"
                size={pieceSize()}
              />
            );
          case -2:
            return (
              <IconChessRook
                className="chess-piece chess-piece-white"
                size={pieceSize()}
              />
            );
          case 3:
            return (
              <IconChessKnight
                className="chess-piece chess-piece-black"
                size={pieceSize()}
              />
            );
          case -3:
            return (
              <IconChessKnight
                className="chess-piece chess-piece-white"
                size={pieceSize()}
              />
            );
          case 4:
            return (
              <IconChessBishop
                className="chess-piece chess-piece-black"
                size={pieceSize()}
              />
            );
          case -4:
            return (
              <IconChessBishop
                className="chess-piece chess-piece-white"
                size={pieceSize()}
              />
            );
          case 5:
            return (
              <IconChessQueen
                className="chess-piece chess-piece-black"
                size={pieceSize()}
              />
            );
          case -5:
            return (
              <IconChessQueen
                className="chess-piece chess-piece-white"
                size={pieceSize()}
              />
            );
          case 6:
            return (
              <IconChessKing
                className="chess-piece chess-piece-black"
                size={pieceSize()}
              />
            );
          case -6:
            return (
              <IconChessKing
                className="chess-piece chess-piece-white"
                size={pieceSize()}
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
    setHasKingMoved({
      white: false,
      black: false,
    });
    setHasRookMoved({
      white: { left: false, right: false },
      black: { left: false, right: false },
    });
    setCurrentPlayer(-1);
  };

  const [gameOver, setGameOver] = useState("");

  return (
    <div className="chess-container">
      <h1>Chess</h1>
      <div className="chess">{completeBoard}</div>
      <div className="chess-options-buttons">
        <div className="chess-button" onClick={handleReset}>
          Reset
        </div>
      </div>
      {gameOver && <div>Game Over!</div>}
    </div>
  );
};

export default Chess;
