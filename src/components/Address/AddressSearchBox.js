import React from "react";

import styles from "./AddressSearchBox.module.css";
import Suggestion from "./Suggestion";

const AddressSearchBox = () => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Please enter you town name"
        type="search"
      ></input>
      <div className={styles.suggestions}>
        <Suggestion/>
        <Suggestion/>
        <Suggestion/>
        <Suggestion/>
      </div>
      
    </div>
  );
};

export default AddressSearchBox;
