import React, { useState } from "react";

const SearchBar = () => {
  // Chaîne de caractère recherchée
  const [searchTerm, setSearchTerm] = useState("");

  // Fonction de recherche
  let handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    console.log(e.target.value);
  };

  return (
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
  );
};

export default SearchBar;
