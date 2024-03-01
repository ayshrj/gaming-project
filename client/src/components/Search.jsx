import React, { useEffect, useState, useContext } from "react";
import {
  IconSearch,
  IconArrowNarrowRight,
  IconPlus,
  IconMinus,
  IconCheck,
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

const Search = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [sentRequests, setSentRequests] = useState(null);

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

  const sendFriendRequest = async (userId) => {
    try {
      const otherUserRef = doc(db, "users", userId);
      const otherUserDoc = await getDoc(otherUserRef);
      if (!otherUserDoc.exists()) {
        throw new Error("User not found");
      }
      const otherUserData = otherUserDoc.data();

      await updateDoc(otherUserRef, {
        pendingRequests: [...otherUserData.pendingRequests, currentUser.uid],
      });

      const currentUserRef = doc(db, "users", currentUser.uid);
      const currentUserDoc = await getDoc(currentUserRef);
      if (!currentUserDoc.exists()) {
        throw new Error("Current user not found");
      }
      const currentUserData = currentUserDoc.data();
      await updateDoc(currentUserRef, {
        sentRequests: [...currentUserData.sentRequests, userId],
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

      // Remove current user's ID from recipient's pending requests
      const updatedPendingRequests = otherUserData.pendingRequests.filter(
        (requestUserId) => requestUserId !== currentUser.uid
      );
      await updateDoc(otherUserRef, {
        pendingRequests: updatedPendingRequests,
      });

      // Remove recipient's ID from current user's sent requests
      const currentUserRef = doc(db, "users", currentUser.uid);
      const currentUserDoc = await getDoc(currentUserRef);
      if (!currentUserDoc.exists()) {
        throw new Error("Current user not found");
      }
      const currentUserData = currentUserDoc.data();
      const updatedSentRequests = currentUserData.sentRequests.filter(
        (sentUserId) => sentUserId !== userId
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
    if (user) {
      console.log(user);
    }
  }, [user]);

  useEffect(() => {
    if (userDoc) {
      console.log("sent req: ", userDoc.sentRequests);
    }
  }, [userDoc]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

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
        />
        <IconSearch
          className={`search-icon  ${searchOpen ? "search-icon-open" : ""}`}
          onClick={() => {
            setSearchOpen(!searchOpen);
          }}
        />
      </div>
      {searchOpen && user?.length > 0 && (
        <div className="search-users-info">
          {user.map(({ id, photoURL, displayName }) => (
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
                {userDoc && userDoc.sentRequests.includes(id) ? (
                  <IconMinus
                    className="search-user-add-remove"
                    onClick={() => removeFriendRequest(id)}
                  />
                ) : (
                  <IconPlus
                    className="search-user-add-remove"
                    onClick={() => sendFriendRequest(id)}
                  />
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
