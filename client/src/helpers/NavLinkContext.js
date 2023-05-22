import { createContext, useContext, useState } from 'react'

const NavLinkContext = createContext('')

export const NavLinkProvider = ({ children }) => {
  const [navLink, setNavLink] = useState('Home')

  return (
    <NavLinkContext.Provider value={{ navLink, setNavLink }}>
      {children}
    </NavLinkContext.Provider>
  )
}

export const useNavLink = () => {
  return useContext(NavLinkContext)
}
