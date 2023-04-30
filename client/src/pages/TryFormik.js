import React from 'react'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'

const styleInfo = {
  color: 'red',
}

// const emailRule =
//   /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/

// const validate = (values) => {
//   console.log('validate function')
//   const errors = {}

//   if (!values.name) {
//     errors.name = 'Name must not be empty.'
//   } else if (values.name.length > 15) {
//     errors.name = 'Must be 15 characters or less.'
//   }

//   if (!values.email) {
//     errors.email = 'Email must not be empty.'
//   } else if (!emailRule.test(values.email)) {
//     errors.email = 'Please enter a valid email.'
//   }

//   return errors
// }

// function TryFormik() {
//   const formik = useFormik({
//     initialValues: {
//       name: 'kriscccccccccccxxxxxx',
//       email: '123@gmail',
//     },
//     onSubmit: (values) => {
//       console.log(values)
//     },
//     validationSchema: Yup.object({
//       name: Yup.string()
//         .max(15, 'Must be 15 characters or less.')
//         .required('Name must not be empty.'),
//       email: Yup.string()
//         .email('Please enter a valid email.')
//         .required('Email must not be empty.'),
//     }),
//   })

//   const showNameError = formik.touched.name && formik.errors.name
//   const showEmailError = formik.touched.email && formik.errors.email
//   // formik.touched.field : field 是否已發生 blur 事件

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         {/* submit 後執行 formik.onSubmit*/}
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           onChange={formik.handleChange}
//           // onBlur={formik.handleBlur}
//           // onChange, onBlur 都會執行 validate function
//           value={formik.values.name}
//           // = 使用 useSatate
//           className={showNameError ? 'invalid' : ''}
//         />

//         {showNameError ? (
//           <p className="error-text">{formik.errors.name}</p>
//         ) : null}
//         <br />
//         <label htmlFor="email">E-mail:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.email}
//         />
//         {showEmailError ? (
//           <p className="error-text">{formik.errors.email}</p>
//         ) : null}
//         <br />
//         <div style={styleInfo} className="info">
//           {showNameError}
//           {showEmailError}
//         </div>
//         <br />
//         <div style={styleInfo} className="info">
//           {formik.touched.name ? 'true' : 'fasle'}
//           {formik.touched.email ? 'true' : 'fasle'}
//         </div>
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   )
// }

const TryFormik = () => {
  return (
    <Formik
      initialValues={{ name: '', email: '' }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, 'Must be 15 characters or less.')
          .required('Name must not be empty.'),
        email: Yup.string()
          .email('Please enter a valid email.')
          .required('Email must not be empty.'),
      })}
      onSubmit={(values, { resetForm }) => {
        console.log(values)
        resetForm()
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            {...formik.getFieldProps('name')}
            className={
              formik.touched.name && formik.errors.name ? 'invalid' : ''
            }
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="error-text">{formik.errors.name}</p>
          ) : null}
          <label htmlFor="email">Your E-Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            {...formik.getFieldProps('email')}
            className={
              formik.touched.email && formik.errors.email ? 'invalid' : ''
            }
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="error-text">{formik.errors.email}</p>
          ) : null}
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  )
}

export default TryFormik
