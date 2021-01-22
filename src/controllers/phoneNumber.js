const {response, reject} = require('../helpers/helpers')
const {addPhoneNumber, getPhoneNumber, deletePhoneNumber} = require('../models/phoneNumber')
const {v4: uuidv4} = require('uuid')

exports.addPhoneNumber = async (req, res) => {
    const id = uuidv4()
    const userId = req.id
    const phoneNumber = req.body.phoneNumber
    const data = {
        id,
        userId,
        phoneNumber
    }
    const result = await addPhoneNumber(data)
    try {
        if (result.length === 0) {
            return reject(res, null, 400, {error: 'cant add phone number'})
        }
        return response(res, {message: 'success add phone number'}, 200, null)
    } catch (error) {
        console.log(error)
    }
}

exports.getPhoneNumber = async (req, res) => {
    const userId = req.params.userId
    const result = await getPhoneNumber(userId)
    try {
        if (result.length === 0) {
            return reject(res, null, 400, {error: 'cant get phone number'})
        }
        return response(res, result, 200, null)
    } catch (error) {
        console.log(error)
    }
}

exports.deletePhoneNumber = async (req, res) => {
    const id = req.params.id
    const result = await deletePhoneNumber(id)
    try {
        if (result.length === 0) {
            return reject(res, null, 400, {error: 'cant delete phone number'})
        }
        return response(res, {message: 'success delete phone number'}, 200, null)
    } catch (error) {
        console.log(error)
    }
}