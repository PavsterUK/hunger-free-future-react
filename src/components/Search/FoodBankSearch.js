import React from 'react'

import styles from "../Search/FoodBankSearch.module.css"
import SearchBar from './SearchBar'
import SearchResults from "./SearchResults.js"


const FoodBankSearch = () => {
  return (
    <div className={styles.container}>
        <SearchBar/>
        <SearchResults/>
    </div>
  )
}

export default FoodBankSearch