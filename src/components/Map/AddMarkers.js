import React, { useState } from "react";
import L from "leaflet";
import { Marker, Tooltip, Popup } from "react-leaflet";

const AddMarkers = (props) => {
  let markers = props.items.map((marker, index) => {
    const myIcon = L.divIcon({
      className: "my-div-icon",
      html: `<h4>${index + 1}</h4>`,
    });
    return (
      <Marker
        position={marker.lat_lng.split(",")}
        key={marker.slug + index}
        icon={myIcon}
      >
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
