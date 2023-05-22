import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from '../styleModules/PostCard.module.css'
import 'animate.css'
import { useAuth } from '../../helpers/AuthContext'

import {
  HeartOtline,
  HeartFilled,
  CommentOtline,
  ShareOtline,
  BookmarkOtline,
  MoreOtline,
  Emoji,
} from '../Icons/PostCardIcons'

function PostCard({
  post,
  postsList,
  setPostsList,
  setLikedList,
  likedList,
  postImagesList,
  commentCountMap,
}) {
  const navigate = useNavigate()
  const { authState, BASE_URL } = useAuth()

  const gotoProfile = (e, userId) => {
    e.stopPropagation()
    navigate(`/profile/${userId}`)
  }

  const likeAPost = (e, pid) => {
    e.stopPropagation()
    // console.log('like', pid)

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
          if (likedList.includes(pid)) {
            setLikedList(
              likedList.filter((el) => {
                return el !== pid
              })
            )
          } else {
            setLikedList([...likedList, pid])
          }
          setPostsList(
            postsList.map((el) => {
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
    <div className={styles.post + ' post'} key={post.id}>
      <div className={styles.header + ' header text-myblack pe-0'}>
        <div className={styles.imgBox + ' imgBox'}>
          <img
            src={post.image ? `/users/${post.image}` : '/users/user.png'}
            alt="profile_image"
          />
        </div>
        <div
          className={styles.username + ' username text-h6 font-bold ml-3'}
          onClick={(e) => {
            gotoProfile(e, post.user_id)
          }}
        >
          {post.new_username}_{post.user_id}
        </div>
        <div className="menu ml-auto">
          <MoreOtline></MoreOtline>
        </div>
      </div>
      <div className={styles.body + ' body'}>
        <div className={styles.postImage + ' postImage'}>
          <div className={styles.imgBox + ' imgBox'}>
            <img src={`./postImages/${postImagesList[0]}`} alt="postImage" />
          </div>
        </div>
      </div>
      <div className={styles.footer + ' footer'}>
        <div className={styles.funcs + ' funcs'}>
          <div
            className={styles.icon + ' icon fav-icon ps-0'}
            onClick={(e) => {
              likeAPost(e, post.id)
            }}
            onMouseEnter={(e) => {
              const heartOutline =
                e.currentTarget.querySelector('svg.heartOutline')
              if (heartOutline) {
                heartOutline.setAttribute('fill', '#888')
              }

              e.currentTarget.classList.remove(
                'animate__animated',
                'animate__heartBeat'
              )
            }}
            onMouseLeave={(e) => {
              const heartOutline =
                e.currentTarget.querySelector('svg.heartOutline')
              if (heartOutline) {
                heartOutline.setAttribute('fill', '#383838')
                e.currentTarget.style.setProperty('--animate-duration', '1s')

                e.currentTarget.classList.add(
                  'animate__animated',
                  'animate__heartBeat'
                )
              }
            }}
          >
            {likedList.includes(post.id) ? (
              <HeartFilled />
            ) : (
              <HeartOtline className="outlineHeart" />
            )}
          </div>
          <div className={styles.icon + ' icon comment-icon'}>
            <CommentOtline />
          </div>
          <div className={styles.icon + ' icon send-icon'}>
            <ShareOtline></ShareOtline>
          </div>
          <div className={styles.icon + ' icon save-icon ml-auto pe-0'}>
            <BookmarkOtline></BookmarkOtline>
          </div>
        </div>
        <div className={styles.postText + ' postText text-h55'}>
          <span className="font-bold mr-1">
            {post.new_username}_{post.user_id}
          </span>
          {post.postText}
        </div>
        <div className={styles.commentSection + ' commentSection'}>
          <div
            className={
              styles.commentLink + ' commentLink text-h55 cursor-pointer'
            }
          >
            查看全部{commentCountMap[post.id] || 0}則留言
          </div>
          <form className={styles.formComment + '  text-h55'}>
            <textarea
              name="comment"
              rows={1}
              placeholder={'留言······'}
              onChange={(e) => {
                e.currentTarget.style.height = ''
                e.currentTarget.style.height =
                  e.currentTarget.scrollHeight + 'px'
              }}
              style={{
                maxHeight: '80px',
                resize: 'none',
                lineHeight: '18px',
              }}
            ></textarea>
            <div className={styles.emoji + ' emoji'}>
              <Emoji />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostCard
