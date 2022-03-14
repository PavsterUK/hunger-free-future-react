import React from "react";
import Foodbank from "./Foodbank";

import { fetchFromAPI } from '../FetchFromAPI';

export const getFoodBankList = () => {
  const foodBanksJSON = fetchFromAPI("http://localhost:8080/v1/api/food-banks");

  console.log(foodBanksJSON);

  let foodBankList = [];

  for (const key in foodBanksJSON) {
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
