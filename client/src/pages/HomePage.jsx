import React, { useState, useEffect, useContext } from "react";
import "./HomePage.css";
import GetRandomFact from "../util/GetRandomFact";
import CurrentBadge1 from "../assets/badges/hierarchical/1-Hamlet.png";
import CurrentBadge2 from "../assets/badges/hierarchical/2-Barony.png";
import CurrentBadge3 from "../assets/badges/hierarchical/3-Domain.png";
import CurrentBadge4 from "../assets/badges/hierarchical/4-Province.png";
import CurrentBadge5 from "../assets/badges/hierarchical/5-Realm.png";
import CurrentBadge6 from "../assets/badges/hierarchical/6-Empire.png";
import Streak from "../components/Streak";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import IconChessBoard from "../assets/games-icon/IconChessBoard.svg";
import IconNonogram from "../assets/games-icon/IconNonogram.svg";
import IconSnakeGame from "../assets/games-icon/IconSnakeGame.svg";
import IconSudoku from "../assets/games-icon/IconSudoku.svg";
import IconTetris from "../assets/games-icon/IconTetris.svg";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

const HomePage = ({
  darkMode,
  myCurrentDays,
  currentStreak,
  highestStreak,
  targetStreak,
  browserWindowWidth,
}) => {
  const [randomFact, setRandomFact] = useState("");
  const [badge, setBadge] = useState(null);
  const [gameInfoOpen, setGameInfoOpen] = useState({
    sudoku: false,
    chess: false,
    tetris: false,
    snakeGame: false,
    nonogram: false,
  });

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setRandomFact(GetRandomFact());
  }, []);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const [randomSVG, setRandomSVG] = useState(null);

  // const targetStreak = 100;

  useEffect(() => {
    const getBadge = () => {
      if (highestStreak <= 7) setBadge(CurrentBadge1);
      else if (highestStreak <= 15) setBadge(CurrentBadge2);
      else if (highestStreak <= 30) setBadge(CurrentBadge3);
      else if (highestStreak <= 60) setBadge(CurrentBadge4);
      else if (highestStreak <= 120) setBadge(CurrentBadge5);
      else setBadge(CurrentBadge6);
    };

    getBadge();
  }, [highestStreak]);

  const handleGameInfo = (currentGameSelected) => {
    console.log(currentGameSelected);
    setGameInfoOpen((prevState) => ({
      sudoku: false,
      chess: false,
      tetris: false,
      snakeGame: false,
      nonogram: false,
      [currentGameSelected]: !prevState[currentGameSelected],
    }));
  };
  return (
    <div>
      <div className="welcome">
        <h2>
          Welcome
          {currentUser && currentUser.displayName
            ? `back, ${currentUser.displayName}`
            : " guest"}
        </h2>
        {randomSVG}
        <p>{randomFact.fact}</p>
      </div>
      <div className="row">
        <div className="column">
          <div className="column-text">Streak</div>
          {currentStreak !== null && targetStreak !== null ? (
            <Streak
              cx={150}
              cy={135}
              rx={100}
              ry={100}
              t1={Math.PI}
              Δ={(2 * currentStreak * Math.PI) / targetStreak}
              φ={0}
              stroke={"rgb(193, 82, 31)"}
              fillColor={"none"}
              strokeWidth={20}
              strokeLinecap={"round"}
              text={`${currentStreak}/${targetStreak}`}
              darkMode={darkMode}
            />
          ) : (
            <>
              <Streak
                cx={150}
                cy={135}
                rx={100}
                ry={100}
                t1={Math.PI}
                Δ={(2 * 1 * Math.PI) / 7}
                φ={0}
                stroke={"rgb(193, 82, 31)"}
                fillColor={"none"}
                strokeWidth={20}
                strokeLinecap={"round"}
                text={`${1}/${7} Days`}
                darkMode={darkMode}
              />
              <div style={{ fontSize: "9px" }}>
                Log In to continue your streak
              </div>
            </>
          )}
        </div>
        <div className="column">
          <div className="column-text">Badge</div>
          {highestStreak ? (
            <>
              <img src={badge} alt="Current Badge" />
              <div>{`Highest Streak: ${highestStreak} Day${
                highestStreak > 1 ? "s" : ""
              }`}</div>
            </>
          ) : (
            <>
              <img src={CurrentBadge1} alt="Current Badge" />
              <div>{`Highest Streak: 1 Day`}</div>
              <div style={{ fontSize: "9px", marginTop: "6px" }}>
                Log In to continue your streak
              </div>
            </>
          )}
        </div>
      </div>
      <div className="row">
        <div className="column">
          <div className="column-text" onClick={() => navigate("/games")}>
            Games
          </div>

          <div className="games">
            <div
              className={`game-container ${
                gameInfoOpen.sudoku ? "game-info-open" : ""
              }`}
              onClick={() => handleGameInfo("sudoku")}
            >
              <div className="game-header">
                <div onClick={() => navigate("/games/sudoku")}>Sudoku</div>
                <div
                  className={`game-info-button ${
                    gameInfoOpen.sudoku ? "game-info-open" : ""
                  }`}
                >
                  <img
                    className={`${
                      gameInfoOpen.sudoku && browserWindowWidth > 1000
                        ? "game-info-open"
                        : ""
                    }`}
                    src={IconSudoku}
                    alt="IconSudoku"
                  />
                  <div>
                    {gameInfoOpen.sudoku ? (
                      <IconChevronUp />
                    ) : (
                      <IconChevronDown />
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`game-info-text ${
                  !gameInfoOpen.sudoku ? "no-display" : ""
                } ${browserWindowWidth < 1000 ? "game-info-right-margin" : ""}`}
              >
                <div>
                  Sudoku is a logic-based, combinatorial number-placement
                  puzzle. The objective is to fill a 9×9 grid with digits so
                  that each column, each row, and each of the nine 3×3 subgrids
                  that compose the grid contain all of the digits from 1 to 9.
                </div>
                <div>
                  <br />
                  Instructions:
                  <ol>
                    <li>The game starts with a partially filled grid. </li>
                    <li>
                      Your task is to complete the grid while following the
                      rules: every row, column, and 3x3 box must contain the
                      digits 1 through 9 without repetition.
                    </li>
                    <li>
                      {" "}
                      Select a cell and fill it with the correct number. The
                      puzzle is solved when all cells are filled correctly.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div
              className={`game-container ${
                gameInfoOpen.chess ? "game-info-open" : ""
              }`}
              onClick={() => handleGameInfo("chess")}
            >
              <div className="game-header">
                <div onClick={() => navigate("/games/chess")}>Chess</div>
                <div
                  className={`game-info-button ${
                    gameInfoOpen.chess ? "game-info-open" : ""
                  }`}
                >
                  <img
                    className={`${
                      gameInfoOpen.chess && browserWindowWidth > 1000
                        ? "game-info-open"
                        : ""
                    }`}
                    src={IconChessBoard}
                    alt="IconChessBoard"
                  />
                  <div>
                    {gameInfoOpen.chess ? (
                      <IconChevronUp />
                    ) : (
                      <IconChevronDown />
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`game-info-text ${
                  !gameInfoOpen.chess ? "no-display" : ""
                } ${browserWindowWidth < 1000 ? "game-info-right-margin" : ""}`}
              >
                <div>
                  Chess is a two-player strategy board game played on a
                  checkered board with 64 squares arranged in an 8×8 grid. Each
                  player starts with 16 pieces: one king, one queen, two rooks,
                  two knights, two bishops, and eight pawns, all move
                  differently.
                </div>
                <div>
                  <br />
                  Instructions:
                  <ol>
                    <li>
                      The game is played on a square board divided into 8x8
                      squares.{" "}
                    </li>
                    <li>
                      Each type of piece has its own method of movement.
                      <ul>
                        <li>
                          Pawns move forward one square, but capture diagonally.
                        </li>
                        <li>
                          Rooks move any number of squares along a row or
                          column.
                        </li>
                        <li>Knights move in an 'L' shape.</li>
                        <li>Bishops move any number of squares diagonally.</li>
                        <li>
                          Queens move any number of squares along a row, column,
                          or diagonal.
                        </li>
                        <li>Kings move one square in any direction.</li>
                      </ul>
                    </li>
                    <li>
                      {" "}
                      The objective is to checkmate the opponent's king by
                      placing it under an inescapable threat of capture.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div
              className={`game-container ${
                gameInfoOpen.tetris ? "game-info-open" : ""
              }`}
              onClick={() => handleGameInfo("tetris")}
            >
              <div className="game-header">
                <div onClick={() => navigate("/games/tetris")}>Tetris</div>
                <div
                  className={`game-info-button ${
                    gameInfoOpen.tetris ? "game-info-open" : ""
                  }`}
                >
                  <img
                    className={`${
                      gameInfoOpen.tetris && browserWindowWidth > 1000
                        ? "game-info-open"
                        : ""
                    }`}
                    src={IconTetris}
                    alt="IconTetris"
                  />
                  <div>
                    {gameInfoOpen.tetris ? (
                      <IconChevronUp />
                    ) : (
                      <IconChevronDown />
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`game-info-text ${
                  !gameInfoOpen.tetris ? "no-display" : ""
                } ${browserWindowWidth < 1000 ? "game-info-right-margin" : ""}`}
              >
                <div>
                  Tetris is a tile-matching puzzle video game. The player must
                  move and rotate falling tetrominoes (geometric shapes composed
                  of four square blocks each) to complete horizontal lines,
                  which then disappear.
                </div>
                <div>
                  <br />
                  Instructions:
                  <ol>
                    <li>
                      Use arrow keys to move and rotate the tetrominoes as they
                      fall.
                    </li>
                    <li>
                      Complete lines by filling every square within a single
                      row.
                    </li>
                    <li>
                      {" "}
                      The game ends when the stack of tetrominoes reaches the
                      top of the playing field.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div
              className={`game-container ${
                gameInfoOpen.snakeGame ? "game-info-open" : ""
              }`}
              onClick={() => handleGameInfo("snakeGame")}
            >
              <div className="game-header">
                <div onClick={() => navigate("/games/snakegame")}>
                  Snake Game
                </div>
                <div
                  className={`game-info-button ${
                    gameInfoOpen.snakeGame ? "game-info-open" : ""
                  }`}
                >
                  <img
                    className={`${
                      gameInfoOpen.snakeGame && browserWindowWidth > 1000
                        ? "game-info-open"
                        : ""
                    }`}
                    src={IconSnakeGame}
                    alt="IconSnakeGame"
                  />
                  <div>
                    {gameInfoOpen.snakeGame ? (
                      <IconChevronUp />
                    ) : (
                      <IconChevronDown />
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`game-info-text ${
                  !gameInfoOpen.snakeGame ? "no-display" : ""
                } ${browserWindowWidth < 1000 ? "game-info-right-margin" : ""}`}
              >
                <div>
                  Snake is a video game concept where the player maneuvers a
                  line which grows in length, with the line itself being a
                  primary obstacle.
                </div>
                <div>
                  <br />
                  Instructions:
                  <ol>
                    <li>
                      Use arrow keys to control the direction of the snake.
                    </li>
                    <li>Eat the dots to grow in length.</li>
                    <li>
                      {" "}
                      Avoid colliding with the walls or the snake's own body.
                    </li>
                    <li>
                      {" "}
                      The game ends when the snake hits a wall or itself.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div
              className={`game-container ${
                gameInfoOpen.nonogram ? "game-info-open" : ""
              }`}
              onClick={() => handleGameInfo("nonogram")}
            >
              <div className="game-header">
                <div onClick={() => navigate("/games/nonogram")}>Nonogram</div>
                <div
                  className={`game-info-button ${
                    gameInfoOpen.nonogram ? "game-info-open" : ""
                  }`}
                >
                  <img
                    className={`${
                      gameInfoOpen.nonogram && browserWindowWidth > 1000
                        ? "game-info-open"
                        : ""
                    }`}
                    src={IconNonogram}
                    alt="IconNonogram"
                  />
                  <div>
                    {gameInfoOpen.nonogram ? (
                      <IconChevronUp />
                    ) : (
                      <IconChevronDown />
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`game-info-text ${
                  !gameInfoOpen.nonogram ? "no-display" : ""
                } ${browserWindowWidth < 1000 ? "game-info-right-margin" : ""}`}
              >
                <div>
                  Nonograms, also known as Picross or Griddlers, are picture
                  logic puzzles in which cells in a grid must be colored or left
                  blank according to numbers at the side of the grid to reveal a
                  hidden picture.
                </div>
                <div>
                  <br />
                  Instructions:
                  <ol>
                    <li>
                      Look at the numbers at the end of the rows and columns.
                      These numbers tell you the runs of black squares in that
                      row/column.
                    </li>
                    <li>Fill in squares according to the numbers.</li>
                    <li>
                      {" "}
                      A number represents the length of the continuous run of
                      filled-in squares in a given row or column. A row or
                      column with more than one number indicates multiple sets
                      of continuous runs, separated by at least one blank
                      square.
                    </li>
                    <li> Solve the puzzle by discovering the hidden image.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
