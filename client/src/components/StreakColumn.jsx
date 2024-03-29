import React, { useEffect, useState, useContext } from "react";
import Streak from "./Streak";
import { AuthContext } from "../context/AuthContext";

const StreakColumn = ({ currentStreak, targetStreak, darkMode }) => {
  const [showStreak, setShowStreak] = useState(
    currentStreak !== null && targetStreak !== null ? true : false
  );

  const { userDoc } = useContext(AuthContext);

  useEffect(() => {
    const tempShowStreak =
      userDoc && userDoc.currentStreak !== null && userDoc.targetStreak !== null
        ? true
        : false;
    setShowStreak(tempShowStreak);
  }, [userDoc]);

  return (
    <div className="column">
      <div className="column-text">Streak</div>
      {showStreak ? (
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
          text={`${currentStreak}/${targetStreak} Days`}
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
          <div style={{ fontSize: "9px" }}>Log In to continue your streak</div>
        </>
      )}
    </div>
  );
};

export default StreakColumn;
