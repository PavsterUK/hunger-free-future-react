import React, { useState, useEffect } from "react";
import AllFoodBanksList from "../Foodbank/AllFoodBanksList";

import styles from "../Search/FoodBankSearch.module.css";
import Filters from "./Filters";
import SearchBar from "./SearchBar";

const FoodBankSearch = (props) => {
  const [foodBanksList, setFoodBanksList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/v1/api/food-banks");
      const json = await response.json();
      setFoodBanksList(json);
      props.setLocations(json);
    };

    fetchData()
    .catch(console.error);
    
  }, []);

  
  return (
    <div className={styles.container}>
      <SearchBar />
      <Filters />
      <AllFoodBanksList items={foodBanksList} />
    </div>
  );
};

export default FoodBankSearch;
