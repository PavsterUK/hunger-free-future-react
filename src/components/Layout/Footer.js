import React from 'react'

import styles from "./Footer.module.css"
import hungFreeFutureLogo from "../../img/hungerFree.webp"

const Footer = () => {
  return (
    <div className={styles.container}>
        <img src={hungFreeFutureLogo}/>
    </div>
  )
}

export default Footer