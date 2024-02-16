import React from "react";

const NonogramGenerator = (size) => {
  const makeSolvedNono = (size) => {
    let solved = [];
    for (let i = 0; i < size; i++) {
      let col = [];
      for (let j = 0; j < size; j++) {
        let randomBool = Math.random() >= 0.5 ? 1 : 0;
        col.push(randomBool);
      }
      solved.push(col);
    }

    return solved;
  };

  const makeNonoPuzzle = (size) => {
    let rowcolofnono = [];

    let solved = makeSolvedNono(size);

    function fillArray(a) {
      // Find the length of the longest subarray in a
      const maxLength = Math.max(...a.map((subarray) => subarray.length));

      // Create a new array c filled with subarrays
      const c = a.map((subarray) => {
        const copy = Array(maxLength).fill(0); // Create an array of zeros with the maximum length
        for (let i = 0; i < subarray.length; i++) {
          copy[maxLength - subarray.length + i] = subarray[i]; // Copy elements from a to c with left-side padding
        }
        return copy;
      });

      return c;
    }

    const getContinuousLinesOfNono = (matrix) => {
      const n = matrix.length;
      const colResult = [];
      const rowResult = [];
      let maxColSize = 0;
      let maxRowSize = 0;

      for (let i = 0; i < n; i++) {
        let rowCount = 0;
        let rowContinuousLines = [];
        let colCount = 0;
        let colContinuousLines = [];

        for (let j = 0; j < n; j++) {
          // Check rows
          if (matrix[i][j] === 1) {
            rowCount++;
          } else if (rowCount > 0) {
            rowContinuousLines.push(rowCount);
            rowCount = 0;
          }
          maxRowSize = Math.max(maxRowSize, rowContinuousLines.length);

          // Check columns
          if (matrix[j][i] === 1) {
            colCount++;
          } else if (colCount > 0) {
            colContinuousLines.push(colCount);
            colCount = 0;
          }
          maxColSize = Math.max(maxColSize, colContinuousLines.length);
        }

        if (rowCount > 0) {
          rowContinuousLines.push(rowCount);
        }
        if (colCount > 0) {
          colContinuousLines.push(colCount);
        }

        maxRowSize = Math.max(maxRowSize, rowContinuousLines.length);
        maxColSize = Math.max(maxColSize, colContinuousLines.length);

        rowResult.push(rowContinuousLines);
        colResult.push(colContinuousLines);
      }

      return [colResult, rowResult, maxColSize, maxRowSize];
    };

    rowcolofnono = getContinuousLinesOfNono(solved);

    return {
      grid: solved,
      colClues: fillArray(rowcolofnono[0]),
      rowClues: fillArray(rowcolofnono[1]),
      maxCol: rowcolofnono[2],
      maxRow: rowcolofnono[3],
      nonogramSize: size,
    };
  };

  return makeNonoPuzzle(size);
};

export default NonogramGenerator;
