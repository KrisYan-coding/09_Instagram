import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
// import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './helpers/AuthContext'
import { NavLinkProvider } from './helpers/NavLinkContext'

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
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavLinkProvider>
          <AuthProvider>
            <Router>
              <Navbar className="navbar"></Navbar>
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
                  <Route
                    path="*"
                    element={<PageNotFound></PageNotFound>}
                  ></Route>
                </Routes>
              </main>
            </Router>
          </AuthProvider>
        </NavLinkProvider>
      </div>
    </ThemeProvider>
  )
}
// "homepage": "https://krisYan-coding.github.io/practice-project-instagram-client/",

export default App
