import styles from "./ListFoodbanks.module.css";
import L from "leaflet";
import Collapsible from "react-collapsible";
import "./ListFoodbanksCollapsible.css";

import phonePic from "../../img/phone-504.svg";
import homepagePic from "../../img/homepage.svg";
import mailPic from "../../img/mail.svg";
import distancePic from "../../img/distance.svg";
import plusGreen from "../../img/plus-green.svg";
import gearsPic from "../../img/gears.svg";

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
        <h6>Show more</h6> 
        <img src={plusGreen} alt="" />
      </div>
    );
  };

  let results = props.items.map((foodbank, i) => {
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
                <h6>
                  This branch is part of {foodbank.part_of} Foodbank/Charity.
                </h6>
              )}
            </div>

            <a href={foodbank.homepage} className={styles.homepage}>
              <img src={homepagePic} alt="" />
              <h6>Visit homepage</h6>
            </a>

            <a href={`tel:${foodbank.phone}`} className={styles.phone}>
              <img src={phonePic} alt="" />
              <h6>{foodbank.phone}</h6>
            </a>

            <a href={`mailto:${foodbank.email}`} className={styles.email}>
              <img src={mailPic} alt="" />
              <h6>{foodbank.email}</h6>
            </a>

            {props.location.length > 0 && (
              <div className={styles.distance}>
                <img src={distancePic} alt="" />
                <h6>
                  Approx. {distanceTo(foodbank.latitude, foodbank.longitude)}{" "}
                  miles away
                </h6>
              </div>
            )}
          </div>
        </div>
        <Collapsible className={styles.collapsible} trigger={<MoreInfo />}>
          <div className={styles.moreInfoRevealed}>
            <h4>
              Please donate food. Contact this branch directly for more
              information.
            </h4>
            <span>
              {foodbank.needs != null && (
                <>
                  <h4>Currently required items:</h4>
                  <span>{foodbank.needs}</span>
                </>
              )}
            </span>
          </div>
        </Collapsible>
      </div>
    );
  });

  if (props.items.length === 0) {
    results = (
      <div className={styles.tooManyResultsMessage}>
        <img src={gearsPic} alt="" />

        {props.mapZoomLevel < 13 && (
          <>
            <h3>UH OH... looks like you zoomed out too far.</h3>
            <h4>Try to zoom in to narrow down area.</h4>
          </>
        )}
        {props.mapZoomLevel >= 13 && (
          <>
            <h3>UH OH... no results found.</h3>
            <h4>Try to look in another location.</h4>
          </>
        )}
      </div>
    );
  }

  return <div className={styles.container}>{results}</div>;
};

export default ListFoodbanks;
