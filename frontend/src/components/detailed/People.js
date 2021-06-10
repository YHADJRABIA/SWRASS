import React from "react";

const people = (data) => {
  return (
    <>
      <div className="detailed-container">
        <div className="info-wrapper">
          <div className="detailed-info">
            <div className="detailed-header">
              <h2>{data.name || data.title}</h2>
            </div>
            <h3>Infos Générales</h3>

            <table className="general-info">
              <tr>
                <th>Année de naissance</th>
                <td>{data.birth_year}</td>
              </tr>
              <tr>
                <th>Véhicules</th>
                <td>{data.vehicles}</td>
              </tr>
              <tr>
                <th>Vaisseaux Spatiaux</th>
                <td>{data.starships}</td>
              </tr>
              <tr>
                <th>Planète</th>
                <td>{data.homeworld}</td>
              </tr>
              <tr>
                <th>Films</th>
                <td>{data.films}</td>
              </tr>
            </table>
            <div className="detailed-sub-header"></div>
            <h3>Infos spécifiques</h3>
            <table className="specific-info">
              <tr>
                <th>Année de naissance</th>
                <td>{data.birth_year}</td>
              </tr>
              <tr>
                <th>Couleur des yeux</th>
                <td>{data.eye_color}</td>
              </tr>
              <tr>
                <th>Couleur des cheveux</th>
                <td>{data.hair_color}</td>
              </tr>
              <tr>
                <th>Taille</th>
                <td>{data.height}</td>
              </tr>
              <tr>
                <th> Masse</th>
                <td>{data.mass}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default people;
