import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconChessBoard from "../assets/games-icon/IconChessBoard.svg";
import IconNonogram from "../assets/games-icon/IconNonogram.svg";
import IconSnakeGame from "../assets/games-icon/IconSnakeGame.svg";
import IconSudoku from "../assets/games-icon/IconSudoku.svg";
import IconTetris from "../assets/games-icon/IconTetris.svg";
import IconRockPaperScissor from "../assets/games-icon/IconRockPaperScissor.svg";
import IconConcentration from "../assets/games-icon/IconConcentration.svg";
import IconDriverLicense from "../assets/games-icon/IconDriverLicense.svg";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import "./GamesColumn.css";

const GamesColumn = ({ browserWindowWidth }) => {
  const navigate = useNavigate();
  const [gameInfoOpen, setGameInfoOpen] = useState({
    sudoku: false,
    chess: false,
    tetris: false,
    snakeGame: false,
    nonogram: false,
    rockpaperscissor: false,
    concentration: false,
    driverlicense: false,
  });

  const handleGameInfo = (currentGameSelected) => {
    console.log(currentGameSelected);
    setGameInfoOpen((prevState) => ({
      sudoku: false,
      chess: false,
      tetris: false,
      snakeGame: false,
      nonogram: false,
      rockpaperscissor: false,
      concentration: false,
      driverlicense: false,
      [currentGameSelected]: !prevState[currentGameSelected],
    }));
  };
  return (
    <div className="column">
      <div
        className="column-text"
        onClick={() => navigate("/games")}
        style={{ cursor: "pointer" }}
      >
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
                    : "game-info-closed"
                }`}
                onClick={() => navigate("/games/sudoku")}
                src={IconSudoku}
                alt="IconSudoku"
              />
              <div>
                {gameInfoOpen.sudoku ? <IconChevronUp /> : <IconChevronDown />}
              </div>
            </div>
          </div>
          <div
            className={`game-info-text ${
              !gameInfoOpen.sudoku ? "no-display" : ""
            } ${browserWindowWidth < 1000 ? "game-info-right-margin" : ""}`}
          >
            <div>
              Sudoku is a logic-based, combinatorial number-placement puzzle.
              The objective is to fill a 9×9 grid with digits so that each
              column, each row, and each of the nine 3×3 subgrids that compose
              the grid contain all of the digits from 1 to 9.
            </div>
            <div>
              <br />
              Instructions:
              <ol>
                <li>The game starts with a partially filled grid. </li>
                <li>
                  Your task is to complete the grid while following the rules:
                  every row, column, and 3x3 box must contain the digits 1
                  through 9 without repetition.
                </li>
                <li>
                  {" "}
                  Select a cell and fill it with the correct number. The puzzle
                  is solved when all cells are filled correctly.
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
                    : "game-info-closed"
                }`}
                onClick={() => navigate("/games/chess")}
                src={IconChessBoard}
                alt="IconChessBoard"
              />
              <div>
                {gameInfoOpen.chess ? <IconChevronUp /> : <IconChevronDown />}
              </div>
            </div>
          </div>
          <div
            className={`game-info-text ${
              !gameInfoOpen.chess ? "no-display" : ""
            } ${browserWindowWidth < 1000 ? "game-info-right-margin" : ""}`}
          >
            <div>
              Chess is a two-player strategy board game played on a checkered
              board with 64 squares arranged in an 8×8 grid. Each player starts
              with 16 pieces: one king, one queen, two rooks, two knights, two
              bishops, and eight pawns, all move differently.
            </div>
            <div>
              <br />
              Instructions:
              <ol>
                <li>
                  The game is played on a square board divided into 8x8 squares.{" "}
                </li>
                <li>
                  Each type of piece has its own method of movement.
                  <ul>
                    <li>
                      <strong>Pawns</strong> move forward one square, but
                      capture diagonally.
                    </li>
                    <li>
                      <strong>Rooks</strong> move any number of squares along a
                      row or column.
                    </li>
                    <li>
                      <strong>Knights</strong> move in an 'L' shape.
                    </li>
                    <li>
                      <strong>Bishops</strong> move any number of squares
                      diagonally.
                    </li>
                    <li>
                      <strong>Queens</strong> move any number of squares along a
                      row, column, or diagonal.
                    </li>
                    <li>
                      <strong>Kings</strong> move one square in any direction.
                    </li>
                  </ul>
                </li>
                <li>
                  {" "}
                  The objective is to checkmate the opponent's king by placing
                  it under an inescapable threat of capture.
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
                    : "game-info-closed"
                }`}
                onClick={() => navigate("/games/tetris")}
                src={IconTetris}
                alt="IconTetris"
              />
              <div>
                {gameInfoOpen.tetris ? <IconChevronUp /> : <IconChevronDown />}
              </div>
            </div>
          </div>
          <div
            className={`game-info-text ${
              !gameInfoOpen.tetris ? "no-display" : ""
            } ${browserWindowWidth < 1000 ? "game-info-right-margin" : ""}`}
          >
            <div>
              Tetris is a tile-matching puzzle video game. The player must move
              and rotate falling tetrominoes (geometric shapes composed of four
              square blocks each) to complete horizontal lines, which then
              disappear.
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
                  Complete lines by filling every square within a single row.
                </li>
                <li>
                  {" "}
                  The game ends when the stack of tetrominoes reaches the top of
                  the playing field.
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
            <div onClick={() => navigate("/games/snakegame")}>Snake Game</div>
            <div
              className={`game-info-button ${
                gameInfoOpen.snakeGame ? "game-info-open" : ""
              }`}
            >
              <img
                className={`${
                  gameInfoOpen.snakeGame && browserWindowWidth > 1000
                    ? "game-info-open"
                    : "game-info-closed"
                }`}
                onClick={() => navigate("/games/snakegame")}
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
              Snake is a video game concept where the player maneuvers a line
              which grows in length, with the line itself being a primary
              obstacle.
            </div>
            <div>
              <br />
              Instructions:
              <ol>
                <li>Use arrow keys to control the direction of the snake.</li>
                <li>Eat the dots to grow in length.</li>
                <li>
                  {" "}
                  Avoid colliding with the walls or the snake's own body.
                </li>
                <li> The game ends when the snake hits a wall or itself.</li>
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
                    : "game-info-closed"
                }`}
                onClick={() => navigate("/games/nonogram")}
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
              Nonograms, also known as Picross or Griddlers, are picture logic
              puzzles in which cells in a grid must be colored or left blank
              according to numbers at the side of the grid to reveal a hidden
              picture.
            </div>
            <div>
              <br />
              Instructions:
              <ol>
                <li>
                  Look at the numbers at the end of the rows and columns. These
                  numbers tell you the runs of black squares in that row/column.
                </li>
                <li>Fill in squares according to the numbers.</li>
                <li>
                  {" "}
                  A number represents the length of the continuous run of
                  filled-in squares in a given row or column. A row or column
                  with more than one number indicates multiple sets of
                  continuous runs, separated by at least one blank square.
                </li>
                <li> Solve the puzzle by discovering the hidden image.</li>
              </ol>
            </div>
          </div>
        </div>
        <div
          className={`game-container ${
            gameInfoOpen.rockpaperscissor ? "game-info-open" : ""
          }`}
          onClick={() => handleGameInfo("rockpaperscissor")}
        >
          <div className="game-header">
            <div onClick={() => navigate("/games/rockpaperscissor")}>
              Rock Paper Scissor
            </div>
            <div
              className={`game-info-button ${
                gameInfoOpen.nonogram ? "game-info-open" : ""
              }`}
            >
              <img
                className={`${
                  gameInfoOpen.rockpaperscissor && browserWindowWidth > 1000
                    ? "game-info-open"
                    : "game-info-closed"
                }`}
                onClick={() => navigate("/games/rockpaperscissor")}
                src={IconRockPaperScissor}
                alt="IconRockPaperScissor"
              />
              <div>
                {gameInfoOpen.rockpaperscissor ? (
                  <IconChevronUp />
                ) : (
                  <IconChevronDown />
                )}
              </div>
            </div>
          </div>
          <div
            className={`game-info-text ${
              !gameInfoOpen.rockpaperscissor ? "no-display" : ""
            } ${browserWindowWidth < 1000 ? "game-info-right-margin" : ""}`}
          >
            <div>
              Rock Paper Scissors is a simple hand game usually played between
              two people, where each player simultaneously forms one of three
              shapes with an outstretched hand. The possible shapes are rock (a
              fist), paper (an open hand), and scissors (a fist with the index
              and middle fingers extended, forming a V). It has a simple set of
              rules that relies on the power dynamic between the shapes.
            </div>
            <div>
              <br />
              Instructions:
              <ol>
                <li>
                  Each player chooses one of the three shapes to form with their
                  hand, either rock, paper, or scissors. The choice is made at
                  the same time to keep the selection fair and random.
                </li>
                <li>
                  The winner is determined by the rules:
                  <ul>
                    <li>Rock crushes scissors (Rock wins against scissors).</li>
                    <li>Scissors cuts paper (Scissors win against paper).</li>
                    <li>Paper covers rock (Paper wins against rock).</li>
                  </ul>
                </li>
                <li>
                  {" "}
                  If both players choose the same shape, the game is tied, and
                  you may choose to play again.
                </li>
                <li>
                  {" "}
                  Decide in advance how many rounds you will play or set a win
                  condition (e.g., best of three or first to five wins).
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div
          className={`game-container ${
            gameInfoOpen.concentration ? "game-info-open" : ""
          }`}
          onClick={() => handleGameInfo("concentration")}
        >
          <div className="game-header">
            <div onClick={() => navigate("/games/concentration")}>
              Concentration
            </div>
            <div
              className={`game-info-button ${
                gameInfoOpen.concentration ? "game-info-open" : ""
              }`}
            >
              <img
                className={`${
                  gameInfoOpen.concentration && browserWindowWidth > 1000
                    ? "game-info-open"
                    : "game-info-closed"
                }`}
                onClick={() => navigate("/games/concentration")}
                src={IconConcentration}
                alt="IconConcentration"
              />
              <div>
                {gameInfoOpen.concentration ? (
                  <IconChevronUp />
                ) : (
                  <IconChevronDown />
                )}
              </div>
            </div>
          </div>
          <div
            className={`game-info-text ${
              !gameInfoOpen.concentration ? "no-display" : ""
            } ${browserWindowWidth < 1000 ? "game-info-right-margin" : ""}`}
          >
            <div>
              Concentration, also known as Memory, Match Up, or Pairs, is a card
              game where all of the cards are laid face down on a surface, and
              two cards are flipped face up over each turn. The objective of the
              game is to turn over pairs of matching cards. It's a simple memory
              game that can be played by a single player.
            </div>
            <div>
              <br />
              Instructions:
              <ol>
                <li>
                  {" "}
                  Start with all cards laid face down on the playing surface.
                </li>
                <li>
                  On each turn, the player flips over two cards, one at a time,
                  trying to make a match.
                </li>
                <li>
                  If the cards match (for example, two aces or two kings), they
                  are removed from the play area, and the player gets another
                  turn.
                </li>
                <li>
                  If the cards do not match, they are turned back face down, and
                  it's the next player's turn (in a multiplayer game) or the
                  same player's turn again (in a single-player version).
                </li>
                <li>
                  The objective is to remember the locations and positions of
                  cards that have been revealed to match pairs more easily.
                </li>
                <li>
                  The game is over when all pairs have been found. The goal is
                  to collect as many pairs as possible.
                </li>
                <li>
                  In a single-player game, you can challenge yourself by timing
                  your game and trying to find all pairs in the shortest time
                  possible or by reducing the number of turns it takes to
                  complete the game.
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div
          className={`game-container ${
            gameInfoOpen.driverlicense ? "game-info-open" : ""
          }`}
          onClick={() => handleGameInfo("driverlicense")}
        >
          <div className="game-header">
            <div onClick={() => navigate("/games/driverlicense")}>
              Driver License
            </div>
            <div
              className={`game-info-button ${
                gameInfoOpen.driverlicense ? "game-info-open" : ""
              }`}
            >
              <img
                className={`${
                  gameInfoOpen.driverlicense && browserWindowWidth > 1000
                    ? "game-info-open"
                    : "game-info-closed"
                }`}
                onClick={() => navigate("/games/driverlicense")}
                src={IconDriverLicense}
                alt="IconDriverLicense"
              />
              <div>
                {gameInfoOpen.driverlicense ? (
                  <IconChevronUp />
                ) : (
                  <IconChevronDown />
                )}
              </div>
            </div>
          </div>
          <div
            className={`game-info-text ${
              !gameInfoOpen.driverlicense ? "no-display" : ""
            } ${browserWindowWidth < 1000 ? "game-info-right-margin" : ""}`}
          >
            <div>Game General Info</div>
            <div>
              <br />
              Instructions:
              <ol>
                <li>Step 1</li>
                <li>Step 2</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesColumn;
