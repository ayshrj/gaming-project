import React, { useContext, useState, useEffect } from "react";
import "./Friends.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FaceCreator from "../util/FaceCreator";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";

const HighscoreComponent = ({ highscore }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        onClick={toggleOpen}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {`Highscores `}
        {isOpen ? (
          <IconChevronDown size={20} />
        ) : (
          <IconChevronRight size={20} />
        )}
      </div>
      {isOpen && (
        <div>
          {Object.entries(highscore).map(([game, score]) => (
            <div key={game}>
              <div>{game}</div> <div>{score}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Friends = ({ setUser, setSearchQuery, setSearchOpen }) => {
  const navigate = useNavigate();
  const { userDoc } = useContext(AuthContext);
  const [friendsData, setFriendsData] = useState([]);
  const [selectedFriendId, setSelectedFriendId] = useState(null); // Store the selected friend's ID

  useEffect(() => {
    if (userDoc) {
      const fetchUserData = async () => {
        setFriendsData([]);
        const promises = userDoc.friends.map(async (friend) => {
          const userDocRef = doc(db, "users", friend.id);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            return { id: friend.id, ...docSnap.data() };
          } else {
            console.log("User data not found.");
            return null;
          }
        });
        const friendsDataResults = await Promise.all(promises);
        const filteredFriendsData = friendsDataResults.filter(
          (data) => data !== null
        );
        setFriendsData(filteredFriendsData);
      };

      fetchUserData();
    } else {
      navigate("/");
    }
  }, [userDoc]);

  useEffect(() => {
    setUser(null);
    setSearchQuery("");
    setSearchOpen(false);
  }, []);

  const handleSelectFriend = (friendId) => {
    if (selectedFriendId !== friendId) {
      setSelectedFriendId(friendId);
    } else {
      setSelectedFriendId(null); // Toggle off if the same friend is clicked again
    }
  };

  return (
    <div className="friends-container">
      <h1>Friends</h1>
      {friendsData && (
        <>
          {friendsData.map((friend, index) => (
            <div key={index} className="friend">
              <div
                className="friend-info"
                onClick={() => handleSelectFriend(friend.id)}
              >
                <div>
                  {friend.photoURL !== "" ? (
                    <img
                      src={friend.photoURL}
                      alt={`${friend.displayName}'s avatar`}
                      draggable="false"
                    />
                  ) : (
                    <FaceCreator {...friend.avatar} height={50} width={50} />
                  )}
                </div>
                <div>{friend.displayName}</div>
              </div>

              {selectedFriendId === friend.id && (
                <div className="friend-container">
                  <div>Current Streak: {friend.currentStreak}</div>
                  <div>Target Streak: {friend.targetStreak}</div>
                  <div>Highest Streak: {friend.highestStreak}</div>
                  <HighscoreComponent highscore={friend.highscore} />
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Friends;
