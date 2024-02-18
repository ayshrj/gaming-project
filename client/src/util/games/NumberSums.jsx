import React from "react";

const NumberSums = ({
  size,
  difficulty, // 0, 1, 2
}) => {
  function fillRandomNumbers(size) {
    let array = new Array(size);
    for (let i = 0; i < size; i++) {
      array[i] = new Array(size);
    }

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        array[i][j] = Math.floor(Math.random() * 9) + 1;
      }
    }

    return array;
  }

  function selectRandomNumber(size, difficulty) {
    let array = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => 0)
    );

    let threshold = 0;
    if (difficulty === 0) {
      threshold = 0.4;
    } else if (difficulty === 1) {
      threshold = 0.3;
    } else if (difficulty === 2) {
      threshold = 0.2;
    }

    let numToFill = Math.floor(size * size * threshold);

    for (let i = 0; i < numToFill; ) {
      let row = Math.floor(Math.random() * size);
      let col = Math.floor(Math.random() * size);

      if (array[row][col] !== 1) {
        array[row][col] = 1;
        ++i;
      }
    }

    return array;
  }

  const board = fillRandomNumbers(size);
  const mask = selectRandomNumber(size, difficulty);

  let rowClues = [];
  let colClues = [];

  for (let i = 0; i < size; ++i) {
    let currSumRow = 0;
    let currSumCol = 0;
    for (let j = 0; j < size; ++j) {
      currSumRow += mask[i][j] * board[i][j];
      currSumCol += mask[j][i] * board[j][i];
    }
    rowClues.push(currSumRow);
    colClues.push(currSumCol);
  }

  return {
    board: board,
    mask: mask,
    rowClues: rowClues,
    colClues: colClues,
  };
};

export default NumberSums;
