import React, { useState } from "react";

import styles from "./Body.module.css";
import Map from "../Map/Map";
import FoodBankSearch from "../Search/FoodBankSearch";

const Body = () => {
  const [locations, setLocations] = useState();

  return (
    <div className={styles.container}>
      <FoodBankSearch setLocations={setLocations} locations={locations} />
      <Map locations={locations} />
    </div>
  );
};

export default Body;
