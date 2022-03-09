import React from "react";

import styles from "./SearchResults.module.css";

const FoodBankResults = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <input type="checkbox" id="withNeeds" />
        <label for="withNeeds"> Currently Requiring Items</label>
      </div>
      <hr/>
      <h3></h3>
    </div>
  );
};

export default FoodBankResults;
