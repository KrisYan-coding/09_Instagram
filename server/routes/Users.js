const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const {sign} = require('jsonwebtoken')
const db = require('../modules/connect-mysql')
const validateToken = require('../middlewares/AuthMiddleware')

// ----[registration]
router.post('/', async (req, res) => {
  let output = {
    success: false,
    data: req.body,
    error: ''
  }
  
  const {username, password} = req.body

  // --[validate username duplicate]
  const sql1 = "SELECT * FROM `users` WHERE `username`=?"
  const [rows1] = await db.query(sql1, [username])
  if (rows1.length > 0){
    output.error = '帳號已存在'
    return res.json(output)
  }

  const passHash = await bcrypt.hash(password, 10) // password sjould be string

  const sql2 = "INSERT INTO `users`(`username`, `password_hash`) VALUES (?, ?)"
  const [result] = await db.query(sql2, [username, passHash])

  output.success = result.affectedRows
  output.error = '註冊成功'

  return res.json(output)
})

// ----[login]
router.post('/login', async (req, res) => {
  let output = {
    success: false,
    error: '',
    data: req.body,
    note: ''
  }

  const {username, password} = req.body

  // --[input validation]

  // --[check username existence]
  const sql1 = "SELECT * FROM `users` WHERE `username`=?"
  const [rows1] = await db.query(sql1, [username])
  if (rows1.length < 1){
    output.error = '帳號錯誤'
    return res.json(output)
  }

  const row = rows1[0]
  
  
  // --[check password]
  const passCheckResult = await bcrypt.compare(password, row.password_hash)
  if (!passCheckResult){
    output.error = '密碼錯誤'
    return res.json(output)
  } 

  output.success = true
  output.error = '登入成功'

  const accessToken = sign({username: username, uid: row.user_id}, 'someRandomString')
  output.token = accessToken
  output.user = {username: username, uid: row.user_id, image: row.image}
  
  return res.json(output)
})

router.get('/authToken', validateToken, async (req, res) => {

  if (!req.user){
    return res.json(req.output)

  } else {
    
    const sql = "SELECT * FROM `users` WHERE `user_id`=?"
    const [row] = await db.query(sql, [req.user.uid])

    return res.json({success: true, user: req.user, image: row[0].image})
  }
}) 


// ----[get user info.]
router.get('/basicInfo/:uid', async (req, res) => {
  const uid = req.params.uid

  const sql = "SELECT `user_id`,`username` FROM `users` WHERE `user_id`=?"
  const [rows] = await db.query(sql, uid)

  return res.json(rows)
})


module.exports = router