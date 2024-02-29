import React, { useEffect, useState, useContext } from "react";
import {
  IconSearch,
  IconArrowNarrowRight,
  IconPlus,
  IconMinus,
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

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  useEffect(() => {
    console.log("user doc: ", userDoc);
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
          className="search-icon"
          onClick={() => {
            setSearchOpen(!searchOpen);
          }}
        />
        {searchOpen && (
          <IconArrowNarrowRight
            className="search-send"
            onClick={handleSearch}
          />
        )}
      </div>
      {user && (
        <div className="search-users-info">
          {user &&
            user.map(({ id, photoURL, displayName }) => (
              <div key={id} className="search-user-option">
                <div className="search-user">
                  <div>
                    <img
                      src={photoURL}
                      alt={displayName}
                      className="search-user-photo"
                    />
                  </div>
                  <div className="search-user-name">{displayName}</div>
                </div>
                <div>
                  <IconPlus
                    className="search-user-add"
                    onClick={() => sendFriendRequest(id)}
                  />
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
