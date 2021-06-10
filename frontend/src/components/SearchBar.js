import React, { useState, useEffect, useContext } from "react";

// Contexts
import { DataContext } from "../contexts/DataContext";

const SearchBar = () => {
  const { keyword, setKeyword, setLoading } = useContext(DataContext);

  // Fonction de recherche
  let handleSearch = (e) => {
    setKeyword(e.target.value.toLowerCase());
    setLoading(true);
    console.log(e.target.value);
  };

  return (
    <>
      <div className="search-bar">
        <input
          onChange={(e) => {
            handleSearch(e);
          }}
          type="text"
          id="search-bar"
          placeholder="Luc Marcheciel..."
          name="search-bar"
        />
        <i className="fa fa-search"></i>
      </div>
    </>
  );
};

export default SearchBar;
