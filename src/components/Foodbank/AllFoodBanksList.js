import React from "react";
import Foodbank from "./Foodbank";
import styles from "./AllFoodBankList.module.css";

const AllFoodBanksList = (props) => {
  const foodBanks = props.items.map((foodbank) => {
    return <Foodbank 
    key={foodbank.slug} 
    name={foodbank.name}
    address={foodbank.address}
    email={foodbank.email}
    phone={foodbank.phone} 
    homepage={foodbank.urls.homepage}
    />;
  });

  

  return <div className={styles.container}>{foodBanks}</div>;
};

export default AllFoodBanksList;
