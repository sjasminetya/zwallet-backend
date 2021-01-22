const {query} = require('../helpers/query')

exports.transfer = (data) => {
    return query('INSERT INTO transfer SET ?', data)
}

exports.getTransactionHistory = (id) => {
    return query('SELECT transfer.*, users.id, users.firstName, users.lastName FROM transfer INNER JOIN users ON transfer.receiverId = users.id WHERE senderId = ?', id)
}

exports.deleteTransactionHistory = (id) => {
    return query('DELETE FROM transfer WHERE id = ?', id)
}