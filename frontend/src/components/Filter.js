import React, { useContext, useState, useEffect } from "react";

// Contexts
import { DataContext } from "../contexts/DataContext";

const Filter = () => {
  const { categories } = useContext(DataContext).content;
  const { isFiltered, setIsFiltered } = useContext(DataContext);

  useEffect(() => {}, []);

  let handleOnClick = (e) => {
    e.target.classList.toggle("active-filter");
    e.preventDefault();
    // À modifier en utilisant le setIsFiltered
    /* if (isFiltered.includes(e.target.id)) {
      isFiltered.splice(isFiltered.indexOf(e.target.id), 1);
    } else {
      isFiltered.push(e.target.id);
    } */

    setIsFiltered("people");

    /*    setIsFiltered(
      (isFiltered) => [...isFiltered, { id: e.target.id }],
      () => {
        console.log(isFiltered);
      }
    ); */
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
