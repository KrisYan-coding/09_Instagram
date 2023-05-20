import React, { useEffect, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { NavLinkContext } from '../helpers/NavLinkContext'

function Login() {
  const navigate = useNavigate()
  const { setNavLink } = useContext(NavLinkContext)
  const { setAuthState, BASE_URL } = useContext(NavLinkContext)

  const initialValues = {
    username: 'Kris',
    password: '222',
  }

  useEffect(() => {
    setNavLink('login')
  }, [])

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'too short')
      .max(5, 'too long')
      .required('帳號為必填'),
    password: Yup.string().required('密碼為必填'),
  })

  const handleSubmit = (values) => {
    const url = `${BASE_URL}/auth/login`
    fetch(url, {
      method: 'post',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(url, data)
        if (data.success) {
          localStorage.setItem('user', data.token)
          setAuthState({
            username: data.user.username,
            uid: data.user.uid,
            state: true,
            image: data.user.image,
          })
          navigate('/')
        } else {
          alert(data.error)
        }
      })
  }

  // ****session****////
  /*
  const trySession = () => {
    fetch('http://localhost:3001/try-sess', {
      credentials: 'include',
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
      })
  }

  const setSession = () => {
    fetch('http://localhost:3001/set-sess', {
      credentials: 'include',
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
      })
  }

  NOTE: fetch 預設不會送 cookie(req 不會包含 cookie)，所以 api req.session 不會有 cookie
  // 解法:
  // 1. fetch 時設定 credentials: 'include'
  // 2. server index.js 設定 corsOptions
  */

  return (
    <>
      <div>{BASE_URL}</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="postForm">
          <label htmlFor="username">帳號</label>
          <Field name="username" id="username"></Field>
          <ErrorMessage
            className="errMsg"
            component={'div'}
            name="username"
          ></ErrorMessage>
          <label htmlFor="password">密碼</label>
          <Field name="password" id="password" type="text"></Field>
          <ErrorMessage
            className="errMsg"
            component={'div'}
            name="password"
          ></ErrorMessage>
          <button type="submit">登入</button>
        </Form>
      </Formik>
    </>
  )
}

export default Login
