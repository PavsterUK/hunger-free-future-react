import React, { useState } from "react";
import styles from "./ListFoodbanks.module.css";
import L from "leaflet";
import Collapsible from "react-collapsible";
import "./ListFoodbanks.css";

import phonePic from "../../img/phone-504.svg";
import homepagePic from "../../img/homepage.svg";
import mailPic from "../../img/mail.svg";
import distancePic from "../../img/distance.svg";
import plusGreen from "../../img/plus-green.svg";

const ListFoodbanks = (props) => {
  // Distance between 2 point in miles, truncated to 2 decimals
  const distanceTo = (to_latitude, to_longitude) => {
    const from = L.latLng(props.location[0], props.location[1]);
    const to = L.latLng(to_latitude, to_longitude);
    const distance = from.distanceTo(to) / 1000 / 1.6;
    return distance.toFixed(2);
  };

  const MoreInfo = () => {
    return (
      <div className={styles.moreInfo}>
        More info
        <img src={plusGreen} alt="" />
      </div>
    );
  };

  const foodBanks = props.items.map((foodbank, i) => {
    return (
      <div className={styles.mainAndMoreInfoContaniner}>
        <div key={foodbank.slug + foodbank.id} className={styles.foodbank}>
          <div className={styles.locationIcon}>
            <h3>{i + 1}</h3>
          </div>
          <div className={styles.mainInfo}>
            <h3>{foodbank.name}</h3>
            <div className={styles.address}>{foodbank.address}</div>
            <div>
              {foodbank.part_of && (
                <h4>This location is part of {foodbank.part_of} Foodbank.</h4>
              )}
            </div>

            <a href={foodbank.homepage} className={styles.homepage}>
              <img src={homepagePic} alt="" />
              <div>Visit homepage</div>
            </a>

            <a href={`tel:${foodbank.phone}`} className={styles.phone}>
              <img src={phonePic} alt="" />
              <div>{foodbank.phone}</div>
            </a>

            <a href={`mailto:${foodbank.email}`} className={styles.email}>
              <img src={mailPic} alt="" />
              <div>{foodbank.email}</div>
            </a>

            <div className={styles.distance}>
              <img src={distancePic} alt="" />
              Approx. {distanceTo(foodbank.latitude, foodbank.longitude)} miles
              away
            </div>
          </div>
        </div>
        <Collapsible className={styles.collapsible} trigger={<MoreInfo/>}>
          <div className={styles.moreInfoRevealed}>
            <h4>Any food Donations always welcomed.</h4>
            <span>
              {foodbank.needs != null && (
                <>
                  <h5>Items required by foodbank:</h5>
                  <span>{foodbank.needs}</span>
                </>
              )}
            </span>
          </div>
        </Collapsible>
      </div>
    );
  });

  return <div className={styles.container}>{foodBanks}</div>;
};

export default ListFoodbanks;
