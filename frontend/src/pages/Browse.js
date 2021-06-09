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
  let history = useHistory();
  const { isLoading, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState();

  const categoryList = [
    "people",
    "films",
    "starships",
    "vehicles",
    "species",
    "planets",
  ];

  useEffect(() => {
    /*     (async () => {
      for (let i of categoryList) {
        await Axios.get(`http://localhost:5001/swapi/${i}`)
          .then((res) => {
            category[i] = res.data.results;
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })(); */

    /* setCategory(category);*/

    const fetchAPI = async () => {
      let fetchedData = [];
      for (let i of categoryList) {
        fetchedData[i] = await Axios.get(`http://localhost:5001/swapi/${i}`)
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

      //setCategory(category);
      /*     return fetchedData; */
    };

    fetchAPI(); /* .then((res) => {
      console.log(res);
    }); */
  }, []);

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
            {loading ? <Loading /> : <CardList data={data} />}
          </div>
        </main>
        <Footer />
      </DataProvider>
    </>
  );
};

export default Browse;
