import React, { useState } from "react";

import styles from "./TownSearchBox.module.css";

const AddressSearchBox = (props) => {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const findSuggestions = async (userInput) => {
    if (userInput.length > 0) {
      const townsResp = await fetch(
        "https://hunger-free-future.herokuapp.com/v1/api/find-town/".concat(userInput)
      );
      const townsJson = await townsResp.json();
      setSuggestions(townsJson);
    } else {
      setSuggestions([]);
    }
  };

  const onUserInputChange = (event) => {
    const userInput = event.target.value;
    setUserInput(userInput);
    findSuggestions(userInput);
  };

  const suggestionList = (
    <ul>
      {suggestions.map((suggestion) => {
        return (
          <li
            onMouseDown={() =>
              props.flyToCoord(
                [suggestion.latitude, suggestion.longitude],
                setSuggestions([])
              )
            }
            className={styles.suggestion}
            key={suggestion.id}
          >
            {suggestion.name}, {suggestion.county}, {suggestion.postcode_area},{" "}
            {suggestion.country}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={styles.container}>
      <input
        value={userInput}
        className={styles.input}
        placeholder="Please enter town name"
        type="search"
        onChange={onUserInputChange}
        onBlur={() => setSuggestions([])}
      ></input>
      <div className={styles.suggestions}>{suggestionList}</div>
    </div>
  );
};

export default AddressSearchBox;
