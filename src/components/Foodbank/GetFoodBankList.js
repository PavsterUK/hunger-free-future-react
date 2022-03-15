import React, { useState } from "react";
import Foodbank from "./Foodbank";

export const getFoodBankList = () => {
  let data = [];

  async function fetchData() {
    const apiURL = "http://localhost:8080/v1/api/food-banks";

    try {
      const response = await fetch(apiURL);

      if (!response.ok) {
        throw Error(`error while loading from api ${apiURL}`);
      }
      data = await response.json();
    } catch (e) {}
  }

  let foodBankList = [];

  for (const key in data) {
    console.log(key);
    if (Object.hasOwnProperty(key)) {
      foodBankList.push(
        <Foodbank
          id={key.slug}
          name={key.name}
          country={key.country}
          email={key.email}
          phone={key.prone}
          latLng={key.lat_lng}
          address={key.address}
          needs={key.needs}
        />
      );
    }
  }
  return foodBankList;
};
