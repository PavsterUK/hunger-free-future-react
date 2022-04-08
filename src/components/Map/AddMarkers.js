import React from "react";
import {
    Marker,
    Tooltip,
    Popup
  } from "react-leaflet";

const AddMarkers = (props) => {
  let markers = props.items.map((marker, index) => {
    return (
      <Marker key={marker.slug + index} position={marker.lat_lng.split(",")}>
        <Tooltip>
          <span>{marker.name}</span>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Tooltip>
      </Marker>
    );
  });
  return <>{markers}</>;
};

export default AddMarkers;
