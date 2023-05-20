import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
// import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { NavLinkContext } from './helpers/NavLinkContext'

import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import Login from './pages/Login'
import Registration from './pages/Registration'
import PageNotFound from './pages/PageNotFound'
import Profile from './pages/Profile'
import Navbar from './pages/components/Navbar'
import Account from './pages/Account'
import TryFormik from './pages/TryFormik'

import theme from './style/themeMui'
import { ThemeProvider } from '@mui/material'

function App() {
  const [navLink, setNavLink] = useState('Home')
  const [authState, setAuthState] = useState({
    username: '',
    uid: '',
    state: '',
    image: '',
  })
  // const BASE_URL = 'https://practiceproject-instagram-server.onrender.com'
  const BASE_URL = 'http://localhost:3001'

  useEffect(() => {
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
  }, [])
  // validate session-user to prevent using fake token to login

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavLinkContext.Provider
          value={{ setNavLink, authState, setAuthState, BASE_URL }}
        >
          <Router>
            <Navbar className="navbar" navLink={navLink}></Navbar>
            <main>
              <Routes>
                {/* insides <Routes> find the first <Route> that fit the url */}
                <Route path="/" element={<Home></Home>}></Route>
                <Route
                  path="/createpost"
                  element={<CreatePost></CreatePost>}
                ></Route>
                <Route path="/post/:pid" element={<Post></Post>}></Route>
                {/* 需要參數才進得來 */}
                <Route path="/login" element={<Login></Login>}></Route>
                <Route
                  path="/registration"
                  element={<Registration></Registration>}
                ></Route>
                <Route
                  path="/account/:option?"
                  element={<Account></Account>}
                ></Route>
                <Route
                  path="/profile/:uid"
                  element={<Profile></Profile>}
                ></Route>
                <Route
                  path="/tryFormik"
                  element={<TryFormik></TryFormik>}
                ></Route>
                <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
              </Routes>
            </main>
          </Router>
        </NavLinkContext.Provider>
      </div>
    </ThemeProvider>
  )
}
// "homepage": "https://krisYan-coding.github.io/practice-project-instagram-client/",

export default App
