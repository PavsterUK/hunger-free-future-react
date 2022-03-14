import React from 'react'
import { getFoodBankList } from '../Foodbank/GetFoodBankList'

import styles from "../Search/FoodBankSearch.module.css"
import SearchBar from './SearchBar'
import SearchResults from "./SearchResults.js"


const FoodBankSearch = () => {

  const foodBankList = getFoodBankList();

  

  return (
    <div className={styles.container}>
        <SearchBar/>
        <SearchResults list={foodBankList}/>
    </div>
  )
}

export default FoodBankSearch