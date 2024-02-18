import React, { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import "./Search.css";

const Search = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="search-container">
        <input
          className={`search ${searchOpen ? "search-open" : ""}`}
          placeholder="Search"
        />
        <IconSearch
          className="search-icon"
          onClick={() => {
            setSearchOpen(!searchOpen);
          }}
        />
      </div>
    </>
  );
};

export default Search;
