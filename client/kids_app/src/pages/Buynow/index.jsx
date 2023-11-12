import React from "react";
import "./style.css";

const Buynow = () => {
  const createCards = () => {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return numbers.map((val) => {
      return <h1>{val}</h1>;
    });
  };

  return <div className="cards-grid">{createCards()}</div>;
};

export default Buynow;
