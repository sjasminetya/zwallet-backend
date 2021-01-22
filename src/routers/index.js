const express = require('express')
const router  = express.Router()
const routerUser = require('./user')
const routerTransfer = require('./transfer')
const routerTopup = require('./topup')

router
    .use('/users', routerUser)
    .use('/transfer', routerTransfer)
    .use('/topup', routerTopup)

module.exports = router