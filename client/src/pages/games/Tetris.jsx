import React, { memo, useEffect, useRef, useState } from "react";
import { TetrisUseBoard } from "../../util/games/TetrisUseBoard";
import "./Tetris.css";
import {
  IconArrowLeft,
  IconArrowRight,
  IconRotateClockwise,
  IconArrowDown,
} from "@tabler/icons-react";

const Tetris = ({ browserWindowWidth }) => {
  const [
    display,
    score,
    onKeyDown,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    resetGame,
  ] = TetrisUseBoard();
  const eBoard = useRef();

  useEffect(focusBoard, []);

  function focusBoard() {
    eBoard.current.focus();
  }

  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (score) {
      const newHighScore = Math.max(score, highScore);
      setHighScore(newHighScore);
    }
  }, [score]);

  return (
    <div className="tetris-container">
      <h1>Tetris</h1>
      <div ref={eBoard} className="tetris" tabIndex={0} onKeyDown={onKeyDown}>
        <div className="tetris-score-label-container">
          <span className="tetris-score-label">{`Score: ${score.toLocaleString()}`}</span>
          <span className="tetris-score-label">{`High Score:${highScore}`}</span>
        </div>

        {display.map((row, index) => (
          <Row row={row} key={index} />
        ))}
        <div className="tetris-controls-container">
          <div className="tetris-controls">
            <div onClick={rotate} className="tetris-move-rotate">
              <IconRotateClockwise size={browserWindowWidth > 768 ? 20 : 15} />
            </div>{" "}
            <div onClick={moveDown} className="tetris-move-down">
              <IconArrowDown size={browserWindowWidth > 768 ? 20 : 15} />
            </div>
          </div>
          <div className="tetris-controls">
            <div onClick={moveLeft} className="tetris-move-left">
              <IconArrowLeft size={browserWindowWidth > 768 ? 20 : 15} />
            </div>
            <div onClick={moveRight} className="tetris-move-right">
              <IconArrowRight size={browserWindowWidth > 768 ? 20 : 15} />
            </div>
          </div>
          <div className="tetris-controls" onClick={resetGame}>
            <div>Reset</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = memo((props) => {
  return (
    <span className="tetris-row">
      {props.row.map((cell, index) => (
        <Cell cell={cell} key={index} />
      ))}
    </span>
  );
});

const Cell = memo((props) => {
  const count = useRef(0);

  count.current++;

  const value = props.cell ? props.cell : 0;
  return <span className={`tetris-cell tetris-cell-${value}`}></span>;
});

export default memo(Tetris);
