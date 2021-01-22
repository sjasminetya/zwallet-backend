const {getSaldoById, updateSaldoUser, getPinById} = require('../models/user')
const {topup} = require('../models/topup')
const { reject, response } = require('../helpers/helpers')
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

exports.topup = async (req, res) => {
    const userId = req.id
    const id = uuidv4()
    const {pin, balance} = req.body
    const currentSaldo = await getSaldo(userId)
    const userPin = await getPin(userId)
    const updateSaldoUser = currentSaldo + Number(balance)

    if (userPin === null) {
        return reject(res, null, 400, {error: 'you must create pin'})
    } else if (userPin != pin) {
        return reject(res, null, 400, {error: 'pin wrong'})
    }

    try {
        await updateSaldo(updateSaldoUser, userId)
    } catch (error) {
        console.log(error)
    }

    const data = {
        id,
        userId,
        pin,
        balance,
        date: new Date()
    }

    const result = await topup(data)
    try {
        if (result.length === 0) {
            return reject(res, null, 400, {error: 'cant top up'})
        }
        return response(res, {message: 'success top up'}, 200, null)
    } catch (error) {
        console.log(error)
    }
}