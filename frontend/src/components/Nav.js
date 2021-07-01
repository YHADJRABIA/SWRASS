import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../authentication/useAuth";

/* Ressources*/
import logo from "../resources/sw.png";

import Axios from "axios";

Axios.defaults.withCredentials = true;

const Nav = () => {
  const { isLoggedIn } = useAuth();
  let history = useHistory();
  const handleClick = async (e) => {
    e.preventDefault();
    await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/logout`)
      .then((res) => history.push("/"))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <nav role="navigation">
      <ul>
        <li>
          <img className="logo" src={logo} alt="logo"></img>
        </li>
        {isLoggedIn ? (
          <li>
            <button className="btn btn-primary logout" onClick={handleClick}>
              Se déconnecter
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Nav;
