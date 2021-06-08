import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import UserContext from "../contexts/UserContext";

// Logo
import raLogo from "../resources/rebel-alliance-logo.png";
import Axios from "axios";
Axios.defaults.withCredentials = true;

const Login = () => {
  let history = useHistory();
  const [username, setUsername] = useState("Luke");
  const [password, setPassword] = useState("DadSucks");
  const [msg, setMsg] = useState(null);

  const userContext = useContext(UserContext);
  const { setCurrentUser } = userContext;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await Axios.post("http://localhost:5001/login", {
      username,
      password,
    })
      .then((apiRes) => {
        setCurrentUser(apiRes.data);
        history.push("/browse");
      })
      .catch((err) => {
        setMsg(err.response.data.message);
        console.log(err);
        setCurrentUser(null);
      });
  };

  return (
    <>
      <Nav />
      <main className="form-container">
        <form>
          <img className="ra-logo" src={raLogo} alt="Rebel Alliance logo" />
          <h2 className="form-title">Connexion</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="nom d'utilisateur"
              required
              autoComplete="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              name="username"
              id="username"
              defaultValue={username ? username : ""}
            />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="mot de passe"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              id="password"
              defaultValue={password ? password : ""}
            />
          </div>

          <button className="btn btn-primary" onClick={handleSubmit}>
            Se connecter
          </button>
          {msg && (
            <div className="warning-message">
              <i class="fas fa-exclamation-triangle"></i>
              <h3>{msg} </h3>
            </div>
          )}
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Login;

/* <form className="form">
      {msg && <p className="msg">{msg}</p>}
      <InputGroup className="input">
        <InputGroup.Prepend>
          <InputGroup.Text
            id="user-icon"
            className="bg-empire-color"
            style={{ border: "none" }}
          >
            <FaUserCircle size="1.2em" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          size="lg"
          type="text"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="user-icon"
          onChange={(e) => setUsername(e.target.value)}
          defaultValue={username ? username : ""}
        />
      </InputGroup>
      <InputGroup className="input">
        <InputGroup.Prepend>
          <InputGroup.Text
            id="password-icon"
            className="bg-empire-color"
            style={{ border: "none" }}
          >
            <FaKey size="1.2em" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          size="lg"
          type="password"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="password-icon"
          onChange={(e) => setPassword(e.target.value)}
          defaultValue={password ? password : ""}
        />
      </InputGroup>
      <Button
        size="lg"
        variant="secondary"
        className={"button bg-empire-color hvr-fade"}
        onClick={handleSubmit}
      >
        ENTER
      </Button>
    </form> */
