import React from "react";

import styles from "./Body.module.css";
import Map from "../Map/Map";
import FoodBankSearch from "../Search/FoodBankSearch";

const Body = () => {
  return (
    <div className={styles.container}>
      <FoodBankSearch />
      <Map />
    </div>
  );
};

export default Body;
