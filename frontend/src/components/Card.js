import React from "react";

const Card = (info) => {
  const { name, photo } = info;
  return (
    <div className="card">
      <i className="fa fa-search"></i>
      <h4> Nom</h4>
    </div>
  );
};

export default Card;
