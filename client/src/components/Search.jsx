import React, { useEffect, useState, useContext } from "react";
import {
  IconSearch,
  IconArrowNarrowRight,
  IconPlus,
  IconMinus,
  IconChecks,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import "./Search.css";
import { AuthContext } from "../context/AuthContext";
import FaceCreator from "../util/FaceCreator";

const Search = ({
  searchBarWidth,
  searchOpen,
  setSearchOpen,
  setOpenNotif,
  searchUsersInfoOpen,
  setSearchUsersInfoOpen,
  searchQuery,
  setSearchQuery,
  acceptRequest,
  rejectRequest,
  user,
  setUser,
}) => {
  const [error, setError] = useState(false);

  const { currentUser, userDoc } = useContext(AuthContext);

  const handleSearch = async () => {
    if (searchQuery === "") {
      setUser(null);
      return;
    }

    const q = query(
      collection(db, "users"),
      where("displayName", ">=", searchQuery),
      where("displayName", "<", searchQuery + "\uf8ff")
    );

    try {
      const querySnapshot = await getDocs(q);
      const documents = [];
      querySnapshot.forEach((doc) => {
        const tempDocData = doc.data();
        if (tempDocData.uid !== currentUser.uid) {
          documents.push({ id: doc.id, ...doc.data() });
        }
      });

      setUser(documents);
    } catch (err) {
      setError(true);
    }
  };

  const sendFriendRequest = async ({ id, photoURL, displayName, avatar }) => {
    // console.log("id:", id);
    // console.log("photoURL:", typeof photoURL);
    // console.log("displayName:", displayName);
    // console.log("avatar:", avatar);
    try {
      const otherUserRef = doc(db, "users", id);

      const otherUserDoc = await getDoc(otherUserRef);
      if (!otherUserDoc.exists()) {
        throw new Error("User not found");
      }

      const otherUserData = otherUserDoc.data();

      const updatedPendingRequests = [
        ...otherUserData.pendingRequests,
        {
          id: userDoc.uid,
          photoURL: userDoc.photoURL,
          displayName: userDoc.displayName,
          avatar: userDoc.avatar,
        },
      ];

      console.log(updatedPendingRequests);

      await updateDoc(otherUserRef, {
        pendingRequests: updatedPendingRequests,
      }).then(console.log("Updated"));

      const currentUserRef = doc(db, "users", currentUser.uid);
      const currentUserDoc = await getDoc(currentUserRef);
      if (!currentUserDoc.exists()) {
        throw new Error("Current user not found");
      }
      const currentUserData = currentUserDoc.data();
      await updateDoc(currentUserRef, {
        sentRequests: [
          ...currentUserData.sentRequests,
          { id, photoURL, displayName, avatar },
        ],
      });
    } catch (err) {
      console.error("Error sending friend request:", err);
      setError(true);
    }
  };

  const removeFriendRequest = async (userId) => {
    try {
      const otherUserRef = doc(db, "users", userId);
      const otherUserDoc = await getDoc(otherUserRef);
      if (!otherUserDoc.exists()) {
        throw new Error("User not found");
      }
      const otherUserData = otherUserDoc.data();

      const updatedPendingRequests = otherUserData.pendingRequests.filter(
        (request) => request.id !== currentUser.uid
      );

      await updateDoc(otherUserRef, {
        pendingRequests: updatedPendingRequests,
      });

      const currentUserRef = doc(db, "users", currentUser.uid);
      const currentUserDoc = await getDoc(currentUserRef);
      if (!currentUserDoc.exists()) {
        throw new Error("Current user not found");
      }
      const currentUserData = currentUserDoc.data();

      const updatedSentRequests = currentUserData.sentRequests.filter(
        (request) => request.id !== userId
      );

      await updateDoc(currentUserRef, {
        sentRequests: updatedSentRequests,
      });
    } catch (err) {
      console.error("Error removing friend request:", err);
      setError(true);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, userDoc]);

  useEffect(() => {
    console.log("seartc searchOpen", searchOpen);
  }, [searchOpen]);

  useEffect(() => {
    setSearchUsersInfoOpen(user?.length > 0);
  }, [user]);

  return (
    <>
      <div className="search-container">
        <input
          className={`search ${searchOpen ? "search-open" : ""}`}
          placeholder={currentUser ? "Search" : "Login To Search"}
          value={searchQuery}
          onChange={(e) => {
            if (user) {
              setUser(null);
            }
            setSearchQuery(e.target.value);
          }}
          disabled={currentUser ? false : true}
          style={{ width: searchOpen ? searchBarWidth : 0, maxWidth: "530px" }}
        />
        <IconSearch
          className={`search-icon  ${searchOpen ? "search-icon-open" : ""}`}
          onClick={() => {
            if (!searchOpen) {
              setSearchOpen(true);
              setOpenNotif(false);
            } else {
              setSearchOpen(false);
              setSearchQuery("");
            }
          }}
        />
      </div>
      {searchUsersInfoOpen && (
        <div
          className="search-users-info"
          style={{ width: searchOpen ? searchBarWidth : 0, maxWidth: "530px" }}
        >
          {user?.map(({ id, photoURL, displayName, avatar }) => (
            <div key={id} className="search-user-option">
              <div className="search-user">
                {photoURL !== "" ? (
                  <img
                    src={photoURL}
                    alt={displayName}
                    className="search-user-photo"
                  />
                ) : (
                  <FaceCreator {...avatar} height={30} width={30} />
                )}
                <div className="search-user-name">{displayName}</div>
              </div>
              <div>
                {userDoc &&
                userDoc.friends &&
                userDoc.friends.some((request) => request.id === id) ? (
                  <>
                    <div className="search-user-add-remove">
                      <IconChecks size={20} />
                    </div>
                  </>
                ) : userDoc.pendingRequests &&
                  userDoc.pendingRequests.some(
                    (request) => request.id === id
                  ) ? (
                  <>
                    <div
                      className="search-user-add-remove"
                      onClick={() =>
                        acceptRequest(id, photoURL, displayName, avatar)
                      }
                    >
                      <IconCheck size={20} />
                    </div>
                    <div
                      className="search-user-add-remove"
                      onClick={() => rejectRequest(id)}
                    >
                      <IconX size={20} />
                    </div>
                  </>
                ) : userDoc &&
                  userDoc.sentRequests &&
                  userDoc.sentRequests.some(
                    (sentRequest) => sentRequest.id === id
                  ) ? (
                  <div
                    className="search-user-add-remove"
                    onClick={() => removeFriendRequest(id)}
                  >
                    <IconMinus size={20} />
                  </div>
                ) : (
                  <div
                    className="search-user-add-remove"
                    onClick={() =>
                      sendFriendRequest({ id, photoURL, displayName, avatar })
                    }
                  >
                    <IconPlus size={20} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="search-error">An error occurred during the search.</div>
      )}
    </>
  );
};

export default Search;
