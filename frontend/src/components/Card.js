import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Card = ({ type, name }) => {
  useEffect(() => {
    console.log(name);
  }, []);
  return (
    <>
      <Link to={`/detailed`}>
        <div className="card">
          <i className={`card-icon fa fa-search ${type}`}></i>
          <h4>{name}</h4>
        </div>
      </Link>
    </>
  );
};

export default Card;
