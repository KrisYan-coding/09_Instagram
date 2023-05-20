import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from '../styleModules/PostCard.module.css'

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

import {
  HeartOtline,
  CommentOtline,
  ShareOtline,
  BookmarkOtline,
  MoreOtline,
} from '../Icons/PostCardIcons'

function PostCard({ post, likeAPost, likedList, postImagesList }) {
  const navigate = useNavigate()

  const gotoProfile = (e, userId) => {
    e.stopPropagation()
    navigate(`/profile/${userId}`)
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
          <div className="fav-icon ps-0">
            <HeartOtline />
          </div>
          <div className="comment-icon">
            <CommentOtline />
          </div>
          <div className="send-icon">
            <ShareOtline></ShareOtline>
          </div>
          <div className="save icon ml-auto pe-0">
            <BookmarkOtline></BookmarkOtline>
          </div>
        </div>
        <div className={styles.postText + ' postText text-h55'}>
          <span className="font-bold mr-1">
            {post.new_username}_{post.user_id}
          </span>
          {post.postText}
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
}

export default PostCard
