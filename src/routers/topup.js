const express = require('express')
const router = express.Router()
const {topup} = require('../controllers/topup')
const {verifyAccess} = require('../middleware/auth')

router
    .post('/', verifyAccess, topup)

module.exports = router