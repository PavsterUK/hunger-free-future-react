import React from "react";

import styles from "./Foodbank.module.css";

const Foodbank = (props) => {
  return (
    <div className={styles.container}>
      <h2>{props.name}</h2>
      <a href={props.homepage}>Homepage</a>
      {/* <p>8 miles distance from your location</p> */}
      <h4>{props.address}</h4>
      <h4>{props.phone}</h4>
      <h4>{props.email}</h4>
      
      <ul>
        <li>{props.needs}</li>
      </ul>
      <hr />
    </div>
  );
};

export default Foodbank;
