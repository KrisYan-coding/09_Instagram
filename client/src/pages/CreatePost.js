import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { NavLinkContext } from '../helpers/NavLinkContext'

function CreatePost() {
  const { setNavLink, authState, BASE_URL } = useContext(NavLinkContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!authState.state && localStorage.getItem('user') === null) {
      // authState.state default ''
      navigate('/login')
      return
    }
    setNavLink('createpost')
  }, [])

  const initialValues = {
    title: 'Harry Potter',
    postText: 'Good!',
    username: authState.username || '',
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('標題不可空白'),
    postText: Yup.string().required(),
  })

  const handleSubmit = (data) => {
    console.log(data)
    // json 格式送出
    axios
      .post(`${BASE_URL}/posts`, data, {
        headers: {
          user: localStorage.getItem('user') || '',
        },
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          navigate('/')
        } else {
          alert(`Please re-login ${res.data.error}`)
        }
      })
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="postForm">
          <label htmlFor="inputTitle">Title: </label>
          <ErrorMessage
            name="title"
            component="p"
            className="errMsg"
          ></ErrorMessage>
          <Field
            id="inputTitle"
            name="title"
            placeholder="(Ex. 減重十招...)"
          ></Field>
          <label htmlFor="inputPost">Post: </label>
          <ErrorMessage
            name="postText"
            component="p"
            className="errMsg"
          ></ErrorMessage>
          <Field
            id="inputPost"
            name="postText"
            placeholder="(Ex. 第一招...)"
          ></Field>
          <button className="submitButton" type="submit">
            Create Post
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost
