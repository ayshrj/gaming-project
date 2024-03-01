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
}) => {
  const [user, setUser] = useState(null);
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

  const sendFriendRequest = async ({ id, photoURL, displayName }) => {
    try {
      const otherUserRef = doc(db, "users", id);
      const otherUserDoc = await getDoc(otherUserRef);
      if (!otherUserDoc.exists()) {
        throw new Error("User not found");
      }
      const otherUserData = otherUserDoc.data();

      await updateDoc(otherUserRef, {
        pendingRequests: [
          ...otherUserData.pendingRequests,
          {
            id: currentUser.uid,
            photoURL: currentUser.photoURL,
            displayName: currentUser.displayName,
          },
        ],
      });

      const currentUserRef = doc(db, "users", currentUser.uid);
      const currentUserDoc = await getDoc(currentUserRef);
      if (!currentUserDoc.exists()) {
        throw new Error("Current user not found");
      }
      const currentUserData = currentUserDoc.data();
      await updateDoc(currentUserRef, {
        sentRequests: [
          ...currentUserData.sentRequests,
          { id, photoURL, displayName },
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
  }, [searchQuery]);

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
          {user?.map(({ id, photoURL, displayName }) => (
            <div key={id} className="search-user-option">
              <div className="search-user">
                <img
                  src={photoURL}
                  alt={displayName}
                  className="search-user-photo"
                />
                <div className="search-user-name">{displayName}</div>
              </div>
              <div>
                {userDoc &&
                userDoc.friends.some((friend) => friend.id === id) ? (
                  <div className="search-user-add-remove">
                    <IconChecks size={20} />
                  </div>
                ) : userDoc.pendingRequests &&
                  userDoc.pendingRequests.some(
                    (request) => request.id === id
                  ) ? (
                  <>
                    <div
                      className="search-user-add-remove"
                      onClick={() => acceptRequest(id, photoURL, displayName)}
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
                ) : userDoc.sentRequests.some(
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
                      sendFriendRequest({ id, photoURL, displayName })
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
