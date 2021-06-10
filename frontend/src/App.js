import "./styles/app.scss";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home.js";
import PageNotFound from "./pages/PageNotFound.js";
import Browse from "./pages/Browse.js";
import DetailedSheet from "./pages/DetailedSheet.js";

// Contexts
import { DataProvider } from "./contexts/DataContext";

//Components
import Footer from "./components/Footer";

// Authentification

import { useAuth } from "./authentication/useAuth";
import UserContext from "./contexts/UserContext";
import { ProtectedRoute } from "./utilities/ProtectedRoute";

// Axios - communication avec API
import Axios from "axios";

function App() {
  const { isLoading } = useAuth();
  const [currentUser, setCurrentUser] = useState({});

  const UserContextValue = {
    currentUser,
    setCurrentUser,
  };

  return (
    <UserContext.Provider value={UserContextValue}>
      {isLoading ? null : (
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <DataProvider>
                <ProtectedRoute exact path="/browse" component={Browse} />
                <ProtectedRoute
                  exact
                  path="/detailed:name"
                  component={DetailedSheet}
                />
              </DataProvider>
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Router>
        </div>
      )}
    </UserContext.Provider>
  );
}

export default App;
