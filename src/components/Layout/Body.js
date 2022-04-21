import React, { useState, useEffect, useRef } from "react";

import L from "leaflet";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";
import ListFoodbanks from "../Foodbank/ListFoodbanks";
import TownSearchBox from "../SearchBox/TownSearchBox";
import AddMarkers from "../Map/AddMarkers";

import locateIcon from "../../img/currLoc.svg";
import "react-leaflet-markercluster/dist/styles.min.css";
import "./Body.css";

const Body = () => {
  const [itemsWithinBounds, setitemsWithinBounds] = useState([]);
  const [location, setLocation] = useState([]);
  const mapRef = useRef();

  const fetchWithinBounds = async (bounds) => {
    //Right bottom corner coords.
    const swLat = bounds.getSouthWest().lat;
    const swLng = bounds.getSouthWest().lng;

    //Left upper corner coords.
    const neLat = bounds.getNorthEast().lat;
    const neLng = bounds.getNorthEast().lng;

    const foodbanksResponse = await fetch(
      `http://localhost:8080/v1/api/foodbanks-within?swLat=${swLat}&swLng=${swLng}&neLat=${neLat}&neLng=${neLng}`
    );
    const foodbanks = await foodbanksResponse.json();

    const locationsResponse = await fetch(
      `http://localhost:8080/v1/api/locations-within?swLat=${swLat}&swLng=${swLng}&neLat=${neLat}&neLng=${neLng}`
    )
    const locations = await locationsResponse.json();

    setitemsWithinBounds([...foodbanks, ...locations])

  }

  useEffect(() => {
    setTimeout(() => {
      flyToUserLocationIfFound();
    }, 3000);
  }, [mapRef]);

  const MapBoundsAfterMove = () => {
    const map = useMapEvent("moveend", () => {
      fetchWithinBounds(map.getBounds());
    });
    return null;
  }

  const flyToUserLocationIfFound = () => {
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

  const flyToCoord = async (coordinates) => {
    await mapRef.current.flyTo(coordinates, 13);
    setLocation(coordinates);
  }

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
              onClick={flyToUserLocationIfFound}
            />
            <label id="location-image-label" for="location-image">
              My location
            </label>
          </div>
        </div>
        <div className="resultsContainer">
          <ListFoodbanks items={itemsWithinBounds} location={location} />
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
              url="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=NtCHCLnEB2T8gRRbY03N"
            />
            <AddMarkers items={itemsWithinBounds} />
            <MapBoundsAfterMove />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Body;
