import React, { useState, createContext } from "react";

/*To be imported by components that want to access the data.
The components need to also import { useContext} from react to consume the data.*/
export const DataContext = createContext();

// Contient les données. Doit être importé par App.js.
export const DataProvider = (props) => {
  const content = {
    // Nav

    categories: [
      { name: "Personnages", icon: "fa fa-users" },
      { name: "Films", icon: "fa fa-film" },
      { name: "Vaisseaux", icon: "fa fa-space-shuttle" },
      { name: "Véhicules", icon: "fa fa-car" },
      { name: "Espèces", icon: "fa fa-tint" },
      { name: "Planètes", icon: "fa fa-globe" },
    ],
  };
  return (
    <DataContext.Provider value={content}>
      {props.children}
    </DataContext.Provider>
  );
};
