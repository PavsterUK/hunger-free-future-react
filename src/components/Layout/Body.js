import React, { useState, useRef } from "react";

import styles from "./Body.module.css";
import Map from "../Map/Map";
import FetchFoodbanksFromAPI from "../Foodbank/FetchFoodbanksFromAPI";

const Body = () => {
  const [mapMarkers, setMapMarkers] = useState();
  let mapBoundsMoveend = null;
   const childCompRef = useRef()
  
  const updateMapBounds = (mapBoundsMoveend) => {
    childCompRef.current?.childFunction(mapBoundsMoveend);
  }



  return (
    <div className={styles.container}>
      <FetchFoodbanksFromAPI
        setMapMarkers={setMapMarkers}
        mapMarkers={mapMarkers}
        ref={childCompRef}
      />
      <Map mapMarkers={mapMarkers} updateMapBounds={updateMapBounds} />
    </div>
  );
};

export default Body;
