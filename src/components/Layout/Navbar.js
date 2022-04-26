import React from "react";
import About from "../Tabs/About";

import styles from "./Navbar.module.css";

/* eslint-disable jsx-a11y/anchor-is-valid */
const Navbar = () => {
  

  return (
    <div className={styles.container}>
      <ul className={styles.mainNav}>
        <li>
          <a href="#">Mission </a>
        </li>
        <li>
          <About isOpen={false}/>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
