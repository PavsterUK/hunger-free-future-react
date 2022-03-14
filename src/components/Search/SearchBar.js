import React from "react";

import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return <div className={styles.container}>
      <input className={styles.input} placeholder="Please enter location here" type="search"></input>

  </div>;
};

export default SearchBar;
