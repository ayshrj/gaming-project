import React from "react";

const SudokuGenerator = (
  { diff } // 0, 1, 2
) => {
  function makeSolvedSudoku() {
    class SudokuGenerator {
      constructor() {
        this.sudoku = [];
      }

      clear() {
        this.sudoku = [];
      }

      generateGrid() {
        this.clear();
        const squares = new Array(81).fill(null);
        const available = new Array(81)
          .fill()
          .map(() => Array.from({ length: 9 }, (_, i) => i + 1));
        let c = 0;

        while (c < 81) {
          if (available[c].length > 0) {
            const i = this.getRan(0, available[c].length - 1);
            const z = available[c][i];

            if (!this.conflicts(squares, this.createSquare(c, z))) {
              squares[c] = this.createSquare(c, z);
              available[c].splice(i, 1);
              c++;
            } else {
              available[c].splice(i, 1);
            }
          } else {
            for (let y = 1; y <= 9; y++) {
              available[c].push(y);
            }
            squares[c - 1] = null;
            c--;
          }
        }

        this.sudoku = squares;
      }

      getRan(lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
      }

      conflicts(currentValues, test) {
        for (const s of currentValues) {
          if (
            s &&
            ((s.Across !== 0 && s.Across === test.Across) ||
              (s.Down !== 0 && s.Down === test.Down) ||
              (s.Region !== 0 && s.Region === test.Region))
          ) {
            if (s.Value === test.Value) {
              return true;
            }
          }
        }
        return false;
      }

      createSquare(n, v) {
        n += 1;
        const square = {
          Across: this.getAcrossFromNumber(n),
          Down: this.getDownFromNumber(n),
          Region: this.getRegionFromNumber(n),
          Value: v,
          Index: n - 1,
        };
        return square;
      }

      getAcrossFromNumber(n) {
        const k = n % 9;
        return k === 0 ? 9 : k;
      }

      getDownFromNumber(n) {
        let k;
        if (this.getAcrossFromNumber(n) === 9) {
          k = Math.floor(n / 9);
        } else {
          k = Math.floor(n / 9) + 1;
        }
        return k;
      }

      getRegionFromNumber(n) {
        let k;
        const a = this.getAcrossFromNumber(n);
        const d = this.getDownFromNumber(n);

        if (1 <= a && a < 4 && 1 <= d && d < 4) {
          k = 1;
        } else if (4 <= a && a < 7 && 1 <= d && d < 4) {
          k = 2;
        } else if (7 <= a && a < 10 && 1 <= d && d < 4) {
          k = 3;
        } else if (1 <= a && a < 4 && 4 <= d && d < 7) {
          k = 4;
        } else if (4 <= a && a < 7 && 4 <= d && d < 7) {
          k = 5;
        } else if (7 <= a && a < 10 && 4 <= d && d < 7) {
          k = 6;
        } else if (1 <= a && a < 4 && 7 <= d && d < 10) {
          k = 7;
        } else if (4 <= a && a < 7 && 7 <= d && d < 10) {
          k = 8;
        } else if (7 <= a && a < 10 && 7 <= d && d < 10) {
          k = 9;
        }

        return k;
      }
    }

    const sudokuGenerator = new SudokuGenerator();
    sudokuGenerator.generateGrid();
    const generatedSudoku = sudokuGenerator.sudoku;

    const grid = Array.from({ length: 9 }, () => Array(9));

    generatedSudoku.forEach((item) => {
      const { Across, Down, Value } = item;
      grid[Down - 1][Across - 1] = Value;
    });

    return grid;
  }

  function makeSudokuWithRemovedBlocks(solvedSudo, difficulty) {
    function isSolvable(grid) {
      function isValid(num, row, col) {
        for (let i = 0; i < 9; i++) {
          if (grid[row][i] === num || grid[i][col] === num) {
            return false;
          }
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;

        for (let i = startRow; i < startRow + 3; i++) {
          for (let j = startCol; j < startCol + 3; j++) {
            if (grid[i][j] === num) {
              return false;
            }
          }
        }

        return true;
      }

      function solve() {
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
              for (let num = 1; num <= 9; num++) {
                if (isValid(num, row, col)) {
                  grid[row][col] = num;

                  if (solve()) {
                    return true;
                  }

                  grid[row][col] = 0;
                }
              }
              return false;
            }
          }
        }
        return true;
      }

      if (solve()) {
        return true;
      } else {
        return false;
      }
    }

    let isSol = false;
    let unsolvedSudoku;
    let noOfTry = 0;

    while (!isSol && noOfTry < 50) {
      unsolvedSudoku = solvedSudo.map((innerArray) => [...innerArray]);
      let removedBlocks;

      if (difficulty === 0) {
        //easy
        removedBlocks = 50 + Math.floor(Math.random() * 11);
      } else if (difficulty === 1) {
        //medium
        removedBlocks = 60 + Math.floor(Math.random() * 6);
      } else {
        //hard
        removedBlocks = 65 + Math.floor(Math.random() * 6);
      }

      while (removedBlocks) {
        const curri = Math.floor(Math.random() * 9);
        const currj = Math.floor(Math.random() * 9);

        if (unsolvedSudoku[curri][currj] !== 0) {
          unsolvedSudoku[curri][currj] = 0;
          removedBlocks--;
        }
      }
      ++noOfTry;

      const unsolvedSudokuCopy = unsolvedSudoku.map((innerArray) => [
        ...innerArray,
      ]);

      isSol = isSolvable(unsolvedSudokuCopy);
      if (isSol === true) {
        return unsolvedSudoku;
      }
    }

    return NULL;
  }

  const solvedSudo = makeSolvedSudoku();
  const unsolvedSudo = makeSudokuWithRemovedBlocks(solvedSudo, diff);

  return {
    solvedSudo: solvedSudo,
    unsolvedSudo: unsolvedSudo,
  };
};

export default SudokuGenerator;
