import React from "react";

import styles from "./SearchResults.module.css";

const SearchResults = (props) => {
  return (
    <div className={styles.container}>
      {props.searchResults}
    </div>
  );
};

export default SearchResults;
