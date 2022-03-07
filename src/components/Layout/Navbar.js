import React from "react";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.mainNav}>
        <li>
          <a>Mission</a>
        </li>
        <li>
          <a>FoodBanks</a>
        </li>
        <li>
          <a>About</a>
        </li>
        <li>
          <a>Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
