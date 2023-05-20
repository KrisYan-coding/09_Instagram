import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import styles from './styleModules/Account.module.css'

import ChangePassword from './components/ChangePassword'
import EditProfile from './components/EditProfile'

function Account() {
  const { option } = useParams()
  let tab, renderTab
  switch (option) {
    case 'changePassword':
      tab = '變更密碼'
      renderTab = <ChangePassword />
      break
    case 'edit':
      tab = '編輯個人檔案'
      renderTab = <EditProfile />
      break
    case 'manage_access':
      tab = '應用程式和網站'
      break

    default:
      break
  }

  // const clickTab = (e) => {
  //   console.log(e.currentTarget.parentNode.childNodes)
  //   const liList = e.currentTarget.parentNode.childNodes
  //   const activeClass = new RegExp(
  //     '\\b' + 'Account_active' + '[^ ]*[ ]?\\b',
  //     'g'
  //   )
  //   for (let i = 0; i < liList.length; i++) {
  //     if (liList[i].className.match(activeClass)) {
  //       liList[i].className = liList[i].className.replace(activeClass, '')
  //       console.log(liList[i])
  //     }
  //   }
  //   e.currentTarget.classList.add(styles.active)
  // }

  return (
    <div className={styles.wrap + ' wrap'}>
      <div className={styles.top + ' top'}>
        <h1 className="text-h3 font-bold text-left text-black p-6">設定</h1>
      </div>
      <div className={styles.main + ' main'}>
        <div className={styles.menu + ' menu text-h55'}>
          <ul>
            <li className={option === 'changePassword' ? styles.active : ''}>
              <a href="/account/changePassword/">變更密碼</a>
            </li>
            <li className={option === 'edit' ? styles.active : ''}>
              <a href="/account/edit/">編輯個人檔案</a>
            </li>
            <li className={option === 'manage_access' ? styles.active : ''}>
              <a href="/account/manage_access/">應用程式和網站</a>
            </li>
            <li>
              <a href="/account/a/">電子郵件通知</a>
            </li>
            <li>
              <a href="/account/b/">推播通知</a>
            </li>
            <li>
              <a href="/account/c/">你看到的內容</a>
            </li>
            <li>
              <a href="/account/d/">誰可以查看你的內容</a>
            </li>
            <li>
              <a href="/account/e/">其他人可如何和你互動</a>
            </li>
            <li>
              <a href="/account/f/">監護</a>
            </li>
            <li>
              <a href="/account/g/">使用說明</a>
            </li>
          </ul>
        </div>
        <div className={styles.content + ' content'}>
          <h2 className={styles.title + ' title text-h3'}>{tab}</h2>
          <div className={styles.renderTab + ' renderTab'}>{renderTab}</div>
        </div>
      </div>
    </div>
  )
}

export default Account
