import React, { useEffect, useState } from "react";

const RandomZigZag = ({
  givenHeight = 10,
  givenWidth = 300,
  givenMaxGap = 5,
  givenStrokeWidth = 2,
  givenColor = "currentColor",
}) => {
  const [randomLine, setRandomLine] = useState("");
  useEffect(() => {
    function generatePoints(width, height, maxGap) {
      let ans = `M${givenStrokeWidth},${height / 2} `;
      let points = [{ x: givenStrokeWidth, y: height / 2 }];
      let goingUp = true;

      while (points[points.length - 1].x < width - givenStrokeWidth) {
        let lastPoint = points[points.length - 1];
        let newX = lastPoint.x + Math.random() * maxGap;

        if (newX > width) {
          newX = width;
        }

        let newY;
        if (goingUp) {
          newY = lastPoint.y + Math.random() * (height - lastPoint.y);
          if (newY > height - givenStrokeWidth) {
            newY = height - givenStrokeWidth;
          }
        } else {
          newY = lastPoint.y - Math.random() * lastPoint.y;
          if (newY < givenStrokeWidth) {
            newY = givenStrokeWidth;
          }
        }

        points.push({ x: newX, y: newY });
        ans = ans + `${newX.toFixed(1)},${newY.toFixed(1)} `;
        goingUp = !goingUp;
        if (newX >= width) break;
      }

      return ans;
    }

    const points = generatePoints(givenWidth, givenHeight, givenMaxGap);
    setRandomLine(points);
  }, [givenHeight, givenWidth, givenMaxGap, givenStrokeWidth, givenColor]);

  return (
    randomLine !== "" && (
      <svg
        width={givenWidth}
        height={givenHeight}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={randomLine}
          stroke={givenColor}
          //   fill={`rgb(${Math.random(0) * 256}, ${Math.random(0) * 256}, ${
          //     Math.random(0) * 256
          //   })`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={givenStrokeWidth}
        />
      </svg>
    )
  );
};

export default RandomZigZag;
