const {reject, response} = require('../helpers/helpers')
const {getTransactionHistory, transfer, deleteTransactionHistory} = require('../models/transfer')
const {getSaldoById, updateSaldoUser, updateExpenseSender, getPinById} = require('../models/user')
const {v4: uuidv4} = require('uuid')

const getSaldo = async (id) => {
    const data = await getSaldoById(id)
    return data[0].saldo
}

const getPin = async (id) => {
    const data = await getPinById(id)
    return data[0].pin
}

const updateSaldo = async (saldo, id) => {
    await updateSaldoUser(saldo, id)
}

const updateExpense = async (expense, id) => {
    await updateExpenseSender(expense, id)
}

exports.transfer = async (req, res) => {
    let transactionStatus = ''
    const userId = req.id
    const amount = req.body.amount
    const notes = req.body.notes
    const senderPin = req.body.senderPin
    const receiverId = req.body.receiverId
    const senderId = req.body.senderId
    const currentSaldoReceiver = await getSaldo(receiverId)
    const currentSaldoSender = await getSaldo(senderId)
    const pin = await getPin(userId)
    const updateSaldoReceiver = currentSaldoReceiver + Number(amount)
    const updateSaldoSender = currentSaldoSender - Number(amount)
    const id = uuidv4()

    if (pin === null) {
        return reject(res, null, 400, {error: 'you must create pin'})
    } else if (pin != senderPin) {
        return reject(res, null, 400, {error: 'pin wrong'})
    }

    try {
        if (currentSaldoSender < amount) {
            transactionStatus = 'FAILED'
            return reject(res, null, 404, {error: transactionStatus + ' your balance is not enough! please top up'})
        }
        await updateSaldo(updateSaldoReceiver, receiverId)
        await updateSaldo(updateSaldoSender, senderId)
        await updateExpense(amount, senderId)
        transactionStatus = 'SUCCESS'
    } catch (error) {
        console.log(error)
    }

    const data = {
        id,
        receiverId,
        senderId,
        amount,
        senderPin,
        notes,
        transaction_status: transactionStatus,
        date_time: new Date()
    }

    const result = await transfer(data)
    try {
        if (result.length === 0) {
            return reject(res, null, 400, {error: 'cant transfer'})
        }
        return response(res, {message: 'success transfer'}, 200, null)
    } catch (error) {
        console.log(error)
    }
}

exports.getTransactionHistory = async (req, res) => {
    const id = req.params.id
    const result = await getTransactionHistory(id)
    try {
        if (result.length === 0) {
            return reject(res, null, 400, {error: 'cant get history transaction'})
        }
        return response(res, result, 200, null)
    } catch (error) {
        console.log(error)
    }
}

exports.deleteTransactionHistory = async (req, res) => {
    const id = req.params.id
    const result = await deleteTransactionHistory(id)
    try {
        if (result.length === 0) {
            return reject(res, null, 400, {error: 'cant delete transaction history'})
        }
        return response(res, {message: 'success delete history'}, 200, null)
    } catch (error) {
        console.log(error)
    }
}