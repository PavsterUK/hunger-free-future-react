import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import ListFoodbanks from "./ListFoodbanks";

import styles from "../Foodbank/FoodBankSearch.module.css";
import Filters from "./Filters";
import SearchBar from "../Address/AddressSearchBox";

const FetchFoodbanksFromAPI = forwardRef(({ actionButtons, ...props }, ref) => {
  const [markersWithinBounds, setMarkersWithinBounds]  = useState([]);
  const mapBoundsMoveend = null;
  
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/v1/api/food-banks");
      const json = await response.json();
      props.setMapMarkers(json);
    };
    fetchData().catch(console.error);
  }, []);

  const childFunction = () => {
    // update childDataApi and pass it to parent
    console.log("inside refreshEntireGrid");
  }

  useImperativeHandle(ref, () => ({
    childFunction
  }));

  




  if (props.mapBounds && props.mapMarkers) {
    console.log("inside");
    setMarkersWithinBounds(props.mapMarkers.map((foodbank) => {
      if (props.mapBoundsMoveend.contains(foodbank.lat_lng.split(","))) {
        return foodbank;
      }
    }));
  }

  return (
    <div className={styles.container}>
      <SearchBar />
      <Filters />
      <ListFoodbanks items={markersWithinBounds} />
    </div>
  );
});

export default FetchFoodbanksFromAPI;
