const CardGenerator = ({
  type,
  rank,
  color = "currentColor",
  size = 200,
  thick = 1.3,
  fillColor = "none",
  classText = "card",
}) => {
  const dBorder = `M${thick / 2} ${
    thick / 2
  }m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v18a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z`;

  if (
    rank !== "A" &&
    rank !== "Ace" &&
    rank !== "K" &&
    rank !== "King" &&
    rank !== "Q" &&
    rank !== "Queen" &&
    rank !== "J" &&
    rank !== "Jack" &&
    rank !== "2" &&
    rank !== "3" &&
    rank !== "4" &&
    rank !== "5" &&
    rank !== "6" &&
    rank !== "7" &&
    rank !== "8" &&
    rank !== "9" &&
    rank !== "10"
  ) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`${classText} card-default`}
        width={0.75 * size}
        height={size}
        viewBox={`0 0 ${thick + 18} ${thick + 24}`}
        strokeWidth={thick}
        stroke={color}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dBorder} />
        <g
          transform="scale(0.5) translate(7,11)"
          stroke={"none"}
          fill="currentColor"
        >
          <path d="M16.65 5.71875H7.35C4.4 5.71875 2 8.11875 2 11.0687V16.6488C2 19.5988 4.4 21.9988 7.35 21.9988H16.65C19.6 21.9988 22 19.5988 22 16.6488V11.0687C22 8.11875 19.6 5.71875 16.65 5.71875ZM14.5 12.0188C14.5 11.4688 14.95 11.0188 15.5 11.0188C16.05 11.0188 16.5 11.4688 16.5 12.0188C16.5 12.5688 16.05 13.0287 15.5 13.0287C14.95 13.0287 14.5 12.5888 14.5 12.0388V12.0188ZM10.13 16.0688C9.98 16.2188 9.79 16.2888 9.6 16.2888C9.41 16.2888 9.22 16.2188 9.07 16.0688L8.04 15.0387L7.05 16.0288C6.9 16.1788 6.71 16.2488 6.52 16.2488C6.33 16.2488 6.14 16.1788 5.99 16.0288C5.7 15.7388 5.7 15.2587 5.99 14.9688L6.98 13.9788L6.02 13.0188C5.73 12.7288 5.73 12.2488 6.02 11.9588C6.31 11.6688 6.79 11.6688 7.08 11.9588L8.04 12.9188L9.03 11.9288C9.32 11.6388 9.8 11.6388 10.09 11.9288C10.38 12.2188 10.38 12.6988 10.09 12.9887L9.1 13.9788L10.13 15.0088C10.42 15.2988 10.42 15.7788 10.13 16.0688ZM13.54 14.9988C12.99 14.9988 12.53 14.5488 12.53 13.9988C12.53 13.4488 12.97 12.9988 13.52 12.9988H13.54C14.09 12.9988 14.54 13.4488 14.54 13.9988C14.54 14.5488 14.1 14.9988 13.54 14.9988ZM15.5 16.9688C14.95 16.9688 14.5 16.5288 14.5 15.9788V15.9587C14.5 15.4087 14.95 14.9587 15.5 14.9587C16.05 14.9587 16.5 15.4087 16.5 15.9587C16.5 16.5087 16.06 16.9688 15.5 16.9688ZM17.48 14.9988C16.93 14.9988 16.47 14.5488 16.47 13.9988C16.47 13.4488 16.91 12.9988 17.46 12.9988H17.48C18.03 12.9988 18.48 13.4488 18.48 13.9988C18.48 14.5488 18.04 14.9988 17.48 14.9988Z" />
          <path d="M13.6394 2.71L13.6294 3.65C13.6194 4.53 12.8894 5.26 11.9994 5.26C11.8494 5.26 11.7594 5.36 11.7594 5.49C11.7594 5.62 11.8594 5.72 11.9894 5.72H10.3794C10.3694 5.65 10.3594 5.57 10.3594 5.49C10.3594 4.59 11.0894 3.86 11.9794 3.86C12.1294 3.86 12.2294 3.76 12.2294 3.63L12.2394 2.69C12.2494 2.31 12.5594 2 12.9394 2H12.9494C13.3394 2 13.6394 2.32 13.6394 2.71Z" />
        </g>
      </svg>
    );
  }
  const dType = (() => {
    switch (type) {
      case "club":
        return "M12 3a4 4 0 0 1 3.164 6.447a4 4 0 1 1 -1.164 6.198v1.355l1 4h-6l1 -4l0 -1.355a4 4 0 1 1 -1.164 -6.199a4 4 0 0 1 3.163 -6.446z";
      case "diamond":
        return "M10.831 20.413l-5.375 -6.91c-.608 -.783 -.608 -2.223 0 -3l5.375 -6.911a1.457 1.457 0 0 1 2.338 0l5.375 6.91c.608 .783 .608 2.223 0 3l-5.375 6.911a1.457 1.457 0 0 1 -2.338 0z";
      case "heart":
        return "M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572";
      case "spade":
        return "M12 3l4.919 4.5c.61 .587 1.177 1.177 1.703 1.771a5.527 5.527 0 0 1 .264 6.979c-1.18 1.56 -3.338 1.92 -4.886 .75v1l1 3h-6l1 -3v-1c-1.54 1.07 -3.735 .772 -4.886 -.75a5.527 5.527 0 0 1 .264 -6.979a30.883 30.883 0 0 1 1.703 -1.771a1541.72 1541.72 0 0 1 4.919 -4.5z";
      default:
        return "";
    }
  })();

  if (rank === "A" || rank === "Ace") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`${classText} card-${type}-${rank}`}
        width={0.75 * size}
        height={size}
        viewBox={`0 0 ${thick + 18} ${thick + 24}`}
        strokeWidth={thick}
        stroke={color}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dBorder} />

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 1
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M7 20v-12a4 4 0 0 1 4 -4h2a4 4 0 0 1 4 4v12" />
          <path d="M7 13l10 0" />
        </g>

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 3
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 7
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M7 20v-12a4 4 0 0 1 4 -4h2a4 4 0 0 1 4 4v12" />
          <path d="M7 13l10 0" />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 9
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 5.5}, ${
            thick / 2 + 8
          }) scale(0.3)`}
        >
          <path id={type} d={dType} />
        </g>
      </svg>
    );
  } else if (rank === "K" || rank === "King") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`${classText} card-${type}-${rank}`}
        width={0.75 * size}
        height={size}
        viewBox={`0 0 ${thick + 18} ${thick + 24}`}
        strokeWidth={thick}
        stroke={color}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dBorder} />

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 1
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M7 4l0 16" />
          <path d="M7 12h2l8 -8" />
          <path d="M9 12l8 8" />
        </g>

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 3
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 7
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M7 4l0 16" />
          <path d="M7 12h2l8 -8" />
          <path d="M9 12l8 8" />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 9
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 5.5}, ${
            thick / 2 + 8
          }) scale(0.3)`}
        >
          <path d="M15 19v-2a3 3 0 0 0 -6 0v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-14h4v3h3v-3h4v3h3v-3h4v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
          <path d="M3 11l18 0" />
        </g>
      </svg>
    );
  } else if (rank === "Q" || rank === "Queen") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`${classText} card-${type}-${rank}`}
        width={0.75 * size}
        height={size}
        viewBox={`0 0 ${thick + 18} ${thick + 24}`}
        strokeWidth={thick}
        stroke={color}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dBorder} />

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 1
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M18 9a5 5 0 0 0 -5 -5h-2a5 5 0 0 0 -5 5v6a5 5 0 0 0 5 5h2a5 5 0 0 0 5 -5v-6" />
          <path d="M13 15l5 5" />
        </g>

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 3
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 7
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M18 9a5 5 0 0 0 -5 -5h-2a5 5 0 0 0 -5 5v6a5 5 0 0 0 5 5h2a5 5 0 0 0 5 -5v-6" />
          <path d="M13 15l5 5" />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 9
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 5.5}, ${
            thick / 2 + 8
          }) scale(0.3)`}
        >
          <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
        </g>
      </svg>
    );
  } else if (rank === "J" || rank === "Jack") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`${classText} card-${type}-${rank}`}
        width={0.75 * size}
        height={size}
        viewBox={`0 0 ${thick + 18} ${thick + 24}`}
        strokeWidth={thick}
        stroke={color}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dBorder} />

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 1
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M17 4v12a4 4 0 0 1 -4 4h-2a4 4 0 0 1 -4 -4" />
        </g>

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 3
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 7
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M17 4v12a4 4 0 0 1 -4 4h-2a4 4 0 0 1 -4 -4" />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 9
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 5.5}, ${
            thick / 2 + 8
          }) scale(0.3)`}
        >
          <path d="M4 20h16" />
          <path d="M20 16v-10a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v10l4 -6c2.667 1.333 5.333 1.333 8 0l4 6z" />
        </g>
      </svg>
    );
  } else if (rank === "2") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`${classText} card-${type}-${rank}`}
        width={0.75 * size}
        height={size}
        viewBox={`0 0 ${thick + 18} ${thick + 24}`}
        strokeWidth={thick}
        stroke={color}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dBorder} />

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 1
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M8 8a4 4 0 1 1 8 0c0 1.098 -.564 2.025 -1.159 2.815l-6.841 9.185h8" />
        </g>

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 3
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 7
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M8 8a4 4 0 1 1 8 0c0 1.098 -.564 2.025 -1.159 2.815l-6.841 9.185h8" />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 9
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 6.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${thick / 2 + 17.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>
      </svg>
    );
  } else if (rank === "3") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`${classText} card-${type}-${rank}`}
        width={0.75 * size}
        height={size}
        viewBox={`0 0 ${thick + 18} ${thick + 24}`}
        strokeWidth={thick}
        stroke={color}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dBorder} />

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 1
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M12 12a4 4 0 1 0 -4 -4" />
          <path d="M8 16a4 4 0 1 0 4 -4" />
        </g>

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 3
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 7
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M12 12a4 4 0 1 0 -4 -4" />
          <path d="M8 16a4 4 0 1 0 4 -4" />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 9
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 6.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 6.5}, ${
            thick / 2 + 9.5
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${thick / 2 + 17.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>
      </svg>
    );
  } else if (rank === "4") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`${classText} card-${type}-${rank}`}
        width={0.75 * size}
        height={size}
        viewBox={`0 0 ${thick + 18} ${thick + 24}`}
        strokeWidth={thick}
        stroke={color}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dBorder} />

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 1
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M15 20v-15l-8 11h10" />
        </g>

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 3
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 7
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M15 20v-15l-8 11h10" />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 9
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 9.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 3.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 21.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 15.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>
      </svg>
    );
  } else if (rank === "5") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`${classText} card-${type}-${rank}`}
        width={0.75 * size}
        height={size}
        viewBox={`0 0 ${thick + 18} ${thick + 24}`}
        strokeWidth={thick}
        stroke={color}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dBorder} />

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 1
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M8 20h4a4 4 0 1 0 0 -8h-4v-8h8" />
        </g>

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 3
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 7
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M8 20h4a4 4 0 1 0 0 -8h-4v-8h8" />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 9
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 9.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 3.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 6.5}, ${
            thick / 2 + 9.5
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 21.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 15.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>
      </svg>
    );
  } else if (rank === "6") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`${classText} card-${type}-${rank}`}
        width={0.75 * size}
        height={size}
        viewBox={`0 0 ${thick + 18} ${thick + 24}`}
        strokeWidth={thick}
        stroke={color}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dBorder} />

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 1
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M8 16a4 4 0 1 0 8 0v-1a4 4 0 1 0 -8 0" />
          <path d="M16 8a4 4 0 1 0 -8 0v8" />
        </g>

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 3
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 7
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M8 16a4 4 0 1 0 8 0v-1a4 4 0 1 0 -8 0" />
          <path d="M16 8a4 4 0 1 0 -8 0v8" />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 9
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 9.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 3.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 3.5}, ${
            thick / 2 + 9.5
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 9.5}, ${
            thick / 2 + 9.5
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 21.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 15.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>
      </svg>
    );
  } else if (rank === "7") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`${classText} card-${type}-${rank}`}
        width={0.75 * size}
        height={size}
        viewBox={`0 0 ${thick + 18} ${thick + 24}`}
        strokeWidth={thick}
        stroke={color}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dBorder} />

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 1
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M8 4h8l-4 16" />
        </g>

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 3
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 7
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M8 4h8l-4 16" />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 9
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 9.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 3.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 3.5}, ${
            thick / 2 + 9.5
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${6.5 + thick / 2}, ${
            thick / 2 + 5
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 9.5}, ${
            thick / 2 + 9.5
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 21.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 15.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>
      </svg>
    );
  } else if (rank === "8") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`${classText} card-${type}-${rank}`}
        width={0.75 * size}
        height={size}
        viewBox={`0 0 ${thick + 18} ${thick + 24}`}
        strokeWidth={thick}
        stroke={color}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dBorder} />

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 1
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M12 8m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M12 16m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        </g>

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 3
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 7
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M12 8m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M12 16m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 9
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 9.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 3.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 3.5}, ${
            thick / 2 + 9.5
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${6.5 + thick / 2}, ${
            thick / 2 + 5
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 9.5}, ${
            thick / 2 + 9.5
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 18.75}, ${
            -thick / 2 + 11
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 21.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 15.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>
      </svg>
    );
  } else if (rank === "9") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`${classText} card-${type}-${rank}`}
        width={0.75 * size}
        height={size}
        viewBox={`0 0 ${thick + 18} ${thick + 24}`}
        strokeWidth={thick}
        stroke={color}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dBorder} />

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 1
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M16 8a4 4 0 1 0 -8 0v1a4 4 0 1 0 8 0" />
          <path d="M8 16a4 4 0 1 0 8 0v-8" />
        </g>

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 3
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 7
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M16 8a4 4 0 1 0 -8 0v1a4 4 0 1 0 8 0" />
          <path d="M8 16a4 4 0 1 0 8 0v-8" />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 9
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 9.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 3.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 3.5}, ${
            thick / 2 + 7
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${6.5 + thick / 2}, ${
            thick / 2 + 5
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 9.5}, ${
            thick / 2 + 7
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 21.75}, ${
            -thick / 2 + 13
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 15.75}, ${
            -thick / 2 + 13
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 21.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 15.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>
      </svg>
    );
  } else if (rank === "10") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`${classText} card-${type}-${rank}`}
        width={0.75 * size}
        height={size}
        viewBox={`0 0 ${thick + 18} ${thick + 24}`}
        strokeWidth={thick}
        stroke={color}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={dBorder} />

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 1
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M8 20v-16l-5 5" />
          <path d="M17 20a4 4 0 0 0 4 -4v-8a4 4 0 1 0 -8 0v8a4 4 0 0 0 4 4z" />
        </g>

        <g
          transform={`translate(${thick / 2 + 0.7}, ${
            thick / 2 + 3
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 7
          }) scale(0.1)`}
          strokeWidth="2"
        >
          <path d="M8 20v-16l-5 5" />
          <path d="M17 20a4 4 0 0 0 4 -4v-8a4 4 0 1 0 -8 0v8a4 4 0 0 0 4 4z" />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 12.7}, ${
            -thick / 2 + 9
          }) scale(0.1)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 9.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 3.5}, ${
            thick / 2 + 2
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 3.5}, ${
            thick / 2 + 7
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${6.5 + thick / 2}, ${
            thick / 2 + 5
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`translate(${thick / 2 + 9.5}, ${
            thick / 2 + 7
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 21.75}, ${
            -thick / 2 + 13
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 15.75}, ${
            -thick / 2 + 13
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 18.75}, ${
            -thick / 2 + 10.5
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 21.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>

        <g
          transform={`rotate(180, 15, 15) translate(${-thick / 2 + 15.75}, ${
            -thick / 2 + 8
          }) scale(0.2)`}
        >
          <path id={type} d={dType} />
        </g>
      </svg>
    );
  }
};

export default CardGenerator;
