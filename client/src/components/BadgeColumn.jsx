import React, { useEffect, useState } from "react";
import CurrentBadge1 from "../assets/badges-old/hierarchical/1-Hamlet.png";
import CurrentBadge2 from "../assets/badges-old/hierarchical/2-Barony.png";
import CurrentBadge3 from "../assets/badges-old/hierarchical/3-Domain.png";
import CurrentBadge4 from "../assets/badges-old/hierarchical/4-Province.png";
import CurrentBadge5 from "../assets/badges-old/hierarchical/5-Realm.png";
import CurrentBadge6 from "../assets/badges-old/hierarchical/6-Empire.png";
// import CurrentBadge1 from "../assets/badges/CurrentBadge1.svg";
// import CurrentBadge3 from "../assets/badges/CurrentBadge3.svg";
import "./BadgeColumn.css";

const BadgeColumn = ({ highestStreak }) => {
  const [badge, setBadge] = useState(null);
  const [badgeName, setBadgeName] = useState("");

  useEffect(() => {
    const badges = [
      { threshold: 7, badge: CurrentBadge1, name: "HAMLET" },
      { threshold: 15, badge: CurrentBadge2, name: "BARONY" },
      { threshold: 30, badge: CurrentBadge3, name: "DOMAIN" },
      { threshold: 60, badge: CurrentBadge4, name: "PROVINCE" },
      { threshold: 120, badge: CurrentBadge5, name: "REALM" },
      { threshold: Infinity, badge: CurrentBadge6, name: "EMPIRE" },
    ];

    const getBadge = () => {
      const { badge, name } = badges.find(
        ({ threshold }) => highestStreak <= threshold
      );
      setBadge(badge);
      setBadgeName(name);
    };

    getBadge();
  }, [highestStreak]);

  return (
    <div className="column">
      <div className="column-text">Badge</div>
      {highestStreak ? (
        <>
          <img src={badge} alt="" />
          <h3>{badgeName}</h3>
          <div>{`Highest Streak: ${highestStreak} Day${
            highestStreak > 1 ? "s" : ""
          }`}</div>
        </>
      ) : (
        <>
          <img src={CurrentBadge3} alt="" />
          <h3>{badgeName}</h3>
          <div style={{ fontSize: "9px", marginTop: "6px" }}>
            Log In to get your badge according to your highest streak
          </div>
        </>
      )}
    </div>
  );
};

export default BadgeColumn;
