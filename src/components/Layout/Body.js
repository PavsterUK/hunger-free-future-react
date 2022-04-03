import React, { useState, useRef } from "react";

import styles from "./Body.module.css";
import Map from "../Map/Map";
import Results from "../Foodbank/Results";

const Body = () => {
  const [mapMarkers, setMapMarkers] = useState([]);
  const childCompRef = useRef();

  //Call setFbWithinBounds within Results component
  const updateMapBounds = (boundsAtMoveend) => {
    childCompRef.current?.setFbWithinBounds(boundsAtMoveend);
  };

  return (
    <div className={styles.container}>
      <Results
        ref={childCompRef}
        setMapMarkers={setMapMarkers}
      />
      <Map
        mapMarkers={mapMarkers}
        updateMapBounds={updateMapBounds}
      />
    </div>
  );
};

export default Body;
