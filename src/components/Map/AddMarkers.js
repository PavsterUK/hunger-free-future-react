import React from "react";
import L from "leaflet";
import { Marker, Tooltip, Popup } from "react-leaflet";

const AddMarkers = (props) => {
  let markers = props.items.map((foodbank, index) => {
    const myIcon = L.divIcon({
      className: "my-div-icon",
      html: `<h4>${index + 1}</h4>`,
    });
    return (
      <Marker
        position={[foodbank.latitude, foodbank.longitude]}
        key={foodbank.id + index}
        icon={myIcon}
      >
        <Tooltip>
          <span>{foodbank.name}</span>
          <Popup>
            <span>{foodbank.name}<br/>{foodbank.address}</span>
          </Popup>
        </Tooltip>
      </Marker>
    );
  });
  return <>{markers}</>;
};

export default AddMarkers;
