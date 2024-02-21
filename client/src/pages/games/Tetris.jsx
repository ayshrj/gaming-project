import React, { memo, useEffect, useRef } from "react";
import { TetrisUseBoard } from "../../util/games/TetrisUseBoard";
import "./Tetris.css";

const Tetris = () => {
  const [display, score, onKeyDown] = TetrisUseBoard();
  const eBoard = useRef();

  useEffect(focusBoard, []);

  function focusBoard() {
    eBoard.current.focus();
  }

  return (
    <div ref={eBoard} className="tetris" tabIndex={0} onKeyDown={onKeyDown}>
      <div>
        <span className="tetris-score-label">Score:</span>
        <span className="tetris-score-label">{score.toLocaleString()}</span>
      </div>
      {display.map((row, index) => (
        <Row row={row} key={index} />
      ))}
    </div>
  );
};

const Row = memo((props) => {
  return (
    <span className="t-row">
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
  return <span className={`t-cell t-cell-${value}`}></span>;
});

export default memo(Tetris);
