import React from "react";
import About from "../Tabs/About";
import Contact from "../Tabs/Contact";

import styles from "./Navbar.module.css";

/* eslint-disable jsx-a11y/anchor-is-valid */
const Navbar = (props) => {
 
  return (
    <div className={styles.container}>
      <ul className={styles.mainNav}>
        <li>
          <About setOpenTab={props.setOpenTab} openTab={props.openTab}/>
        </li>
        <li>
          <Contact setOpenTab={props.setOpenTab} openTab={props.openTab}/>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
