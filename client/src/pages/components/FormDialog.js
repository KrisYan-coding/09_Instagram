import * as React from 'react'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function FormDialog({ openEdit, setOpenEdit, editedPostID }) {
  const [editTitle, setEditTitle] = useState('')
  const [editedPostText, setEditedPostText] = useState('')

  const handleClose = () => {
    setOpenEdit(false)
  }

  const handleEdit = () => {
    const formEdit = document.formEdit
    const fd = new FormData(formEdit)
    fd.append('pid', editedPostID)
    // for (let i of fd.entries()) {
    //   console.log(i)
    // }

    const url = `http://localhost:3001/posts/edit`
    fetch(url, {
      method: 'post',
      headers: {
        user: localStorage.getItem('user') || '',
      },
      body: fd,
    })
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
        if (rData.success) {
          alert('上傳成功')
          // getProfilePostList()
          setOpenEdit(false)
        }
      })
  }

  useEffect(() => {
    let ignore = false
    setEditTitle('')
    setEditedPostText('')

    if (editedPostID) {
      const url = `http://localhost:3001/posts/byId/${editedPostID}`
      fetch(url)
        .then((r) => r.json())
        .then((rData) => {
          console.log(url, rData)
          if (!ignore) {
            setEditTitle(rData[0].title)
            setEditedPostText(rData[0].postText)
          }
        })
    }

    return () => {
      ignore = true // prevent race condition: ignore previous request, and get data from the last request, even when the last request finish before any previous request that's made
    }
  }, [editedPostID])

  return (
    <div>
      <Dialog open={openEdit} onClose={handleClose}>
        <form name="formEdit">
          <DialogTitle>編輯貼文</DialogTitle>
          <DialogContent>
            <TextField
              // autoFocus
              margin="dense"
              id="title"
              name="title"
              label="標題"
              type="text"
              fullWidth
              variant="standard"
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.currentTarget.value)
              }}
            />
            <TextField
              // autoFocus
              margin="dense"
              id="postText"
              name="postText"
              label="內文"
              type="text"
              fullWidth
              variant="standard"
              multiline
              // rows={3}
              minRows={3}
              // inputProps={{ style: { fontSize: '40px' } }}
              // InputLabelProps={{ style: { fontSize: '5px' } }}
              value={editedPostText}
              onChange={(e) => {
                setEditedPostText(e.currentTarget.value)
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button onClick={handleEdit}>完成</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
