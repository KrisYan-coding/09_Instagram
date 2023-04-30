import React, { useEffect, useState, useContext } from 'react'
// import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { NavLinkContext } from '../helpers/NavLinkContext'
import PostCard from './components/PostCard'

function Home() {
  const [postsList, setPostsList] = useState([])
  const [postImageMap, setPostImageMap] = useState({})
  const [likedList, setLikedList] = useState([])
  const navigate = useNavigate()
  const { setNavLink, authState } = useContext(NavLinkContext)

  useEffect(() => {
    if (!authState.state && localStorage.getItem('user') === null) {
      navigate('/login')
      return
    }

    getPostData()
    setNavLink('home')
  }, [])

  const getPostData = () => {
    const url = 'http://localhost:3001/posts'
    fetch(url, {
      method: 'get',
      headers: {
        user: localStorage.getItem('user') || '',
      },
    })
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
        if (rData.success) {
          setPostsList(rData.posts)
          setLikedList(rData.likedList)
          setPostImageMap(rData.postImages)
        } else {
          navigate('/login')
        }
      })
  }

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
    <>
      {postsList.map((post) => {
        return (
          <PostCard
            key={post.id}
            post={post}
            likeAPost={likeAPost}
            likedList={likedList}
            postImagesList={postImageMap[post.id]}
          />
        )
      })}
    </>
  )
}

export default Home
