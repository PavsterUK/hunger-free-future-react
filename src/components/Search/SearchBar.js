import React from "react";

import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return <div className={styles.container}>
      <input className={styles.input} placeholder="Please enter town name or postcode" type="search"></input>

  </div>;
};

export default SearchBar;
