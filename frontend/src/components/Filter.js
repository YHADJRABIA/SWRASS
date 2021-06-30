import React, { useContext, useState, useEffect } from "react";

// Contexts
import { DataContext } from "../contexts/DataContext";

const Filter = () => {
  const { categories } = useContext(DataContext).content;
  const { isFiltered, setIsFiltered } = useContext(DataContext);

  useEffect(() => {}, []);

  let handleOnClick = (e) => {
    e.preventDefault();
    e.target.classList.toggle("active-filter");

    // À modifier en utilisant le setIsFiltered
    if (isFiltered.includes(e.target.id)) {
      console.log(e.target.id);
      setIsFiltered(isFiltered.filter((el) => el !== e.target.id));
    } else {
      setIsFiltered((oldArray) => [...oldArray, e.target.id]);
    }
  };
  return (
    <div className="filter-container">
      <ul className="filter-list">
        {categories.map((category, id) => (
          <li
            className="filter-item"
            key={id}
            id={category.type}
            onClick={(e) => handleOnClick(e)}
          >
            <i className={category.icon}></i>
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
