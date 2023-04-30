import * as React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'

export default function PostMenu({
  postID,
  setOpenEdit,
  setEditedPostID,
  setOpenAlert,
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClickOpenEdit = (pid) => {
    setEditedPostID(pid)
    setOpenEdit(true)
  }

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <i className="fa-solid fa-bars" style={{ color: '#fff' }}></i>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={(e) => {
            handleClose() //close mune
            setEditedPostID(postID)
            setOpenEdit(true)
          }}
        >
          編輯貼文
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose() //close mune
            setEditedPostID(postID)
            setOpenAlert(true)
          }}
        >
          刪除貼文
        </MenuItem>
      </Menu>
    </div>
  )
}
