import React, { useContext, useState } from "react";
import { DataContext } from "../contexts/DataContext";

const Filter = () => {
  const { categories } = useContext(DataContext);

  const [isActive, setActive] = useState(true);
  const [filterItem, setFilterItem] = useState("");

  let handleOnClick = (e) => {
    console.log(e.target);
    /*     setActive(!isActive); */
  };
  return (
    <div className="filter-container">
      <ul className="filter-list">
        {categories.map((category, id) => (
          <li
            className="filter-item"
            key={id}
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
