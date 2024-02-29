import React, { useEffect, useState } from "react";
import { IconSearch, IconArrowNarrowRight } from "@tabler/icons-react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./Search.css";

const Search = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false); // Added error state

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
        documents.push({ id: doc.id, ...doc.data() });
      });

      setUser(documents);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <>
      <div className="search-container">
        <input
          className={`search ${searchOpen ? "search-open" : ""}`}
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => {
            if (user) {
              setUser(null);
            }
            setSearchQuery(e.target.value);
          }}
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
              <div key={id} className="search-user-info">
                <div>
                  <img
                    src={photoURL}
                    alt={displayName}
                    className="search-user-photo"
                  />
                </div>
                <div className="search-user-name">{displayName}</div>
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
