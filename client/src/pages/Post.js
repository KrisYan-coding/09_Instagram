import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { NavLinkContext } from '../helpers/NavLinkContext'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

function Post() {
  const { pid } = useParams()
  const [postObject, setPostObject] = useState({})
  const [listOfComments, setListOfComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const { authState } = useContext(NavLinkContext)
  const navigate = useNavigate()

  const renderComments = () => {
    const url = `http://localhost:3001/comments/${pid}`
    axios.get(url).then((res) => {
      console.log(url, res.data)
      setListOfComments(res.data.result)
    })
  }

  useEffect(() => {
    if (!authState.state && localStorage.getItem('user') === null) {
      navigate('/login')
      return
    }

    const url = `http://localhost:3001/posts/byId/${pid}`
    axios.get(url).then((res) => {
      console.log(url, res.data)
      setPostObject(...res.data)
    })

    renderComments()
  }, [])

  const addComment = async (e) => {
    // console.log(e.currentTarget.previousSibling.value)

    // const url1 = 'http://localhost:3001/auth/authToken'
    // const r1 = await fetch(url1, {
    //   headers: { user: localStorage.getItem('user') || '' },
    // })
    // const res1 = await r1.json()

    // if (res1.success) {
    //   const url = 'http://localhost:3001/comments'
    //   axios
    //     .post(url, {
    //       comment: newComment,
    //       post_id: pid,
    //       user_id: authState.uid,
    //     })
    //     .then((res) => {
    //       console.log(url, res.data)
    //       if (res.data.success) {
    //         renderComments() // meth1: 重新從資料庫抓 comments 資料 或 meth2: 新 comment 直接更新 listOfComments
    //         setNewComment('')
    //       } else {
    //         alert(res.data.error)
    //       }
    //     })
    // } else {
    //   if (res1.code === 100) {
    //     alert('請先登入')
    //   } else {
    //     alert('請重新登入')
    //   }
    // }

    const url = 'http://localhost:3001/comments'
    const fd = JSON.stringify({
      comment: newComment,
      post_id: pid,
      user_id: authState.uid,
    })
    console.log('fd', fd)
    fetch(url, {
      method: 'post',
      body: fd,
      headers: {
        user: localStorage.getItem('user') || '',
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((rd) => {
        console.log(url, rd)
        if (rd.success) {
          renderComments() // meth1: 重新從資料庫抓 comments 資料 或 meth2: 新 comment 直接更新 listOfComments
          setNewComment('')
        } else {
          if (rd.code === 100) {
            alert('請先登入')
          } else {
            alert('請重新登入')
          }
        }
      })
  }

  const deleteComment = (e) => {
    const cid = e.currentTarget.getAttribute('data-cid')

    const url = `http://localhost:3001/comments/${cid}`
    fetch(url, {
      method: 'delete',
      headers: {
        user: localStorage.getItem('user') || '',
      },
    })
      .then((r) => r.json())
      .then((rd) => {
        console.log(url, rd)
        if (rd.success) {
          renderComments() // meth1: 重新從資料庫抓 comments 資料 或 meth2: 新 comment 直接更新 listOfComments
          setNewComment('')
        } else {
          if (rd.code === 100) {
            alert('請先登入')
          } else {
            alert('請重新登入')
          }
        }
      })
  }

  const deletePost = () => {
    const url = `http://localhost:3001/posts/delete/${postObject.id}`
    fetch(url, {
      method: 'post',
      headers: {
        user: localStorage.getItem('user') || '',
      },
    })
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
        if (rData.error) {
          alert('please re-login')
        } else {
          navigate('/')
        }
      })
  }

  const handleNewComment = (e) => {
    setNewComment(e.currentTarget.value)
  }

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">
            <div className="username">{postObject.username}</div>
            {postObject.username === authState.username && (
              <Button
                color="error"
                className="btn-logout"
                variant="contained"
                onClick={deletePost}
              >
                delete
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="listOfComments">
          {listOfComments.map((comment) => {
            return (
              <div className="comment" key={comment.comment_id}>
                <div className="commentUsername">{comment.username}</div>
                <div className="commentBody">{comment.comment_body}</div>
                {comment.user_id === authState.uid && (
                  <Button
                    color="primary"
                    className="btn-delete"
                    variant="contained"
                    data-cid={comment.comment_id}
                    onClick={deleteComment}
                    // onClick={(e) => {
                    //   deleteComment(e, comment.comment_id)
                    // }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                )}
              </div>
            )
          })}
        </div>
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            value={newComment}
            onChange={handleNewComment}
          />
          <button disabled={newComment ? false : true} onClick={addComment}>
            Comment
          </button>
        </div>
      </div>
    </div>
  )
}

// [{"comment_id":1,"comment_body":"讚哦","post_id":1,"user_id":4,"username":"John"},{"comment_id":62,"comment_body":"ccc","post_id":1,"user_id":1,"username":"Kris"},{"comment_id":63,"comment_body":"sss","post_id":1,"user_id":1,"username":"Kris"}]

export default Post
