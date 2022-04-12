import React, { useState, useEffect, useRef } from "react";

import L from "leaflet";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import ListFoodbanks from "../Foodbank/ListFoodbanks";
import TownSearchBox from "../SearchBox/TownSearchBox";
import AddMarkers from "../Map/AddMarkers";

import locateIcon from "../../img/currLoc.svg";
import "react-leaflet-markercluster/dist/styles.min.css";
import "./Body.css";

const Body = () => {
  const [allFoodbanks, setAllFoodbanks] = useState([]);
  const [foodbanksWithinBounds, setFoodbanksWithinBounds] = useState([]);
  const [location, setLocation] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const foodbanksResp = await fetch(
        "https://hunger-free-future.herokuapp.com/v1/api/foodbanks-with-needs"
      );
      const salvArmResp = await fetch(
        "https://hunger-free-future.herokuapp.com/v1/api/all-salvation-army-with-needs"
      );
      const foodbanksJson = await foodbanksResp.json();
      const salvArmJson = await salvArmResp.json();
      setAllFoodbanks([...foodbanksJson, ...salvArmJson]);
    }
    fetchData();
  }, [mapRef]);

  useEffect(() => {
    setTimeout(() => {
      const { current: map } = mapRef;
      map
        .locate() /*Returs map so you can do chaining */
        .on("locationfound", function (e) {
          flyToCoord([e.latitude, e.longitude]);
          L.popup()
            .setLatLng([e.latitude, e.longitude])
            .setContent("<p>Your approx. location</p>")
            .openOn(map);
          setLocation([e.latitude, e.longitude]);
          setTimeout(() => {
            L.circle([e.latitude, e.longitude], { radius: 100 }).addTo(map);
          }, 4000);
        })
        .on("locationerror", function (e) {
          console.log(e);
          alert("Location declined by user.");
        });
    }, 3000);
  }, [mapRef]);

  function MapBoundsAfterMove() {
    const map = useMapEvent("moveend", () => {
      setFbWithinBounds(map.getBounds());
    });
    return null;
  }

  function flyToCurrentLocation() {
    const { current: map } = mapRef;
    map
      .locate() /*Returs map so you can do chaining */
      .on("locationfound", function (e) {
        flyToCoord([e.latitude, e.longitude]);
        L.popup()
          .setLatLng([e.latitude, e.longitude])
          .setContent("<p>Your approx. location</p>")
          .openOn(map);
        setLocation([e.latitude, e.longitude]);
        setTimeout(() => {
          L.circle([e.latitude, e.longitude], { radius: 100 }).addTo(map);
        }, 4000);
      })
      .on("locationerror", function (e) {
        console.log(e);
        alert("Location declined by user.");
      });
  }

  async function flyToCoord(coordinates) {
    await mapRef.current.flyTo(coordinates, 13);
    setLocation(coordinates);
  }

  const setFbWithinBounds = (boundsAtMoveend, limit = 99) => {
    const itemsWithinBounds = allFoodbanks.filter((foodbank) => {
      return boundsAtMoveend.contains(
        L.latLng(
          foodbank.lat_lng.substring(0, foodbank.lat_lng.indexOf(",") - 1),
          foodbank.lat_lng.substring(
            foodbank.lat_lng.indexOf(",") + 1,
            foodbank.lat_lng.length
          )
        )
      );
    });
    itemsWithinBounds.length < limit
      ? setFoodbanksWithinBounds(itemsWithinBounds)
      : setFoodbanksWithinBounds([]);
  };

  return (
    <div className="bodyContainer">
      <div className="input-and-results-container">
        <div className="searchboxContainer">
          <TownSearchBox flyToCoord={flyToCoord} />
          <div className="my-location-container">
            <img
              alt=""
              id="location-image"
              src={locateIcon}
              onClick={flyToCurrentLocation}
            />
            <label id="location-image-label" for="location-image">
              My location
            </label>
          </div>
        </div>
        <div className="resultsContainer">
          <ListFoodbanks items={foodbanksWithinBounds} location={location} />
        </div>
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
              <AddMarkers items={foodbanksWithinBounds} />
            </MarkerClusterGroup>
            <MapBoundsAfterMove />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Body;
