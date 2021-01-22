const express = require('express')
const router  = express.Router()
const routerUser = require('./user')
const routerTransfer = require('./transfer')
const routerTopup = require('./topup')
const routerPhoneNumber = require('./phoneNumber')

router
    .use('/users', routerUser)
    .use('/transfer', routerTransfer)
    .use('/topup', routerTopup)
    .use('/phone-number', routerPhoneNumber)

module.exports = router