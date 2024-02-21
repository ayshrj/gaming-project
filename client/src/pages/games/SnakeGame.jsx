import React, { useState, useRef, useEffect } from "react";
import { useInterval } from "../../util/games/SnakeGameUseInterval";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons-react";
import "./SnakeGame.css";

const SnakeGame = ({ browserWindowWidth }) => {
  const [canvasSize, setCanvasSize] = useState([400, 400]);
  const [scale, setScale] = useState(20);
  const snakeStart = [
    [8, 7],
    [8, 8],
  ];
  const appleStart = [8, 3];
  const fixedSpeed = 300;
  const directions = {
    38: [0, -1], // up
    40: [0, 1], // down
    37: [-1, 0], // left
    39: [1, 0], // right
  };

  const canvasRef = useRef();
  const [snake, setSnake] = useState(snakeStart);
  const [apple, setApple] = useState(appleStart);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [currScore, setCurrScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (browserWindowWidth <= 768) {
      setCanvasSize([300, 300]);
      setScale(15);
    } else {
      setCanvasSize([400, 400]);
      setScale(20);
    }
  }, [browserWindowWidth]);

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const moveSnake = (direction) => {
    const newDir = directions[direction];
    if (dir[0] !== newDir[0] && dir[1] !== newDir[1]) {
      setDir(newDir);
    }
  };

  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (canvasSize[i] / scale)));

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * scale >= canvasSize[0] ||
      piece[0] < 0 ||
      piece[1] * scale >= canvasSize[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setCurrScore(currScore + 100);
      setHighScore(Math.max(currScore + 100, highScore));
      setApple(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setSnake(snakeStart);
    setApple(appleStart);
    setDir([0, -1]);
    setSpeed(fixedSpeed);
    setCurrScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "rgb(193, 82, 31)";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "hsl(0, 0%, 24%)";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver, scale]);

  return (
    <div
      role="button"
      tabIndex="0"
      onKeyDown={(e) => moveSnake(e.keyCode)}
      className="snake-game-container"
    >
      <h1>Snake Game</h1>
      <div className="snake-game-score-label">
        <div>{`Score: ${currScore}`}</div>
        <div>{`High Score: ${highScore}`}</div>
      </div>
      <canvas
        style={{ border: "1px solid black" }}
        ref={canvasRef}
        width={`${canvasSize[0]}px`}
        height={`${canvasSize[1]}px`}
      />
      <div className="snake-game-controls-container">
        <div className="snake-game-controls">
          <div onClick={startGame}>{gameOver ? "Restart" : "Start Game"}</div>
        </div>
        <div className="snake-game-controls">
          <div onClick={() => moveSnake(38)}>
            <IconArrowUp size={scale} />
          </div>
        </div>
        <div className="snake-game-controls">
          <div onClick={() => moveSnake(37)}>
            <IconArrowLeft size={scale} />
          </div>
          <div onClick={() => moveSnake(39)}>
            <IconArrowRight size={scale} />
          </div>
        </div>
        <div className="snake-game-controls">
          <div onClick={() => moveSnake(40)}>
            <IconArrowDown size={scale} />
          </div>
        </div>
      </div>
      {gameOver && <div>GAME OVER!</div>}
    </div>
  );
};

export default SnakeGame;
