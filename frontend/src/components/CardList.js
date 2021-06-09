import { useEffect, useState, useContext } from "react";

//Contexts
import { DataContext } from "../contexts/DataContext";

// Composants
import Card from "./Card";
let count = 0;

const CardList = ({ data }) => {
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(data);
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
                  type={els.category}
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
