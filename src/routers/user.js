const express = require('express')
const router = express.Router()
const {register, login, confirmationEmail, update, getUserById, getFriends, getAllUser} = require('../controllers/user')
const {uploadFile} = require('../middleware/upload')
const {verifyAccess} = require('../middleware/auth')

router
    .post('/login', login)
    .post('/register', uploadFile.single('image'), register)
    .get('/confirmation/:id/:token', confirmationEmail)
    .patch('/:id', verifyAccess, uploadFile.single('image'), update)
    .get('/:id', verifyAccess, getUserById)
    .get('/:id/friends', verifyAccess, getFriends)
    .get('/', verifyAccess, getAllUser)

module.exports = router