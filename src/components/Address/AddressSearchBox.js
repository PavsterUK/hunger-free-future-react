import React from "react";

import styles from "./AddressSearchBox.module.css";

const SearchBar = () => {
  return <div className={styles.container}>
      <input className={styles.input} placeholder="Please enter your location" type="search"></input>
  </div>;
};

export default SearchBar;
