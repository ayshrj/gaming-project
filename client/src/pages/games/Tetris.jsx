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
    <div className="tetris-container">
      <h1>Tetris</h1>
      <div ref={eBoard} className="tetris" tabIndex={0} onKeyDown={onKeyDown}>
        <div className="tetris-score-label-container">
          <span className="tetris-score-label">{`Score: ${score.toLocaleString()}`}</span>
          <span className="tetris-score-label">{`Highest Score:0`}</span>
        </div>
        {display.map((row, index) => (
          <Row row={row} key={index} />
        ))}
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
