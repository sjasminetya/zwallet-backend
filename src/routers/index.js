const express = require('express')
const router  = express.Router()
const routerUser = require('./user')
const routerTransfer = require('./transfer')

router
    .use('/users', routerUser)
    .use('/transfer', routerTransfer)

module.exports = router