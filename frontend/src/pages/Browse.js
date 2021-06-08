import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../authentication/useAuth";
import LazyLoad from "react-lazyload";

// Composants
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import CardList from "../components/CardList";

//Contexts
import { DataProvider } from "../contexts/DataContext";

// Envoi de requêtes serveur
import Axios from "axios";

Axios.defaults.withCredentials = true;

const Browse = () => {
  const [category, setCategory] = useState({});
  var [test, setTest] = useState([]);
  const categoryList = [
    "people",
    "films",
    "starships",
    "vehicles",
    "species",
    "planets",
  ];

  useEffect(() => {
    let fetchAPI = async () => {
      for (let i of categoryList) {
        await Axios.get(`http://localhost:5001/swapi/${i}`)
          .then((res) => {
            category[i] = res.data.results;
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };

    fetchAPI().then((res) => {
      console.log(category["people"]);
    });
  }, []);

  const { isLoading, isLoggedIn } = useAuth();
  let history = useHistory();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  if (isLoading) return <Loading />;

  // Redirection si utilisateur non connecté
  if (!isLoggedIn) return <Redirect to="/" />;

  const handleClick = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <DataProvider>
        <Nav />
        <main>
          <div className="search-section">
            <SearchBar />
            <Filter />
          </div>
          <div className="content-section">
            <CardList category={category["people"]} />
          </div>
        </main>

        <Footer />
      </DataProvider>
    </>
  );
};

export default Browse;
