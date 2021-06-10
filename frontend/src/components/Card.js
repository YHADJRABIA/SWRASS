import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Card = ({ category, name, icons, data }) => {
  useEffect(() => {}, []);
  let handleOnClick = (e) => {
    console.log(data);
    /*     e.target.classList.toggle("active-filter"); */
  };
  return (
    <>
      <Link
        to={{
          pathname: `/detailed:${(data.name || data.title).replace(
            /\s/g,
            "_"
          )}`,
          state: data,
        }}
      >
        <div className="card" onClick={(e) => handleOnClick(e)}>
          <i className={`card-icon ${icons[category]}`}></i>
          <h4>{name}</h4>
        </div>
      </Link>
    </>
  );
};

export default Card;
