import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { NavLinkContext } from '../helpers/NavLinkContext'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { useNavigate } from 'react-router-dom'

import FormDialog from './components/FormDialog'
import AlertDialog from './components/AlertDialog'
import PostMenu from './components/PostMenu'

function Profile() {
  const { uid } = useParams()
  const [username, setUsername] = useState('')
  const [likedList, setLikedList] = useState([])
  const [listOfPosts, setListOfPosts] = useState([])
  const { authState, setNavLink } = useContext(NavLinkContext)

  const [openEdit, setOpenEdit] = useState(false)
  const [editedPostID, setEditedPostID] = useState(0)

  const [openAlert, setOpenAlert] = useState(false)
  const navigate = useNavigate()

  const getProfilePostList = () => {
    const url2 = `http://localhost:3001/posts/byUserId/${uid}`
    fetch(url2)
      .then((r) => r.json())
      .then((rData) => {
        console.log(url2, rData)
        setListOfPosts(rData)
      })
  }

  useEffect(() => {
    setNavLink('profile')
  })

  useEffect(() => {
    const url = `http://localhost:3001/auth/basicInfo/${uid}`
    fetch(url)
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
        setUsername(rData[0].username)
      })

    getProfilePostList()
  }, [uid, openEdit, openAlert])

  useEffect(() => {
    if (authState.uid) {
      const url3 = `http://localhost:3001/likes/checkLikeList/${authState.uid}`
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

    const url = `http://localhost:3001/likes/${pid}`
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
    <div>
      <div className="basicInfo">
        <h2>{username} 的個人頁面</h2>
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((post) => {
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
        })}
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
  )
}

export default Profile
