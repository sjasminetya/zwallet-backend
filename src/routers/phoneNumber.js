const express = require('express')
const router = express.Router()
const {addPhoneNumber, getPhoneNumber, deletePhoneNumber} = require('../controllers/phoneNumber')
const {verifyAccess} = require('../middleware/auth')

router
    .post('/', verifyAccess, addPhoneNumber)
    .get('/user/:userId', verifyAccess, getPhoneNumber)
    .delete('/:id', verifyAccess, deletePhoneNumber)

module.exports = router