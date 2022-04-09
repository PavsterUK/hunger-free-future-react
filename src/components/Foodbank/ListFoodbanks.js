import React from "react";
import styles from "./ListFoodbanks.module.css";
import phonePic from "../../img/phone-504.svg";
import homepagePic from "../../img/homepage.svg";
import mailPic from "../../img/mail.svg";

const ListFoodbanks = (props) => {
  const foodBanks = props.items.map((foodbank, i) => {
    return (
      <div key={i} className={styles.foodbank}>
        <div className={styles.locationIcon}>
          <h3>{i + 1}</h3>
        </div>
        <div className={styles.mainInfo}>
          <h3>{foodbank.name}</h3>
          <div className={styles.address}>{foodbank.address}</div>
          <a href={foodbank.homepage} className={styles.homepage}>
            <img src={homepagePic} />
            <div>Home page</div>
          </a>

          <a href={`tel:${foodbank.phone}`} className={styles.phone}>
            <img src={phonePic} />
            <div>{foodbank.phone}</div>
          </a>

          <a href={`mailto:${foodbank.email}`} className={styles.email}>
            <img src={mailPic} />
            <div>{foodbank.email}</div>
          </a>
          <span>{foodbank.needs}</span>
        </div>
      </div>
    );
  });

  return <div className={styles.container}>{foodBanks}</div>;
};

export default ListFoodbanks;
