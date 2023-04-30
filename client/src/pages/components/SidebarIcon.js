import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../styleModules/SidebarIcon.module.css'

function SidebarIcon({ navLink, linkto, navLinkto, activeIcon, normalIcon }) {
  return (
    <>
      <Link className={styles.link} to={linkto}>
        {navLink === navLinkto ? activeIcon : normalIcon}
      </Link>
    </>
  )
}

export default SidebarIcon
