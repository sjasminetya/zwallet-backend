const {query} = require('../helpers/query')

exports.getPhoneNumber = (userId) => {
    return query('SELECT * FROM phonenumber WHERE userId = ?', userId)
}

exports.addPhoneNumber = (data) => {
    return query('INSERT INTO phonenumber SET ?', data)
}

exports.deletePhoneNumber = (id) => {
    return query('DELETE FROM phonenumber WHERE id = ?', id)
}