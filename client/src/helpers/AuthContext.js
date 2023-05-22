import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    username: '',
    uid: '',
    state: '',
    image: '',
  })

  // const BASE_URL = 'https://practiceproject-instagram-server.onrender.com'
  const BASE_URL = 'http://localhost:3001'

  // --[validate session-user to prevent using fake token to login]
  const validateUserToken = () => {
    const url = `${BASE_URL}/auth/authToken`
    fetch(url, {
      headers: {
        user: localStorage.getItem('user') || '',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(url, data)
        if (data.success) {
          setAuthState({
            username: data.user.username,
            uid: data.user.uid,
            image: data.image,
            state: true,
          })
        }
      })
  }

  useEffect(() => {
    validateUserToken()
  }, [])

  return (
    <AuthContext.Provider
      value={{ authState, setAuthState, validateUserToken, BASE_URL }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
