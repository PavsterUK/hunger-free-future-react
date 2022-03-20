import React, { useEffect } from "react";
import ListFoodbanks from "./ListFoodbanks";

import styles from "../Foodbank/FoodBankSearch.module.css";
import Filters from "./Filters";
import SearchBar from "../Address/AddressSearchBox";

const FetchFoodbanksFromAPI = (props) => {
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/v1/api/food-banks");
      const json = await response.json();
      props.setMapMarkers(json);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <SearchBar />
      <Filters />
      <ListFoodbanks items={props.markersWithinBounds} />
    </div>
  );
};

export default FetchFoodbanksFromAPI;
