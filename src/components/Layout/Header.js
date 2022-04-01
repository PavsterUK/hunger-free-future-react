import React from 'react'
import Navbar from './Navbar'

import styles from "./Header.module.css"


const Header = () => {
  return (
    <div className={styles.container}>
        <div className={styles.logo}>
            <h1>UK Foodbanks</h1>
        </div>
        <Navbar/>
    </div>
  )
}

export default Header