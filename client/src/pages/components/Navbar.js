import React, { useContext } from 'react'
import { NavLinkContext } from '../../helpers/NavLinkContext'
import { json, Link } from 'react-router-dom'
import { Button } from '@mui/material'

import SidebarIcon from './SidebarIcon'

import styles from '../styleModules/Navbar.module.css'

import InstagramIcon from '@mui/icons-material/Instagram'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded'

function Navbar({ navLink }) {
  const { authState, setAuthState } = useContext(NavLinkContext)

  const logout = () => {
    localStorage.removeItem('user')
    setAuthState({ ...authState, state: false })
    window.location.reload()
  }

  return (
    <>
      <div className={styles.navbar + ' navbar'}>
        {/* <a href="/">Home_a</a> */}

        <div className={styles.sidebarItem + ' sidebarItem'}>
          <SidebarIcon
            navLink={navLink}
            navLinkto={'home'}
            linkto={'/'}
            activeIcon={<InstagramIcon></InstagramIcon>}
            normalIcon={<InstagramIcon></InstagramIcon>}
          ></SidebarIcon>
        </div>

        {!authState.state ? (
          <>
            <Link
              className={`navLink ${navLink === 'login' ? 'active' : ''}`}
              to="/login"
            >
              登入
            </Link>
            <Link
              className={`navLink ${
                navLink === 'registration' ? 'active' : ''
              }`}
              to="/registration"
            >
              註冊
            </Link>
          </>
        ) : (
          <>
            <div className={styles.sidebarItem + ' sidebarItem'}>
              <SidebarIcon
                navLink={navLink}
                navLinkto={'home'}
                linkto={'/'}
                activeIcon={<HomeRoundedIcon></HomeRoundedIcon>}
                normalIcon={<HomeOutlinedIcon></HomeOutlinedIcon>}
              ></SidebarIcon>
            </div>
            <div className={styles.sidebarItem + ' sidebarItem'}>
              <SidebarIcon
                navLink={navLink}
                navLinkto={'createpost'}
                linkto={'/createpost'}
                activeIcon={<AddBoxRoundedIcon></AddBoxRoundedIcon>}
                normalIcon={<AddBoxOutlinedIcon></AddBoxOutlinedIcon>}
              ></SidebarIcon>
            </div>
            <div className={styles.sidebarItem + ' sidebarItem'}>
              <Link to={`/profile/${authState.uid}`}>
                <div className={styles.imgBox + ' imgBox'}>
                  <img src={`/users/${authState.image}`} alt="profile-img" />
                </div>
              </Link>
            </div>
            <div
              className={styles.sidebarItem + ' sidebarItem mt-auto'}
              onClick={logout}
            >
              <TableRowsRoundedIcon></TableRowsRoundedIcon>
            </div>
          </>
        )}

        {/* = <a> */}
      </div>
    </>
  )
}

export default Navbar
