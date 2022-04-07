import React, { useState } from "react";

import styles from "./TownSearchBox.module.css";

const AddressSearchBox = (props) => {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const findSuggestions = async (userInput) => {
    if (userInput.length > 0) {
      const townsResp = await fetch(
        "http://localhost:8080/v1/api/find-town/".concat(userInput)
      );
      const townsJson = await townsResp.json();
      setSuggestions(townsJson);
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
            onClick={() => props.flyToCoord([suggestion.latitude, suggestion.longitude], setSuggestions([]))}
            onBlur={() => setSuggestions([]) }
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
        placeholder="Please enter you town name"
        type="search"
        onChange={onUserInputChange}
        
      ></input>
      <div className={styles.suggestions}>{suggestionList}</div>
    </div>
  );
};

export default AddressSearchBox;
