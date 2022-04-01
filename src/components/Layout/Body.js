import React, { useState, useRef } from "react";

import styles from "./Body.module.css";
import Map from "../Map/Map";
import FetchFoodbanksFromAPI from "../Foodbank/Results";

const Body = () => {
  const [mapMarkers, setMapMarkers] = useState();
  let mapBoundsMoveend = null;
  const childCompRef = useRef();

  const updateMapBounds = (boundsAtMoveend) => {
    childCompRef.current?.setFbWithinBounds(boundsAtMoveend);
  };

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
