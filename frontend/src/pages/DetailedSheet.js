import React, { useEffect, useState } from "react";
import { useAuth } from "../authentication/useAuth";

//Contexts

const DetailedSheet = (props) => {
  const { isLoading, isLoggedIn } = useAuth();

  let info = props.location.state;
  for (let property in info) {
    console.log(`${property}: ${info[property]}`);
  }

  useEffect(() => {}, []);

  return (
    <>
      <div className="detailed-container">
        <div className="info-wrapper">
          <div className="detailed-info">
            <div className="detailed-header">
              <h2>{info.name || info.title}</h2>
            </div>
            {Object.keys(info).map((key, i) => {
              if (i !== 0 && key !== "films") {
                return (
                  <h5 key={i}>
                    {key} : {info[key]}
                  </h5>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedSheet;
