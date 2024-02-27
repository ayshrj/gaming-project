import React, { useEffect, useState } from "react";
import CurrentBadge1 from "../assets/badges/hierarchical/1-Hamlet.png";
import CurrentBadge2 from "../assets/badges/hierarchical/2-Barony.png";
import CurrentBadge3 from "../assets/badges/hierarchical/3-Domain.png";
import CurrentBadge4 from "../assets/badges/hierarchical/4-Province.png";
import CurrentBadge5 from "../assets/badges/hierarchical/5-Realm.png";
import CurrentBadge6 from "../assets/badges/hierarchical/6-Empire.png";

const BadgeColumn = ({ highestStreak }) => {
  const [badge, setBadge] = useState(null);

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

  return (
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
  );
};

export default BadgeColumn;
