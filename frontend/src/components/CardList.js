import { useEffect, useState, useContext } from "react";

//Contexts
import { DataContext } from "../contexts/DataContext";

// Composants
import Card from "./Card";
let count = 0;

const CardList = () => {
  const { loading, setLoading, data, icons } = useContext(DataContext);
  useEffect(() => {
    if (typeof data !== "undefined" && loading !== false) setLoading(false);
  }, []);

  return (
    <div className="card-list">
      {!loading
        ? data.map((els) =>
            els.data.map((el) => {
              count++;
              return (
                <Card
                  data={el}
                  icons={icons}
                  category={els.category}
                  key={count}
                  name={el.name || el.title}
                />
              );
            })
          )
        : null}
    </div>
  );
};

export default CardList;
