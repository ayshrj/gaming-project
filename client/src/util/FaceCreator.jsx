import React, { useState, useEffect } from "react";

const FaceCreator = ({
  hair = 1, //From 0 to 9
  height = null,
  width = null,
  skinBorder = "#000000",
  skinColor = "#c39582",
  hairFill = "#000000",
  hairStroke = "#131313",
  shirt = 1, //From 0 to 7
  shirtFill = "#af2525",
  shirtStroke = "#00ff00",
  shirtDesign = "#ffffff",
  mouth = 1, //From 0 to 6
  mouthFill = "#ff2993",
  nose = 2, //From 0 to 7
  eye = 1, //From 0 to 4
  eyebrow = 1, //From 0 to 5
  accessory = 1, //From 0 to 3
  accessoryStroke = "#7608fe",
}) => {
  const giveBodySvg = () => {
    return (
      <path
        id="body"
        fill={skinColor}
        stroke={skinBorder}
        strokeMiterlimit="100"
        d="m35 115c0 0-1.6-25.3 21-22 0-3.6 0-6.1 0-7.9 2.6 0.1 7.4 0.2 12-0.1v8c0 0 18-5 20 22-52.8 0-53 0-53 0z"
      />
    );
  };

  const giveFaceSvg = () => {
    return (
      <path
        id="main-face"
        fill={skinColor}
        stroke={skinBorder}
        strokeMiterlimit="100"
        d="m36 58c0 0-1.3-19.3 4-24 5.3-4.7 13.5-9 28-7 14.5 2 16 13 16 13-0.3 0.8-0.1 12 0 15 0.1 3-1.1 15-1 17 0.1 2-0.9 10.1-8 12-7.1 1.9-21 1-21 1 0 0-10.1-4.9-12-10-1.9-5.1-6-17-6-17z"
      />
    );
  };

  const giveEarSvg = () => {
    return (
      <>
        <g id="left-ear">
          <path
            id="left-ear-edge"
            fillRule="evenodd"
            fill={skinColor}
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m40 70c0 0-3.2 1.1-5 1-1.8-0.1-4.8-3.5-6-6-1.2-2.5 0.7-7 2-8 1.2-0.9 4.3-1 4.9-1 0 1.2 0.1 2 0.1 2 0 0 2.2 6.5 4.1 11.9q-0.1 0.1-0.1 0.1z"
          />
          <path
            id="left-ear-line"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m36 60c0 0-3.7-0.2-4 3"
          />
        </g>
        <g id="right-ear">
          <path
            id="right-ear-edge"
            fillRule="evenodd"
            fill={skinColor}
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m84 56c0 0 7.8-0.2 8 3 0.2 3.2 0.4 7.1-2 9-2.3 1.8-6.4 2-6.9 2 0.2-3.7 0.8-10.8 0.9-14q0 0 0 0z"
          />
          <path
            id="right-ear-line"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m84 60c0 0 5.8-0.8 6 2"
          />
        </g>
      </>
    );
  };

  const giveHairSvg = () => {
    if (hair === 9) {
      return (
        <g id="hair9-container">
          <path
            id="hair9"
            fillRule="evenodd"
            fill={hairFill}
            stroke={hairStroke}
            strokeMiterlimit="100"
            strokeWidth="2"
            d="m36 58c0 0-0.3-5.1 0-10.7 4 1.1 18.3 3.7 26-13.3 11.7 17.5 18.9 14.2 21.8 12.6 0.1 3.3 0.2 6.9 0.2 8.4 0.1 3-1.1 15-1 17 0.1 2-0.9 10.1-8 12-7.1 1.9-21 1-21 1 0 0-10.1-4.9-12-10-1.9-5.1-6-17-6-17zm48 28c2.5 1.7 7 1.1 8 1 1-0.1-1-7.1-2-13-1-5.9-2.4-10.2 1-19 0-5.6 1.7-21.6-3-27-4.7-5.4-17-5.7-26-4-10.5 0.1-11-4.7-22 1-12 6.1-7.7 26.2-8 38-0.3 11.8-3.7 25.1-1 25 1.2 6.6 1.7-0.5 1 6-0.7 6.5 3.8 12.1 8 12 4.2-0.1 7.4 3.1 23-2 10.2 3.7 22-3 22-3 0 0 4.1-8.5-1-15z"
          />
        </g>
      );
    } else if (hair === 8) {
      return (
        <g id="hair8-container">
          <path
            id="hair8"
            fill={hairFill}
            stroke={hairStroke}
            strokeMiterlimit="100"
            strokeWidth="2"
            d="m47 29c0 0 8.8 0.3 13 6 12.5 0 11 0 11 0l3-19h-15c0 0-12.9 4-12 13z"
          />
        </g>
      );
    } else if (hair === 7) {
      return (
        <g id="hair7-container">
          <path
            id="hair7"
            fillRule="evenodd"
            fill={hairFill}
            stroke={hairStroke}
            strokeMiterlimit="100"
            d="m51 22c0 0-2.3 0.2-4.7 0.8-2.3 0.9-3.8 1.7-4.3 2.2-1.6 1.7-1.9 4.4-2 5.9q0 0.1 0 0.1 0 0 0 0c0 0.6 0 1 0 1 0 0-4.1 1.6-6 2q-0.5 0.1-1.2 0.1c-2.1 1.5-3.8 3.4-3.8 5.9 0 6.3 2.7 13 4 15 1.3 2 1 7 1 7l4-7c0 0 2.3-7 1-11 11.4-4.4 5.2 0.3 11-8 17.2 12.7 34 8 34 8v18l5-4c0 0 0-14 0-17 4.4-8.4 4.6-13.3-3-17-12.3-6.9-26.3-5.3-35.2-2.7zm-24 6c0.4-6.3 3.1-12.2 10-15 7-2.7 12 1 12 1l1.9 7.3c-1.7 0.5-3.3 1-4.5 1.5-1.7 0.5-3.4 1.2-4.4 2.2-2.1 1.9-2 5.3-2 5.9q0 0.1 0 0.1c-0.2 0.1-4 1.1-7.1 3.2-2.4 0-6.2-0.9-5.9-6.2z"
          />
        </g>
      );
    } else if (hair === 6) {
      return (
        <g id="hair6-container">
          <path
            id="hair6"
            fill={hairFill}
            stroke={hairStroke}
            strokeMiterlimit="100"
            strokeWidth="2"
            d="m37 59l-5-1c-1-2.2-5-18.7 5-22 0.7-26 20.8-14.5 21-12 27.2-8.5 29 2.4 31 6 16.9 1-1 14-1 14 0 0 1.8 14 1 16-0.8 2-4 1-4 1l-4-15c0 0-7.2 0.3-10-2-1.3 7.3-13-1-13-1 0 0-7.8 3.6-14.3 0.2-1.5 15.7-6.4 14.8-6.7 15.8z"
          />
        </g>
      );
    } else if (hair === 5) {
      return (
        <g id="hair5-container">
          <path
            id="hair5"
            fillRule="evenodd"
            fill={hairFill}
            stroke={hairStroke}
            strokeMiterlimit="100"
            strokeWidth="2"
            d="m35 60c-1.1 2.2 3 10 3 10 0 0 1.6 6.4-3.7 7.4-5.4 1-7.4-1.5-9.3-8.4-2.1 0.5-18.1-7.4-10-22-1.2-2.2-7.1-15.7 7-24 0.4-11.2 16-8 16-8 0 0 7.1-16.3 22-6 2.6-2.2 16.8-13.5 23 3 24.7-0.3 13 17 13 17 0 0 15.7 6.7 7 18 3.7 1.5 7.8 14.6-3 19-2.8 7.9-3.8 5.2-6 6-1.6 0.6-1.9 1.3-2 1.7-0.1-0.3-1.1-0.6-6.1 2.1-4.7 1.9-1.9-5.8-1.9-5.8v-10c0 0 0.1-6.4-1-9-1.1-2.6-8.7-7.4-25-8-16.3-0.6-21 14-21 14 0 0-0.9 0.8-2 3zm57 14c0 0 0-0.1 0-0.3 0.1 0.2 0 0.3 0 0.3zm-53-30c0 0 12.3-13.8 45-1-13.9-20.1-38.4-9.7-42-6-3.6 3.7-3 7-3 7z"
          />
        </g>
      );
    } else if (hair === 4) {
      return (
        <g id="hair4-container">
          <path
            id="hair4"
            fillRule="evenodd"
            fill={hairFill}
            stroke={hairStroke}
            strokeMiterlimit="100"
            strokeWidth="2"
            d="m35 57c-3.3 0.4-2.8-1.4-4-7-1.2-5.6 2-8 2-8 0 0 0.3-0.2 1-0.6q0 0.2 0 0.3c1-0.8 5.9-3.1 12.9-4.5 9.6-1.7 24-1.5 42.1 6.8 0 13.6-1 13-1 13 0 0-14.7-12-52-4-0.6 2.2-0.5 3.4-0.4 4q-0.2 0-0.6 0zm-1-15q0 0 0-0.3-0.4 0.3 0 0.3zm12.9-4.8c-6.6 1.1-11 3.2-12.9 4.2 0.1-3.2 1.6-18.1 18-19.4q1 0 2 0 0 0 0 0c0 0 4.5 0 7.5 0 10.6 0.2 7.5 1 7.5 1 0 0 14.7 2.7 17 19-14.3-7.5-29-7-39.1-4.8zm6.1 10.8q0.1 0 0.3-0.1c1.3-0.1 3.7-0.2 6.1-0.3 4.5 0 9.6 0.4 9.6 0.4 0 0 0-2.4 0-4.4 0.4-2.7 0-2.6 0-2.6 0-1.2-17-1-17-1v2c0 0-0.8 4.5 0 5.8v0.2q0 0 0.2 0 0.3 0.2 0.8 0zm8.5-26c-2 0-4.4 0-7.5 0-0.2-0.3-4.8-7.6 5-7 10 0.6 3.5 6.9 5 7 0.5 0-0.7 0-2.5 0zm6.6 25.7c0.5-1.8 0.7-3.2 0.9-4.1 0-1.2 0-2.2 0-2.6l-17-1v7.8q0.1 0.1 0.2 0.2 0.3 0 1.1-0.1c1-0.3 3.5-0.4 6.1-0.3 3.6-0.2 7.5-0.3 8.7 0.1z"
          />
        </g>
      );
    } else if (hair === 3) {
      return (
        <g id="hair3-container">
          <path
            id="hair3"
            fill={hairFill}
            stroke={hairStroke}
            strokeMiterlimit="100"
            strokeWidth="2"
            d="m40 46c0 0 13.6-1.3 15-3-0.9 8.5 9.2 3 13 1 11.9-6.9 8-2 8-2 0 0 3.1 7.1 7.2 7.1-1.2 9.1 0.8 8.9 0.8 8.9h6c0 0-0.8-6.7 0-10 0.8-3.3 8.1-10.9 1-14 1.7-9-2.5-8.9-7-11-3.8-12.1-12.1-4.1-12-5-8.5-8-9.6-3.5-12-3-13.5-3.9-16 4-16 4 0 0-9.4-1.7-10.6 5.5-9.2 1.2-6.9 9-6.4 11.1-5.3 4.7 2 10.2 2 10.2l1 13.2h6c0 0-0.7-1.6 0-3 0.7-1.4 3-3 3-3l-1-6"
          />
        </g>
      );
    } else if (hair === 2) {
      return (
        <g id="hair2-container">
          <path
            id="hair2"
            fillRule="evenodd"
            fill={hairFill}
            stroke={hairStroke}
            strokeMiterlimit="100"
            strokeWidth="2"
            d="m36 58c0 0-0.2-2.3-0.1-5.5l2.1 0.5c0 0 11.7-9.8 13-15 10.7 18.9 14.6 17.1 17 16 0.3-3.2-0.1-5-0.8-6 3.4 2.6 10 6.6 16.8 5.3q0 1 0 1.7c0.1 3-1.1 15-1 17 0.1 2-0.9 10.1-8 12-7.1 1.9-21 1-21 1 0 0-10.1-4.9-12-10-1.9-5.1-6-17-6-17zm31.2-10c-1.7-1.3-2.5-2.3-2.2-2 0.6 0.5 1.5 0.8 2.2 2zm-27.2 39c0 0 6.6 4 20 1 14.4 6.5 22 0.8 26 0 1.9 4.1 7 1.7 7 0-2-20-3.3-18.2-3-23 1-25-1.3-39.8-18-43-18.2-1.1-14 1.3-17 2-7.4 5.2-6.6 2.5-12 4-14.8 4.8-11.5 23.1-11 26 0.5 2.9-0.8 35.4 0 36 5.4 2.7 5.8-0.5 8-3z"
          />
        </g>
      );
    } else if (hair === 1) {
      return (
        <g id="hair1-container">
          <path
            id="hair1"
            fill={hairFill}
            stroke={hairStroke}
            strokeMiterlimit="100"
            strokeWidth="2"
            d="m85 58l-1-9c0 0-9.5-5.7-7.2-8.9-10 8.2-16 8-17.8 6.9-4.1-1.7-4-5-4-5 0 0-10.6 5.3-16 4-1.6 13.2-3.5 11.5-3 12 0.5 0.5-4-4-4-4v-10c0 0-10.3-3.5-8-8 2.3-4.5 10-7 10-7 0 0-4.1-0.7-2-5 2.1-4.3 13.1-4.5 18-4 3.5-6.9 16.1-3.7 21-2 4.9 1.7 10.1 12.1 10.1 12.1 0 0 9-2.5 9.9 10.9-0.2 14.6 0 14 0 14z"
          />
        </g>
      );
    }
  };

  const giveShirtSvg = () => {
    if (shirt === 7) {
      return (
        <g id="shirt7-container">
          <path
            id="shirt7-base"
            fillRule="evenodd"
            fill={shirtStroke}
            d="m56 92.4q0-3 0-5.1l12 0.6v4.5c0 0 2.4-0.7 5.6-0.2-0.2 8.9 4 17.2 7.7 22.8-22.3 0-33.9 0-39.9 0 3.8-4.8 7.8-12.4 7-22.6 2.2-0.4 4.7-0.5 7.6 0z"
          />
        </g>
      );
    } else if (shirt === 6) {
      return (
        <g id="shirt6-container">
          <path
            id="shirt6-base"
            fillRule="evenodd"
            fill={shirtFill}
            stroke={shirtStroke}
            strokeMiterlimit="100"
            d="m35 115c0 0-1.6-24.9 20.4-22.1l6.6 6.1c0 0 2.1-3.3 6-6.8v0.8c0 0 18-5 20 22-52.8 0-53 0-53 0z"
          />
          <path
            id="shirt6-arm"
            fill={shirtStroke}
            stroke={shirtStroke}
            strokeMiterlimit="100"
            d="m79 116l1.1-22c0 0 8.6 10.1 9.9 21-11.3 0.3-11 1-11 1zm-34-1c0 0-1.1-14.1-3.6-18-2.6-3.9-7.7 11.3-6.1 18 10 0 9.7 0 9.7 0z"
          />
          <path
            id="shirt6-collar"
            fill={shirtStroke}
            d="m48 93c0 0 2.1 12.3 6.4 15.2 5.8-7.6 6.6-7.2 6.6-7.2l7 7 7.4-15.4-8.3 0.3-6.1 6.7-6-6.6zm13 7c0 0 2 15 0 15"
          />
        </g>
      );
    } else if (shirt === 5) {
      return (
        <g id="shirt5-container">
          <path
            id="shirt5-base"
            fillRule="evenodd"
            fill={shirtFill}
            d="m34 116c0 0-0.5-7.8 2.8-14.4 7.3 0.8 27.7 2 39.6-8.5 5.3 1.7 11.5 7.2 12.6 22.9-54.8 0-55 0-55 0z"
          />
          <path
            id="shirt5-design"
            fill="none"
            stroke={shirtDesign}
            strokeMiterlimit="100"
            d="m38.2 105.4c0 0 27.1 2 40.4-8.5"
          />
        </g>
      );
    } else if (shirt === 4) {
      return (
        <g id="shirt4-container">
          <path
            id="shirt4-base"
            fill={shirtFill}
            stroke={shirtStroke}
            strokeMiterlimit="100"
            d="m36 115h52c0 0 0.2-21.9-14-22-10.9 9.6-12 9.4-12 9.4l-10-10c-3 3-15.6-3.1-16 22.6z"
          />
          <path
            id="shirt4-hoodie-cap"
            fill={shirtFill}
            stroke={shirtStroke}
            strokeMiterlimit="100"
            d="m50 95c0 0-0.5-5.9 5-5 8.6 11.8 8 13 8 13 0 0-13.5-5.6-13-8zm14 8c0 0 0.2-11.3 6-13 5.8-1.7 7 3 7 3 0 0-9.8 8.8-13 10z"
          />
          <path
            id="shirt4-thread"
            fill={shirtFill}
            stroke={shirtStroke}
            strokeMiterlimit="100"
            d="m68 97c4.1 6.3 4.5 7.9 4 9m-17-1c0 0 0-7.2 2-8"
          />
          <path
            id="shirt4-arm"
            fill={shirtStroke}
            d="m39 100c0 0 5.6 8.9 5 15-9.7 0-10 0-10 0 0 0 1.1-12.9 5-15zm42 16c0 0-0.3-7.8 5-13 2.7 11 2 13 2 13z"
          />
        </g>
      );
    } else if (shirt === 3) {
      return (
        <g id="shirt3-container">
          <path
            id="shirt3-base"
            fillRule="evenodd"
            fill={shirtFill}
            stroke={shirtStroke}
            strokeMiterlimit="100"
            d="m80.6 96c-1.6 6.3-1.9 13.6-1.9 19-17.6 0-28.2 0-34.4 0-0.1-8.6-1.2-14.8-2.4-19 1.7-1.5 4-2.6 6.8-3 1.3 5 4.8 12 14.3 12 9.1 0 11.2-6.8 11.4-12.1 2 0.5 4.2 1.3 6.2 3.1z"
          />
        </g>
      );
    } else if (shirt === 2) {
      return (
        <g id="shirt2-container">
          <path
            id="shirt2-base"
            fillRule="evenodd"
            fill={shirtFill}
            d="m49 92.7c5.5 5.3 13.2 13.1 13.8 15-0.1-1.6 4.2-9 9.5-15.3 2.6-0.1 6.5 0.5 10 3.4-1 7.1-0.6 15-0.1 20.4-20.6 0-32.4 0-39.2 0-1-5.8-3.3-12-5.2-16.3 2.3-3.5 5.8-6.4 11.2-7.2z"
          />
        </g>
      );
    } else if (shirt === 1) {
      return (
        <g id="shirt1-container">
          <path
            id="shirt1-base"
            fillRule="evenodd"
            fill={shirtFill}
            stroke={shirtStroke}
            strokeMiterlimit="100"
            d="m82.7 98.2c-1.1 6.2-1.5 13.1-1.6 17.8-18.7 0-29.8 0-36.4 0-0.8-7.3-2.9-15.3-4-19 2.3-2.5 5.6-4.3 10.3-4.6v0.3c12 16.1 24 1.1 24 1.1l-0.3-1.1c2.6 0.7 5.5 2.2 8 5.5z"
          />
          <path
            id="shirt1-design1"
            fill="none"
            stroke={shirtDesign}
            strokeMiterlimit="100"
            strokeWidth="1.5"
            d="m46 105.4c0 0 15.3 3.2 34.2-0.9"
          />
          <path
            id="shirt1-design2"
            fill="none"
            stroke={shirtDesign}
            strokeMiterlimit="100"
            strokeWidth="1.5"
            d="m46 111.8c0 0 15.3 3.1 34.2-0.9"
          />
        </g>
      );
    }
  };

  const giveMouthSvg = () => {
    if (mouth === 6) {
      return (
        <g id="mouth6-container">
          <path
            id="mouth6"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m60 75c0 0 2.7-2.7 9 0"
          />
        </g>
      );
    } else if (mouth === 5) {
      return (
        <g id="mouth5-container">
          <path
            id="mouth5"
            fill={mouthFill}
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m56 76c0 0 9.9 8.9 15.8-0.8-7.2 2.3-14.9 1.6-15.8 0.8zm1 0c0 0 8.6 0.6 14-1-6.6-3.9-14 1-14 1z"
          />
        </g>
      );
    } else if (mouth === 4) {
      return (
        <g id="mouth4-container">
          <path
            id="mouth4"
            fill={mouthFill}
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m55 73l10 3c0 0-8.4 8.3-10-3z"
          />
        </g>
      );
    } else if (mouth === 3) {
      return (
        <g id="mouth3-container">
          <path
            id="mouth3"
            fill={mouthFill}
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m57 73h14c0 0-6.3 9.5-14 0z"
          />
        </g>
      );
    } else if (mouth === 2) {
      return (
        <g id="mouth2-container">
          <path
            id="mouth2"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m59 74c0 0 6.1 1.3 10-1"
          />
        </g>
      );
    } else if (mouth === 1) {
      return (
        <g id="mouth1-container">
          <path
            id="mouth11"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m60 74h9"
          />
          <path
            id="mouth12"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m62 77c0 0 2.7-0.2 3 0"
          />
        </g>
      );
    }
  };

  const giveNoseSvg = () => {
    if (nose === 7) {
      return (
        <g id="nose7-container">
          <path
            id="nose7"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m66 54c0 0-3.7 8.7 2 11-1.6 6.9-6 4-6 4"
          />
        </g>
      );
    } else if (nose === 6) {
      return (
        <g id="nose6-container">
          <path
            id="nose6"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m66 52l4 16c0 0-10.2 1.8-10 2"
          />
        </g>
      );
    } else if (nose === 5) {
      return (
        <g id="nose5-container">
          <path
            id="nose5"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m65 63c0 0 8.7 11-4 6"
          />
        </g>
      );
    } else if (nose === 4) {
      return (
        <g id="nose4-container">
          <path
            id="nose4"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m65 58v7c0 0 9.9 5.3-4 6"
          />
        </g>
      );
    } else if (nose === 3) {
      return (
        <g id="nose3-container">
          <path
            id="nose3"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m66 53c0 0 9.1 16.9 0 16-9.1-0.9-10.5-5-8-7"
          />
        </g>
      );
    } else if (nose === 2) {
      return (
        <g id="nose2-container">
          <path
            id="nose2"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m66 58c0 0 1.5 17-4 12-2-0.7-2-4-2-4"
          />
        </g>
      );
    } else if (nose === 1) {
      return (
        <g id="nose1-container">
          <path
            id="nose1"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m62 63c9-2.4 7 1 7 1 0 0-0.8 4.3-7 3"
          />
        </g>
      );
    }
  };

  const giveEyeSvg = () => {
    if (eye === 4) {
      return (
        <g id="eye4-container">
          <path
            id="eye4"
            fill={skinBorder}
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m47 59c0 0 1.7-5.8 8-1-4.1-1.8-4-1-4-1 0 0-4.2 0.3-4 2zm3.7 1.5c-0.9 0-1.7-0.8-1.7-1.8 0-0.9 0.8-1.7 1.7-1.7 1 0 1.8 0.8 1.8 1.7 0 1-0.8 1.8-1.8 1.8zm20.3-1.5c0 0 1.7-5.8 8-1-4.1-1.8-4-1-4-1 0 0-4.2 0.3-4 2zm3.7 1.5c-0.9 0-1.7-0.8-1.7-1.8 0-0.9 0.8-1.7 1.7-1.7 1 0 1.8 0.8 1.8 1.7 0 1-0.8 1.8-1.8 1.8z"
          />
        </g>
      );
    } else if (eye === 3) {
      return (
        <g id="eye3-container">
          <path
            id="eye3"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m47 60c0 0 2.1-2 5-2.1 1.5 0 5.1 2 5 2.1 0 0.1-2.5-1.7-5-1.7-2.5 0-5 1.7-5 1.7zm5 1c-0.6 0-1-0.4-1-1 0-0.6 0.4-1 1-1 0.6 0 1 0.4 1 1 0 0.6-0.4 1-1 1zm17-1c0 0 2.1-2 5-2.1 1.5 0 5.1 2 5 2.1 0 0.1-2.5-1.7-5-1.7-2.5 0-5 1.7-5 1.7zm5 1c-0.6 0-1-0.4-1-1 0-0.6 0.4-1 1-1 0.6 0 1 0.4 1 1 0 0.6-0.4 1-1 1z"
          />
        </g>
      );
    } else if (eye === 2) {
      return (
        <g id="eye2-container">
          <path
            id="eye21"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m50 62c0 0-2.6-4 1-4 3.6 0 2.7 4 2 4"
          />
          <path
            id="eye22"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m73 63c0 0-2.6-4 1-4 3.6 0 2.7 4 2 4"
          />
        </g>
      );
    } else if (eye === 1) {
      return (
        <g id="eye1-container">
          <path
            id="eye1"
            fill={skinBorder}
            d="m51.5 60c-0.8 0-1.5-0.9-1.5-2 0-1.1 0.7-2 1.5-2 0.8 0 1.5 0.9 1.5 2 0 1.1-0.7 2-1.5 2zm23 0c-0.8 0-1.5-0.9-1.5-2 0-1.1 0.7-2 1.5-2 0.8 0 1.5 0.9 1.5 2 0 1.1-0.7 2-1.5 2z"
          />
        </g>
      );
    }
  };

  const giveEyebrowSvg = () => {
    if (eyebrow === 5) {
      return (
        <g id="eyebrow5-container">
          <path
            id="eyebrow51"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m44 50c0 0 9.3-3.9 14.2 2.5"
          />
          <path
            id="eyebrow52"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m67 51c0 0 1.1-3.5 13.5-0.9"
          />
        </g>
      );
    } else if (eyebrow === 4) {
      return (
        <g id="eyebrow4-container">
          <path
            id="eyebrow4"
            fill={skinBorder}
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m43 52c0 0 4-6.2 16-2-0.5 4.1-2 2.6-5 2-3-0.6-6 0-6 0l-3 2h-2zm24.1-1.9c0 0 5.3-5.1 16 1.8-1.5 3.8-2.6 2-5.4 0.8-2.7-1.3-5.8-1.4-5.8-1.4l-3.4 1.2-1.9-0.4z"
          />
        </g>
      );
    } else if (eyebrow === 3) {
      return (
        <g id="eyebrow3-container">
          <path
            id="eyebrow31"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m47 52c0 0 6.2-2.4 11-1"
          />
          <path
            id="eyebrow32"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m69 51c0 0 5.4-1.6 12 2"
          />
        </g>
      );
    } else if (eyebrow === 2) {
      return (
        <g id="eyebrow2-container">
          <path
            id="eyebrow21"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m45 56c0 0-1-3.6 12-3"
          />
          <path
            id="eyebrow22"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m68 56c0 0 4.3-2.7 11-1"
          />
        </g>
      );
    } else if (eyebrow === 1) {
      return (
        <g id="eyebrow1-container">
          <path
            id="eyebrow11"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m45 50h13"
          />
          <path
            id="eyebrow12"
            fill="none"
            stroke={skinBorder}
            strokeMiterlimit="100"
            d="m66 51c0 0 9.9-2.8 15 0"
          />
        </g>
      );
    }
  };

  const giveAccessorySvg = () => {
    if (accessory === 3) {
      return (
        <g id="accessory3-container">
          <path
            id="accessory31"
            fill="none"
            stroke={accessoryStroke}
            strokeMiterlimit="100"
            d="m37 77v-6"
          />
          <path
            id="accessory32"
            fill="none"
            stroke={accessoryStroke}
            strokeMiterlimit="100"
            d="m86 71v7"
          />
          <path
            id="accessory33"
            fill="none"
            stroke={accessoryStroke}
            strokeMiterlimit="100"
            d="m36.5 82c-1.4 0-2.5-1.1-2.5-2.5 0-1.4 1.1-2.5 2.5-2.5 1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5zm49 0c-1.4 0-2.5-1.1-2.5-2.5 0-1.4 1.1-2.5 2.5-2.5 1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5z"
          />
        </g>
      );
    } else if (accessory === 2) {
      return (
        <g id="accessory2-container">
          <path
            id="accessory2"
            fill="none"
            stroke={accessoryStroke}
            strokeMiterlimit="100"
            d="m33.5 77c-1.9 0-3.5-1.6-3.5-3.5 0-1.9 1.6-3.5 3.5-3.5 1.9 0 3.5 1.6 3.5 3.5 0 1.9-1.6 3.5-3.5 3.5zm55 0c-1.9 0-3.5-1.6-3.5-3.5 0-1.9 1.6-3.5 3.5-3.5 1.9 0 3.5 1.6 3.5 3.5 0 1.9-1.6 3.5-3.5 3.5z"
          />
        </g>
      );
    } else if (accessory === 1) {
      return (
        <g id="accessory1">
          <path
            id="accessory1"
            fill="none"
            stroke={accessoryStroke}
            strokeMiterlimit="100"
            d="m34.5 76c-1.9 0-3.5-1.6-3.5-3.5 0-1.9 1.6-3.5 3.5-3.5 1.9 0 3.5 1.6 3.5 3.5 0 1.9-1.6 3.5-3.5 3.5zm55 0c-1.9 0-3.5-1.6-3.5-3.5 0-1.9 1.6-3.5 3.5-3.5 1.9 0 3.5 1.6 3.5 3.5 0 1.9-1.6 3.5-3.5 3.5zm-44.5 3c0 0-10.9-1.8-17 13 0.2 1.8 8.8-1.8 9-3-3.5 0.2 3.2-9.8 8-10zm-1 0c0 0-8.7 2.3-9 19 10.8-7.7 9.5-17.8 9-19z"
          />
        </g>
      );
    }
  };

  const [faceSvg, setFaceSvg] = useState(() => giveFaceSvg());
  const [bodySvg, setBodySvg] = useState(() => giveBodySvg());
  const [earSvg, setEarSvg] = useState(() => giveEarSvg());
  const [hairSvg, setHairSvg] = useState(() => giveHairSvg());
  const [shirtSvg, setShirtSvg] = useState(() => giveShirtSvg());
  const [mouthSvg, setMouthSvg] = useState(() => giveMouthSvg());
  const [noseSvg, setNoseSvg] = useState(() => giveNoseSvg());
  const [eyeSvg, setEyeSvg] = useState(() => giveEyeSvg());
  const [eyebrowSvg, setEyebrowSvg] = useState(() => giveEyebrowSvg());
  const [accessorySvg, setAccessorySvg] = useState(() => giveAccessorySvg());

  useEffect(() => {
    setFaceSvg(() => giveFaceSvg());
  }, [skinBorder, skinColor]);

  useEffect(() => {
    setBodySvg(() => giveBodySvg());
  }, [skinBorder, skinColor]);

  useEffect(() => {
    setEarSvg(() => giveEarSvg());
  }, [skinBorder, skinColor]);

  useEffect(() => {
    setHairSvg(() => giveHairSvg());
  }, [hair, hairFill, hairStroke]);

  useEffect(() => {
    setShirtSvg(() => giveShirtSvg());
  }, [shirt, shirtFill, shirtStroke, shirtDesign]);

  useEffect(() => {
    setMouthSvg(() => giveMouthSvg());
  }, [mouth, mouthFill]);

  useEffect(() => {
    setNoseSvg(() => giveNoseSvg());
  }, [nose]);

  useEffect(() => {
    setEyeSvg(() => giveEyeSvg());
  }, [eye]);

  useEffect(() => {
    setEyebrowSvg(() => giveEyebrowSvg());
  }, [eyebrow]);

  useEffect(() => {
    setAccessorySvg(() => giveAccessorySvg());
  }, [accessory, accessoryStroke]);

  return (
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 117 117"
      width={
        typeof width === "number"
          ? width
          : typeof height === "number"
          ? height
          : 300
      }
      height={
        typeof height === "number"
          ? height
          : typeof width === "number"
          ? width
          : 300
      }
    >
      <g id="face">{faceSvg}</g>
      <g id="hair">{hairSvg}</g>
      <g id="body">{bodySvg}</g>
      <g id="shirts">{shirtSvg}</g>
      <g id="ears">{earSvg}</g>
      <g id="mouth">{mouthSvg}</g>
      <g id="nose">{noseSvg}</g>
      <g id="eye">{eyeSvg}</g>
      <g id="eyebrow">{eyebrowSvg}</g>
      <g id="accessory">{accessorySvg}</g>
    </svg>
  );
};

export default FaceCreator;
