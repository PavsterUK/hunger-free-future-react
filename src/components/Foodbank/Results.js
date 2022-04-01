import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import ListFoodbanks from "./ListFoodbanks";

import styles from "../Foodbank/Results.module.css";
import Filters from "./Filters";
import SearchBar from "../Address/AddressSearchBox";
import L from "leaflet";

const FetchFromAPI = forwardRef(({ actionButtons, ...props }, ref) => {
  const [allFoodbanks, setAllFoodbanks] = useState([]);
  const [allFbLocations, setAllFbLocations] = useState([]);
  const [foodbanksWithinBounds, setFoodbanksWithinBounds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const foodbanksResp = await fetch("http://localhost:8080/v1/api/foodbanks-with-needs");
    const salvArmResp = await fetch("http://localhost:8080/v1/api/all-salvation-army-with-needs");

    const foodbanksJson = await foodbanksResp.json();
    const salvArmJson = await salvArmResp.json();

    props.setMapMarkers([...foodbanksJson, ...salvArmJson]);
    setAllFoodbanks([...foodbanksJson, ...salvArmJson]);
  };

  useImperativeHandle(ref, () => ({
    setFbWithinBounds,
  }));

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

  return (
    <div className={styles.container}>
      <SearchBar />
      <Filters />
      <ListFoodbanks items={foodbanksWithinBounds} />
    </div>
  );
});

export default FetchFromAPI;
