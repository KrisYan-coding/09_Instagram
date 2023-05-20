import React, { useContext } from 'react'
import { NavLinkContext } from '../../helpers/NavLinkContext'
import { json, Link } from 'react-router-dom'
import { Button } from '@mui/material'

import SidebarIcon from './SidebarIcon'

import styles from '../styleModules/Navbar.module.css'

import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded'
import {
  HomeInsta,
  HomeHome,
  HomeHomeActive,
  HomeCreat,
  HomeCreatActive,
} from '../Icons/NavIcons'

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

        <div className={styles.sidebarItem + ' sidebarItem mb-12'}>
          <SidebarIcon
            navLink={navLink}
            navLinkto={'home'}
            linkto={'/'}
            activeIcon={<HomeInsta></HomeInsta>}
            normalIcon={<HomeInsta></HomeInsta>}
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
                activeIcon={<HomeHomeActive></HomeHomeActive>}
                normalIcon={<HomeHome></HomeHome>}
              ></SidebarIcon>
            </div>
            <div className={styles.sidebarItem + ' sidebarItem'}>
              <SidebarIcon
                navLink={navLink}
                navLinkto={'createpost'}
                linkto={'/createpost'}
                activeIcon={<HomeCreatActive></HomeCreatActive>}
                normalIcon={<HomeCreat></HomeCreat>}
              ></SidebarIcon>
            </div>
            <div className={styles.sidebarItem + ' sidebarItem'}>
              <Link to={`/profile/${authState.uid}`}>
                <div
                  className={
                    styles.imgBox +
                    ' ' +
                    (navLink === 'profile' ? styles.imgBoxBorder : '') +
                    ' imgBox '
                  }
                >
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
