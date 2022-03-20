import React, { useState } from "react";

import styles from "./Body.module.css";
import Map from "../Map/Map";
import FetchFoodbanksFromAPI from "../Foodbank/FetchFoodbanksFromAPI";

const Body = () => {
  const [mapMarkers, setMapMarkers] = useState();
  const [mapBounds, setMapBounds] = useState();
  let markersWithinBounds = [];

  if (mapBounds) {
    markersWithinBounds = mapMarkers.map((foodbank) => {
      if (mapBounds.contains(foodbank.lat_lng.split(","))) {
        return foodbank;
      }
    });
  }

  return (
    <div className={styles.container}>
      <FetchFoodbanksFromAPI
        setMapMarkers={setMapMarkers}
        markersWithinBounds={markersWithinBounds}
      />
      <Map mapMarkers={mapMarkers} setMapBounds={setMapBounds} />
    </div>
  );
};

export default Body;
