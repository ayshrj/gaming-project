import React, { useState, useEffect } from "react";

const TimerSVG = ({
  width,
  height,
  innerRadius,
  boundaryColor,
  boundaryClassText = "",
  fillerColor,
  fillerClassText = "",
  progressColor,
  progressClassText = "",
  progress,
}) => {
  const [progressLength, setProgressLength] = useState(
    ((width - 3 * innerRadius) * (100 - progress)) / 100
  );

  useEffect(() => {
    setProgressLength(((width - 3 * innerRadius) * (100 - progress)) / 100);
  }, [progress]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      <defs>
        <clipPath id="clipRect1">
          <rect
            x={innerRadius}
            y={innerRadius}
            width={width - 2 * innerRadius}
            height={height - 2 * innerRadius}
            rx={(height - 2 * innerRadius) / 2}
            ry={(height - 2 * innerRadius) / 2}
            fill="white"
          />
        </clipPath>
      </defs>

      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx={height / 2}
        ry={height / 2}
        fill={boundaryColor}
        className={boundaryClassText}
      />

      <rect
        x={innerRadius}
        y={innerRadius}
        width={width - 2 * innerRadius}
        height={height - 2 * innerRadius}
        rx={(height - 2 * innerRadius) / 2}
        ry={(height - 2 * innerRadius) / 2}
        fill={fillerColor}
        className={fillerClassText}
      />

      <rect
        x={innerRadius - progressLength / 2}
        y={innerRadius}
        width={width - 2 * innerRadius - progressLength / 2}
        height={height - 2 * innerRadius}
        rx={(height - 2 * innerRadius) / 2}
        ry={(height - 2 * innerRadius) / 2}
        fill={progressColor}
        className={progressClassText}
        clipPath="url(#clipRect1)"
      />
    </svg>
  );
};

export default TimerSVG;
