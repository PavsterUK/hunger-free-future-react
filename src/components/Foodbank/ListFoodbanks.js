import React, { useState } from "react";
import styles from "./ListFoodbanks.module.css";
import L from "leaflet";
import phonePic from "../../img/phone-504.svg";
import homepagePic from "../../img/homepage.svg";
import mailPic from "../../img/mail.svg";
import distancePic from "../../img/distance.svg";
import plusGreen from "../../img/plus-green.svg";

const ListFoodbanks = (props) => {
  const [moreInfoIsOpen, setMoreInfoIsOpen] = useState(false);

  // Distance between 2 point in miles, truncated to 2 decimals
  const distanceTo = (to_latitude, to_longitude) => {
    const from = L.latLng(props.location[0], props.location[1]);
    const to = L.latLng(to_latitude, to_longitude);
    const distance = from.distanceTo(to) / 1000 / 1.6;
    return distance.toFixed(2);
  };

  const toggleMoreInfo = () => {
    setMoreInfoIsOpen(!moreInfoIsOpen);
  };

  const foodBanks = props.items.map((foodbank, i) => {

    const moreInfo = (
      <>
        <div className={styles.moreInfoRevealed}>
          <h4>Any food Donations always welcomed.</h4>
          <span>
            {foodbank.needs != null && (
              <>
                <h5>Very handy if we can get some:</h5>
                <span>{foodbank.needs}</span>
              </>
            )}
          </span>
        </div>
      </>
    );

    return (
        <div className={styles.mainAndMoreInfoContaniner}>
          <div key={foodbank.slug + foodbank.id} className={styles.foodbank}>
            <div className={styles.locationIcon}>
              <h3>{i + 1}</h3>
            </div>
            <div className={styles.mainInfo}>
              <h3>{foodbank.name}</h3>
              <div className={styles.address}>{foodbank.address}</div>
              <div className={styles.contactDetails}>
                <a href={foodbank.homepage} className={styles.homepage}>
                  <img src={homepagePic} alt="" />
                  <div>Visit homepage</div>
                </a>

                <a href={`tel:${foodbank.phone}`} className={styles.phone}>
                  <img src={phonePic} alt="" />
                  <div>{foodbank.phone}</div>
                </a>
              </div>
              <a href={`mailto:${foodbank.email}`} className={styles.email}>
                <img src={mailPic} alt="" />
                <div>{foodbank.email}</div>
              </a>
              <div className={styles.distance}>
                <img src={distancePic} alt="" />
                Approx. {distanceTo(foodbank.latitude, foodbank.longitude)} miles from specified location
              </div>
            </div>
            <div className={styles.moreInfo} onClick={toggleMoreInfo}>
              More info
              <img src={plusGreen} alt="" />
            </div>
          </div>
          {moreInfoIsOpen && moreInfo}
        </div>
    );
  });

  return <div className={styles.container}>{foodBanks}</div>;
};

export default ListFoodbanks;
