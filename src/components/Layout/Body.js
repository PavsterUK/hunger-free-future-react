import React, { useState, useEffect, useRef } from "react";

import L from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  Popup,
  useMapEvent,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import ListFoodbanks from "../Foodbank/ListFoodbanks";
import TownSearchBox from "../SearchBox/TownSearchBox";

import locateIcon from "../../img/currLoc.svg";
import "react-leaflet-markercluster/dist/styles.min.css";
import "./Body.css";

const Body = () => {
  const [mapMarkers, setMapMarkers] = useState([]);
  const [allFoodbanks, setAllFoodbanks] = useState([]);
  const [foodbanksWithinBounds, setFoodbanksWithinBounds] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    fetchData();
  }, [mapRef]);

  useEffect(() => {
    setTimeout(() => {
      flyToCurrentLocation();
    }, 3000);
  }, [mapRef]);

  async function fetchData() {
    const foodbanksResp = await fetch(
      "http://localhost:8080/v1/api/foodbanks-with-needs"
    );
    const salvArmResp = await fetch(
      "http://localhost:8080/v1/api/all-salvation-army-with-needs"
    );
    const foodbanksJson = await foodbanksResp.json();
    const salvArmJson = await salvArmResp.json();
    setAllFoodbanks([...foodbanksJson, ...salvArmJson]);
    setMapMarkers([...foodbanksJson, ...salvArmJson]);
  }

  function MapBoundsAfterMove() {
    const map = useMapEvent("moveend", () => {
      setFbWithinBounds(map.getBounds());
    });
    return null;
  }

  function flyToCurrentLocation() {
    const { current: map } = mapRef;
    map
      .locate() /* This will return map so you can do chaining */
      .on("locationfound", function (e) {
        flyToCoord([e.latitude, e.longitude]);
        const popup = L.popup()
          .setLatLng([e.latitude, e.longitude])
          .setContent("<p>Your approx. location</p>")
          .openOn(map);
          setTimeout(() => {
            L.circle([e.latitude, e.longitude], {radius: 100}).addTo(map);
          }, 4000);
        
      })
      .on("locationerror", function (e) {
        console.log(e);
        alert("Location declined by user.");
      });
  }

  async function flyToCoord(coordinates) {
    await mapRef.current.flyTo(coordinates, 14);
  }

  const setFbWithinBounds = (boundsAtMoveend) => {
    setFoodbanksWithinBounds(
      allFoodbanks.filter((foodbank) => {
        return boundsAtMoveend.contains(
          L.latLng(
            foodbank.lat_lng.substring(0, foodbank.lat_lng.indexOf(",") - 1),
            foodbank.lat_lng.substring(
              foodbank.lat_lng.indexOf(",") + 1,
              foodbank.lat_lng.length
            )
          )
        );
      })
    );
  };

  let markers = mapMarkers.map((marker, index) => {
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

  return (
    <div className="bodyContainer">
      <div className="resultsContainer">
        <div className="searchboxContainer">
          <img src={locateIcon} onClick={flyToCurrentLocation} />
          <TownSearchBox flyToCoord={flyToCoord} />
        </div>

        <ListFoodbanks items={foodbanksWithinBounds} />
      </div>
      <div className="mapWrapper">
        <div className="map-container">
          <MapContainer
            whenCreated={(mapInstance) => {
              mapRef.current = mapInstance;
            }}
            center={[54.172, -4.59]}
            zoom={6}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=HM5OeEc4UZtoMyYxgZbV"
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
      </div>
    </div>
  );
};

export default Body;
