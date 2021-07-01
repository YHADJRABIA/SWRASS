import React, { useState, createContext, useEffect } from "react";
import { useAuth } from "../authentication/useAuth";

// Envoi de requêtes serveur
import Axios from "axios";
Axios.defaults.withCredentials = true;

/*To be imported by components that want to access the data.
The components need to also import { useContext} from react to consume the data.*/
export const DataContext = createContext();

// Contient les données. Doit être importé par App.js.
export const DataProvider = ({ children }) => {
  let [timer, setTimer] = useState(null);
  const [isFiltered, setIsFiltered] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterResults = async (...filteredData) => {
    let tempData = data;
    await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/swapi/search`,
      filteredData[0]
    )
      .then((res) => {
        setLoading(true);
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        // Si erreur, recouvrir anciennes données
        setData(tempData);
      });

    // Mettre fin au chargement lorsque données récupérées
    setLoading(false);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      let fetchedData = [];

      for (let i of content.categories.map((el) => el.type)) {
        fetchedData[i] = await Axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/swapi/${i}`
        )
          .then((res) => {
            setData((data) => [
              ...data,
              { category: i, data: res.data.results },
            ]);
          })
          .catch((err) => {
            console.error(err);
          });
      }
      setLoading(false);
    };
    // Si aucun paramètre de recherche ou de filtre, récuperer toutes les infos
    if (isFiltered.length <= 0 && keyword === "") {
      fetchAPI();
    }
    // Sinon récuperer infos filtrées
    else {
      console.log(keyword, isFiltered);
      setTimeout(() => {
        filterResults({ keyword, isFiltered });
      }, 500);
      /*       clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          filterResults({ keyword, isFiltered });
        }, 500)
      ); */
    }
  }, [isFiltered, keyword]);
  let icons = {
    people: "fa fa-users",
    films: "fa fa-film",
    starships: "fa fa-space-shuttle",
    vehicles: "fa fa-car",
    species: "fa fa-tint",
    planets: "fa fa-globe",
  };
  const content = {
    categories: [
      { name: "Personnages", type: "people", icon: "fa fa-users" },
      { name: "Films", type: "films", icon: "fa fa-film" },
      { name: "Vaisseaux", type: "starships", icon: "fa fa-space-shuttle" },
      { name: "Véhicules", type: "vehicles", icon: "fa fa-car" },
      { name: "Espèces", type: "species", icon: "fa fa-tint" },
      { name: "Planètes", type: "planets", icon: "fa fa-globe" },
    ],
  };
  return (
    <DataContext.Provider
      value={{
        content,
        isFiltered,
        setIsFiltered,
        keyword,
        setKeyword,
        data,
        setData,
        loading,
        setLoading,
        icons,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
