import { useEffect } from "react";
import Card from "./Card";

const CardList = ({ category }) => {
  useEffect(() => {
    console.log(category);
  }, []);

  return (
    <div className="card-list">
      <Card info={category} />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default CardList;
