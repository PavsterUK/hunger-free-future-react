import React, { useState, useRef } from "react";

import styles from "./Body.module.css";
import Map from "../Map/Map";
import FetchFoodbanksFromAPI from "../Foodbank/Results";

const Body = () => {
  const [mapMarkers, setMapMarkers] = useState();
  let zoomToLoc = []
  let mapBoundsMoveend = null;
  const childCompRef = useRef();


  const zoomToLocation = (location, zoom) => {
    zoomToLoc.push(location);
    zoomToLoc.push(zoom);
    console.log(zoomToLoc);
  }

  

  const updateMapBounds = (boundsAtMoveend) => {
    childCompRef.current?.setFbWithinBounds(boundsAtMoveend);
  };

  return (
    <div className={styles.container}>
      <FetchFoodbanksFromAPI
        setMapMarkers={setMapMarkers}
        mapMarkers={mapMarkers}
        ref={childCompRef}
        zoomToLocation={zoomToLocation}
      />
      <Map mapMarkers={mapMarkers} updateMapBounds={updateMapBounds} />
    </div>
  );
};

export default Body;
