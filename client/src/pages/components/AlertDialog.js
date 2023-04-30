import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function AlertDialog({ openAlert, setOpenAlert, editedPostID }) {
  const handleClickOpen = () => {
    setOpenAlert(true)
  }

  const handleClose = () => {
    setOpenAlert(false)
  }

  const handleDelete = () => {
    const url = `http://localhost:3001/posts/delete/${editedPostID}`
    fetch(url, {
      method: 'delete',
      headers: {
        user: localStorage.getItem('user') || '',
      },
    })
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
        setOpenAlert(false)
      })
  }

  return (
    <div>
      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle id="alert-dialog-title">{'刪除貼文'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            確定要刪除此貼文?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>否</Button>
          <Button onClick={handleDelete} autoFocus>
            是
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
