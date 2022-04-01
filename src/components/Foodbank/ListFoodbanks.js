import React from "react";
import styles from "./ListFoodbanks.module.css";

const ListFoodbanks = (props) => {
  const foodBanks = props.items.map((foodbank) => {
    return (
      <div className={styles.foodbank}>
        <h2>{foodbank.name}</h2>
        <a href={foodbank.homepage}>Homepage</a>
        <h4>{foodbank.address}</h4>
        <h4>{foodbank.phone}</h4>
        <h4>{foodbank.email}</h4>

        <span>{foodbank.needs}</span>

        <hr />
      </div>
    );
  });

  return <div className={styles.container}>{foodBanks}</div>;
};

export default ListFoodbanks;