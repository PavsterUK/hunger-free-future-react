import React, {useState} from "react";
import Navbar from "./Navbar";


import styles from "./Header.module.css";
import fbLogo from "../../img/foodbank-local.svg";
import DrawerMenu from "../../components/UI/DrawerMenu";

const Header = () => {
  const [openTab, setOpenTab] = useState();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={fbLogo} alt="" />
        <h1>Thanks for giving food!</h1>
      </div>
      <DrawerMenu setOpenTab={setOpenTab}/>
      <Navbar openTab={openTab} setOpenTab={setOpenTab}/>
    </div>
  );
};

export default Header;
