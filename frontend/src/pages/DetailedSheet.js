import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../authentication/useAuth";

const DetailedSheet = (props) => {
  const { isLoading, isLoggedIn } = useAuth();
  useEffect(() => {
    console.log("IsLoggedIn: ", isLoggedIn);
  }, []);
  // Redirection si utilisateur non connecté
  /*   if (!isLoggedIn) return <Redirect to="/" />; */

  //Name, birth_year, eye_color, gender,hair_color, height, mass, skin_color, homeworld, films, species, starships, vehicles
  return (
    <>
      <div className="detailed-container">
        <div className="info-wrapper">
          <div className="detailed-info">
            <div className="detailed-header">
              <h2>Nom</h2>
            </div>
            <div className="detailed-sub-header">
              <h3>Espèce</h3>
              <h3>Véhicule</h3>
              <h3>Vaisseau spatial</h3>
              <h3>Planète</h3>
              <h3>Films</h3>
            </div>

            <ul>
              <li>Année de naissance</li>
              <li>Couleur des yeux</li>
              <li>Sexe</li>
              <li>Couleur des cheveux</li>
              <li>Taille</li>
              <li>Poids</li>
              <li>Couleur de peau</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedSheet;
