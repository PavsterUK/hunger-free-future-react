import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "./Map.css";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import L from "leaflet";

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

  const createClusterCustomIcon = (cluster) => {
    const count = cluster.getChildCount();
    
  
    return L.divIcon({
      iconSize: 40,
      html:
        `<div>
          <span class="markerClusterLabel">${count}</span>
        </div>`,
        className: 'my-div-icon',
        
    });
  };

  return (
    <div className="map-container">
      <MapContainer center={[54.17247343528976, -4.590914887363949]} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=NtCHCLnEB2T8gRRbY03N"
        />
        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          showCoverageOnHover={false}
          spiderLegPolylineOptions={{
            weight: 0,
            opacity: 0,
          }}
         >
           {locations}
        </MarkerClusterGroup>
        
      </MapContainer>
    </div>
  );
};

export default Map;
