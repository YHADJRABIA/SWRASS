import React, { useState, useEffect, useContext } from "react";
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
import { DataContext } from "../contexts/DataContext";

const Browse = () => {
  let history = useHistory();
  const { content } = useContext(DataContext);
  const { isFiltered, data, loading } = useContext(DataContext);

  const { isLoading, isLoggedIn } = useAuth();
  /*   const [loading, setLoading] = useState(true); */
  const [category, setCategory] = useState();

  useEffect(() => {}, [data]);

  if (isLoading) return <Loading />;

  // Redirection si utilisateur non connecté
  if (!isLoggedIn) return <Redirect to="/" />;

  const handleClick = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Nav />
      <main>
        <div className="search-section">
          <SearchBar />
          <Filter />
        </div>
        <div className="content-section">
          {loading ? <Loading /> : <CardList />}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Browse;
