import React, { useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMapEvent,
} from "react-leaflet";

import "./Map.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";

const Map = (props) => {
  let mapRef = useRef();

  let markers = [];

  if (props.mapMarkers) {
    markers = props.mapMarkers.map((marker) => {
      return (
        <Marker position={marker.lat_lng.split(",")}>
          <Tooltip>
            <span>{marker.name}</span>
          </Tooltip>
        </Marker>
      );
    });
  }

  handleMove = () => {
   console.log("moved")
  }

  
  function MapBoundsAfterMove() {
    const map = useMapEvent("moveend", () => {
      // map.getBounds().pad(-0.97))
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
          {markers}
        </MarkerClusterGroup>

        <MapBoundsAfterMove ref={mapRef} />
      </MapContainer>
    </div>
  );
};

export default Map;
