import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavLink } from '../helpers/NavLinkContext'
import { useAuth } from '../helpers/AuthContext'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import styles from './styleModules/Profile.module.css'

import FormDialog from './components/FormDialog'
import AlertDialog from './components/AlertDialog'
import PostMenu from './components/PostMenu'
import PostCard from './components/PostCard'
import {
  ProfileSetting,
  ProfileCollect,
  ProfileCite,
  ProfilePost,
} from './Icons/ProfileIcons'

function Profile() {
  const { uid } = useParams()
  const [CurrentUserInfo, setCurrentUserInfo] = useState({
    user_id: '',
    username: '',
    image: '',
    user_intro: '大家好',
  })
  const [likedList, setLikedList] = useState([])
  const [listOfPosts, setListOfPosts] = useState([])
  const { setNavLink } = useNavLink()
  const { authState, BASE_URL } = useAuth()
  const [postImageMap, setPostImageMap] = useState({})

  const [openEdit, setOpenEdit] = useState(false)
  const [editedPostID, setEditedPostID] = useState(0)

  const [openAlert, setOpenAlert] = useState(false)
  const navigate = useNavigate()

  const getProfilePostList = () => {
    const url2 = `${BASE_URL}/posts/byUserId/${uid}`
    fetch(url2)
      .then((r) => r.json())
      .then((rData) => {
        console.log(url2, rData)
        setListOfPosts(rData.posts)
        setPostImageMap(rData.postImages)
      })
  }

  useEffect(() => {
    setNavLink('profile')
  })

  useEffect(() => {
    const url = `${BASE_URL}/auth/basicInfo/${uid}`
    fetch(url)
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
        setCurrentUserInfo(rData[0])
      })

    getProfilePostList()
  }, [uid, openEdit, openAlert])

  useEffect(() => {
    if (authState.uid) {
      const url3 = `${BASE_URL}/likes/checkLikeList/${authState.uid}`
      fetch(url3)
        .then((r) => r.json())
        .then((rData) => {
          console.log(url3, rData)
          setLikedList(rData)
        })
    }
  }, [authState])

  const likeAPost = (e, pid) => {
    e.stopPropagation()
    console.log('like', pid)

    if (!authState.state) {
      return alert('Not Login')
    }

    const url = `${BASE_URL}/likes/${pid}`
    fetch(url, {
      method: 'post',
      headers: {
        user: localStorage.getItem('user') || '',
      },
    })
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
        if (!rData.success) {
          alert('please re-login')
        } else {
          if (!rData.liked) {
            setLikedList(
              likedList.filter((el) => {
                return el !== pid
              })
            )
          } else {
            setLikedList([...likedList, pid])
          }
          setListOfPosts(
            listOfPosts.map((el) => {
              if (el.id === pid) {
                if (rData.liked) {
                  el.count_likes += 1
                } else {
                  el.count_likes -= 1
                }
              }

              return el
            })
          )
        }
      })
  }

  return (
    <div className={styles.wrap + ' wrap'}>
      <div className={styles.profile + ' profile'}>
        <div className={styles.user + ' user'}>
          <div className={styles.userImg + ' userImg'}>
            <div className={styles.imgBox + ' imgBox'}>
              <img
                src={
                  CurrentUserInfo.image.length
                    ? `/users/${CurrentUserInfo.image}`
                    : '/users/user.png'
                }
                alt="userImage"
              />
            </div>
          </div>
          <div className={styles.userInfo + ' userInfo'}>
            <div className={styles.userNameSetting + ' userNameSetting'}>
              <div className={styles.username + ' username text-h4'}>
                {CurrentUserInfo.username}
              </div>
              <button
                className={styles.editBtn + ' userInfo text-h6 font-bold'}
              >
                <Link to="/account/edit/">編輯個人檔案</Link>
              </button>
              <div className={styles.settingBtn + ' settingBtn'}>
                <Link to={`/account/changePassword/`}>
                  <ProfileSetting />
                </Link>
              </div>
            </div>
            <div className={styles.dashbord + ' dashbord'}>
              <div className={styles.numOfPosts + ' numOfPosts'}>{9}</div>
              <span>貼文</span>
              <div className={styles.numOfFans + ' numOfFans'}>{123}</div>
              <span>位粉絲</span>
              <div className={styles.numOfFollowings + ' numOfFollowings'}>
                {292}
              </div>
              <span>追蹤中</span>
            </div>
            <div className={styles.into + ' into text-h6 text-start'}>
              {CurrentUserInfo.user_intro}
            </div>
          </div>
        </div>
        <div className={styles.tabs + ' tabs'}>
          <div className={styles.tab + ' tab'}>
            <ProfilePost />
            <span className="text-h7">貼文</span>
          </div>
          <div className={styles.tab + ' tab'}>
            <ProfileCollect />
            <span className="text-h7">我的珍藏</span>
          </div>
          <div className={styles.tab + ' tab'}>
            <ProfileCite />
            <span className="text-h7">已標註</span>
          </div>
        </div>
        <div className={styles.listOfPosts + ' listOfPosts'}>
          {listOfPosts.map((post) => {
            return (
              <div className={styles.postBlock + ' postBlock'} key={post.id}>
                <div className={styles.imgBox + ' imgBox'}>
                  <img
                    src={'/postImages/' + postImageMap[post.id][0]}
                    alt="postImage-first"
                  />
                </div>
                <div className={styles.bgHover + ' bgHover'}>
                  <div className="postlikes font-bold mr-4">
                    <i className="fa-solid fa-heart mr-2"></i>
                    {post.count_likes}
                  </div>
                  <div className="postcomments font-bold">
                    <i
                      className="fa-solid fa-comment mr-2"
                      style={{ transform: 'scale(-1, 1)' }}
                    ></i>
                    {post.count_likes}
                  </div>
                </div>
              </div>
            )
          })}
          {/* {listOfPosts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <div className="title">
                <div className="info">
                  {post.id}
                  {post.title}
                </div>
                {+authState.uid === +uid ? (
                  <div
                    className="edit-btn"
                    style={{
                      width: '10%',
                      aspectRatio: '1/1',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <PostMenu
                      postID={post.id}
                      setOpenEdit={setOpenEdit}
                      setEditedPostID={setEditedPostID}
                      openAlert={openAlert}
                      setOpenAlert={setOpenAlert}
                    ></PostMenu>
                  </div>
                ) : (
                  false
                )}
              </div>
              <div
                className="body"
                style={{ whiteSpace: 'pre-line' }}
                onClick={() => {
                  navigate(`/post/${post.id}`)
                }}
              >
                {post.postText}
              </div>
              <div className="footer">
                <div className="username">
                  {post.user_id}
                  {post.new_username}
                </div>
                <div
                  className="btn-like"
                  onClick={(e) => {
                    likeAPost(e, post.id)
                  }}
                >
                  {likedList.includes(post.id) ? (
                    <ThumbUpAltIcon></ThumbUpAltIcon>
                  ) : (
                    <ThumbUpOffAltIcon></ThumbUpOffAltIcon>
                  )}
                </div>
                <div className="count-likes">{post.count_likes}</div>
              </div>
            </div>
          )
        })} */}
        </div>
        <FormDialog
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          editedPostID={editedPostID}
        ></FormDialog>
        <AlertDialog
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          editedPostID={editedPostID}
        ></AlertDialog>
      </div>
    </div>
  )
}

export default Profile
