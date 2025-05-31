import React from 'react'
import styles from './Nav.module.css'
import { NavLink } from 'react-router-dom'

function Nav(props) {
  return (
    <div className={styles.center}>
        <nav className={styles.navBar}>
            <p className={styles.logo}>{props.name}</p>
            <ul className={styles.links}>
                <li> <NavLink to="/" className={({isActive})=>isActive? styles.active:""}>Home</NavLink> </li>
                <li> <NavLink to="/about" className={({isActive})=>isActive? styles.active:""}>About</NavLink> </li>
                <li> <NavLink to="/contact" className={({isActive})=>isActive? styles.active:""}>Contact</NavLink> </li>
            </ul>
        </nav>
    </div>
  )
}

export default Nav