import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../authentication/useAuth";

//Contexts
import { DataContext } from "../contexts/DataContext";

const DetailedSheet = () => {
  const { isLoading, isLoggedIn } = useAuth();
  useEffect(() => {}, []);
  // Redirection si utilisateur non connecté
  /*   if (!isLoggedIn) return <Redirect to="/" />; */

  //Name, birth_year, eye_color, gender,hair_color, height, mass, skin_color, homeworld, films, species, starships, vehicles
  return (
    <>
      <div className="detailed-container">
        <div className="info-wrapper">
          <div className="detailed-info">
            <div className="detailed-header">
              <h2>Luke Skywalker</h2>
            </div>
            <h3>Infos Générales</h3>

            <table className="general-info">
              <tr>
                <th>Espèce</th>
                <td>19BBY</td>
              </tr>
              <tr>
                <th>Véhicules</th>
                <td>blond</td>
              </tr>
              <tr>
                <th>Vaisseaux Spatiaux</th>
                <td>172</td>
              </tr>
              <tr>
                <th>Planète</th>
                <td>77</td>
              </tr>
              <tr>
                <th>Films</th>
                <td>fair</td>
              </tr>
            </table>
            <div className="detailed-sub-header">
              {/*               <h4>
                Espèce : <span>Humain </span>
              </h4>
              <h4>
                Véhicules : <span>Test</span>
              </h4>
              <h4>
                Vaisseaux spatiaux : <span>test</span>{" "}
              </h4>
              <h4>
                Planète : <span>Terre</span>
              </h4>
              <h4>
                Films :
                <span>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex
                  laborum expedita debitis dolorem iure delectus in similique
                  architecto aliquid ea nemo rem deserunt, incidunt optio maxime
                  aspernatur eum tempora eligendi.
                </span>
              </h4> */}
            </div>
            <h3>Infos spécifiques</h3>
            <table className="specific-info">
              <tr>
                <th>Année de naissance</th>
                <td>19BBY</td>
              </tr>
              <tr>
                <th>Couleur des yeux</th>
                <td>blond</td>
              </tr>
              <tr>
                <th>Couleur des cheveux</th>
                <td>172</td>
              </tr>
              <tr>
                <th>Taille</th>
                <td>77</td>
              </tr>
              <tr>
                <th> Couleur de peau</th>
                <td>fair</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedSheet;
