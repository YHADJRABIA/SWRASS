import React, { useState, createContext, useEffect } from "react";

/*To be imported by components that want to access the data.
The components need to also import { useContext} from react to consume the data.*/
export const DataContext = createContext();

// Contient les données. Doit être importé par App.js.
export const DataProvider = ({ children }) => {
  const content = {
    categories: [
      { name: "Personnages", type: "people", icon: "fa fa-users" },
      { name: "Films", type: "films", icon: "fa fa-film" },
      { name: "Vaisseaux", type: "spaceships", icon: "fa fa-space-shuttle" },
      { name: "Véhicules", type: "vehicles", icon: "fa fa-car" },
      { name: "Espèces", type: "species", icon: "fa fa-tint" },
      { name: "Planètes", type: "planets", icon: "fa fa-globe" },
    ],
  };
  return (
    <DataContext.Provider value={content}>{children}</DataContext.Provider>
  );
};
