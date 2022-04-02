import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMapEvent,
  Popup
} from "react-leaflet";

import "./Map.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";

const Map = (props) => {
  const [mapCenter, setMapCenter] = useState([54.172, -4.59]);
  const [mapZoom, setMapZoom] = useState(6);
  let markers = [];

  
  if (props.mapMarkers) {
    markers = props.mapMarkers.map((marker) => {
      return (
        <Marker position={marker.lat_lng.split(",")}>
          <Tooltip>
            <span>{marker.name}</span>
            <Popup >
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Tooltip>
        </Marker>
      );
    });
  }

  function MapBoundsAfterMove() {
    const map = useMapEvent("moveend", () => {
      props.updateMapBounds(map.getBounds().pad(-0.97));
    });
    return null;
  }

  return (
    <div className="map-container">
      <MapContainer center={mapCenter} zoom={mapZoom}>
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
        <MapBoundsAfterMove />
      </MapContainer>
    </div>
  );
};

export default Map;
