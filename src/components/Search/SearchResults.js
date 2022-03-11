import React from "react";

import styles from "./SearchResults.module.css";

const FoodBankResults = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <h2>select filters</h2>
        <div className={styles.verticalLine}>
          <div className={styles.dropdownSymbolDown}>&#x25BC;</div>
        </div>
        <div className={styles.dropdown}>
          <ul>
            <li>
              <input type="checkbox" id="inNeed" name="inNeed" />
              <label for="inNeed">Currently Requiring Donations</label>
            </li>
          </ul>
        </div>
      </div>

      <h1>results</h1>
    </div>
  );
};

export default FoodBankResults;
