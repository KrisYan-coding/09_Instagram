import React from 'react'
import { useContext } from 'react'
import { NavLinkContext } from '../../helpers/NavLinkContext'
import { useForm } from 'react-hook-form'

import styles from '../styleModules/ChangePassword.module.css'

function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const { BASE_URL } = useContext(NavLinkContext)

  const changePassword = (data) => {
    console.log(data)

    const url = `${BASE_URL}/auth/changepassword`
    fetch(url, {
      method: 'put',
      headers: {
        user: localStorage.getItem('user') || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
        alert(rData)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(changePassword)}>
        <div className={styles.formItem + ' formItem mb-2'}>
          <label>舊密碼</label>
          <input
            className={styles.input + ' input'}
            type="text"
            {...register('oldPassword', {
              required: true,
              minLength: 3,
            })}
            aria-invalid={errors.oldPassword ? 'true' : 'false'}
            // defaultValue="111"
          />
        </div>
        <div className={styles.formItem + ' formItem text-h6'}>
          <label></label>
          <div>
            {errors.oldPassword?.type === 'required'
              ? '舊密碼為必填'
              : errors.oldPassword?.type === 'minLength'
              ? '密碼需大於三碼'
              : ''}
            &nbsp;
          </div>
        </div>
        <div className={styles.formItem + ' formItem mb-2'}>
          <label>新密碼</label>
          <input
            className={styles.input + ' input'}
            type="text"
            {...register('newPassword', { required: true, minLength: 3 })}
            aria-invalid={errors.oldPassword ? 'true' : 'false'}
          />
        </div>
        <div className={styles.formItem + ' formItem text-h6'}>
          <label></label>
          <div>
            {errors.newPassword?.type === 'required'
              ? '新密碼為必填'
              : errors.newPassword?.type === 'minLength'
              ? '密碼需大於三碼'
              : ''}
            &nbsp;
          </div>
        </div>
        <div className={styles.formItem + ' formItem'}>
          <label></label>
          <button>提交</button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
