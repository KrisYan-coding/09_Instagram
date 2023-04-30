import React, { useEffect, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { NavLinkContext } from '../helpers/NavLinkContext'

function Registration() {
  const { setNavLink } = useContext(NavLinkContext)

  useEffect(() => {
    setNavLink('registration')
  })

  const initialValues = {
    username: '',
    password: '111',
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Too Short!')
      .max(15, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      // .matches(/^(?=.*[a-z])/, 'Must Contain One Lowercase')
      // .matches(/^(?=.*[A-Z])/, 'Must Contain One Uppercase')
      // .matches(
      //   /^(?=.*[!@#\$%\^&\*])/,
      //   'Must Contain One Special Case Character'
      // )
      .matches(/^(?=.{3,})/, 'Must Contain 8 Characters')
      .required('Required'),
  })

  const handleSubmit = (values) => {
    // console.log(values)

    fetch('http://localhost:3001/auth/', {
      method: 'post',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
      })
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // onSubmit={(values) => {
        //   console.log(values)
        // }}
        onSubmit={handleSubmit}
      >
        <Form className="postForm">
          <label htmlFor="username">帳號</label>
          <Field name="username" id="username" placeholder={'e.g.: Kris'} />
          <ErrorMessage component={'div'} className="errMsg" name="username" />
          <label htmlFor="password">密碼</label>
          <Field name="password" type="password" />
          <ErrorMessage component={'div'} className="errMsg" name="password" />
          <button type="submit">註冊</button>
        </Form>
      </Formik>
    </>
  )
}

export default Registration
