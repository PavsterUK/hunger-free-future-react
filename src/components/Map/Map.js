import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

import "./Map.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";

const Map = (props) => {
  
  let locations = [];

  if (props.locations) {
    locations = props.locations.map((location) => {
      return (
        <Marker position={location.lat_lng.split(",")}>
          <Popup>
            <p>{location.name}</p>
          </Popup>
        </Marker>
      );
    });
  }

  function GetFeaturesInView() {
    const map = useMap();
    var features = [];
    map.eachLayer( function(layer) {
      if(layer instanceof L.Marker) {
        console.log(layer._markers);
    }
    });
    return null;
  }


  return (
    <div className="map-container">
      <MapContainer center={[54.17247343528976, -4.590914887363949]} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=NtCHCLnEB2T8gRRbY03N"
        />

        <MarkerClusterGroup
          showCoverageOnHover={false}
          spiderLegPolylineOptions={{
            weight: 0,
            opacity: 0,
          }}
        >
          {locations}
        </MarkerClusterGroup>

        <GetFeaturesInView/>

      </MapContainer>
    </div>
  );
};

export default Map;
