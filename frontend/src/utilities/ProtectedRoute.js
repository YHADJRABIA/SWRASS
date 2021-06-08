import React from "react";
import { BrowserRouter as Redirect, Route } from "react-router-dom";
import { useAuth } from "../authentication/useAuth";

// Gestion d'accès des utilisateurs en fonctions de leurs autorisations.
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading)
    return <div className="loading-animation">{/* Loading animation */}</div>;
  return isLoggedIn ? (
    // Si utilisateur connecté, chargement du composant
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    // Sinon, redirection forcée
    <Redirect to="/" />
  );
};
