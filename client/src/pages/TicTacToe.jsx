import React, { useState, useEffect } from "react";
import "./TicTacToe.css";
import { IconLetterO, IconLetterX } from "@tabler/icons-react";

const TicTacToe = ({ browserWindowWidth }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const [letterSize, setLetterSize] = useState(90);

  useEffect(() => {
    if (browserWindowWidth > 680) {
      setLetterSize(90);
    } else {
      setLetterSize(63);
    }
  }, [browserWindowWidth]);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function isBoardFull(squares) {
    return squares.every((square) => square !== null);
  }

  function minimax(squares, isMaximizing) {
    const winner = calculateWinner(squares);
    if (winner) return winner === "X" ? -10 : 10;
    if (isBoardFull(squares)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          squares[i] = <IconLetterO size={letterSize} />;
          bestScore = Math.max(bestScore, minimax(squares, false));
          squares[i] = null;
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          squares[i] = <IconLetterX size={letterSize} />;
          bestScore = Math.min(bestScore, minimax(squares, true));
          squares[i] = null;
        }
      }
      return bestScore;
    }
  }

  function findBestMove(squares) {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = <IconLetterO size={letterSize} />;
        let score = minimax(squares, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }

  useEffect(() => {
    const makeAIMove = () => {
      if (!isXNext && !calculateWinner(squares) && !isBoardFull(squares)) {
        const bestMove = findBestMove(squares);
        if (bestMove != null) {
          squares[bestMove] = <IconLetterO size={letterSize} />;
          setSquares(squares.slice());
          setIsXNext(true); // Switch turn back to X
        }
      }
    };

    makeAIMove();
  }, [squares, isXNext]);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = <IconLetterX size={letterSize} />;
    setSquares(squares.slice());
    setIsXNext(false);
  };

  const renderSquare = (i) => (
    <button
      className="tic-tac-toe-cell"
      style={{
        borderTop: i === 0 || i === 1 || i === 2 ? "none" : "",
        borderBottom: i === 6 || i === 7 || i === 8 ? "none" : "",
        borderLeft: i === 0 || i === 3 || i === 6 ? "none" : "",
        borderRight: i === 2 || i === 5 || i === 8 ? "none" : "",
      }}
      onClick={() => handleClick(i)}
    >
      {squares[i]}
    </button>
  );

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull(squares)) {
    status = "Draw!";
  } else {
    status = `Next player: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div className="tic-tac-toe-container">
      <h2>Tic Tac Toe</h2>
      <div className="tic-tac-toe">
        <div className="tic-tac-toe-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="tic-tac-toe-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="tic-tac-toe-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <div className="tic-tac-toe-status">{status}</div>
      </div>
    </div>
  );
};

export default TicTacToe;
