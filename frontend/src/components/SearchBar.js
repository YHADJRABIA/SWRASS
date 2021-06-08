import React, { useState } from "react";

const SearchBar = () => {
  // Chaîne de caractère recherchée
  const [searchTerm, setSearchTerm] = useState("");

  // Fonction de recherche
  let handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  return (
    <div className="search-bar">
      <input
        onChange={(e) => {
          handleChange(e);
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
