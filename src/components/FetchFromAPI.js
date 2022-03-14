import React from "react";

export async function fetchFromAPI(url) {
  const data = fetch(url)
  .then((response) => response.json())
  .then((fodbank) => {
    return fodbank;
  });
}
