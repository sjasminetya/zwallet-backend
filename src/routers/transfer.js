const express = require('express')
const router = express.Router()
const {verifyAccess} = require('../middleware/auth')
const {transfer, getTransactionHistory, deleteTransactionHistory} = require('../controllers/transfer')

router
    .post('/', verifyAccess, transfer)
    .get('/transaction-history/:id', verifyAccess, getTransactionHistory)
    .delete('/:id', verifyAccess, deleteTransactionHistory)

module.exports = router