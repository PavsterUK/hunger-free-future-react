import React from "react";

import styles from "./Filters.module.css";

function selectShortlistedApplicant(e) {
  console.log(e.target.checked);
}

const Filters = () => {
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
              <input
                type="checkbox"
                id="showNeeds"
                className="checkbox disable-team team_values"
                value="1"
                onClick={(e) => {
                  selectShortlistedApplicant(e);
                }}
              />
              <label for="showNeeds">With list of required items</label>
            </li>
          </ul>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Filters;
