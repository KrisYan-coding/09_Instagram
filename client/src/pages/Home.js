import React, { useEffect, useState, useContext } from 'react'
// import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useNavLink } from '../helpers/NavLinkContext'
import PostCard from './components/PostCard'
import { useAuth } from '../helpers/AuthContext'

function Home() {
  const [postsList, setPostsList] = useState([])
  const [postImageMap, setPostImageMap] = useState({})
  const [likedList, setLikedList] = useState([])
  const [commentCountMap, setCommentCountMap] = useState({})
  const navigate = useNavigate()
  const { setNavLink } = useNavLink()
  const { authState, BASE_URL } = useAuth()

  useEffect(() => {
    if (!authState.state && localStorage.getItem('user') === null) {
      navigate('/login')
      return
    }

    getPostData()
    setNavLink('home')
  }, [])

  const getPostData = () => {
    const url = `${BASE_URL}/posts`
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
          setCommentCountMap(rData.commentCount)
        } else {
          navigate('/login')
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
            likedList={likedList}
            postImagesList={postImageMap[post.id]}
            commentCountMap={commentCountMap}
            postsList={postsList}
            setPostsList={setPostsList}
            setLikedList={setLikedList}
          />
        )
      })}
    </>
  )
}

export default Home
