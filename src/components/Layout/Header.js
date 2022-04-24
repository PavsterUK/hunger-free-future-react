import React from "react";
import Navbar from "./Navbar";

import styles from "./Header.module.css";
import fbLogo from "../../img/foodbank-local.svg";
import DrawerMenu from "../../components/UI/DrawerMenu";
import "./DrawerMenu.css";
import BurgerMenuIcon from "../../img/open-menu-6208.svg";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={fbLogo} />
        <h1>Together, we can feed everyone.</h1>
        <div>
          <img src={BurgerMenuIcon} />
          <DrawerMenu />
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
