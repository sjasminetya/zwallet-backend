const {query} = require('../helpers/query')

exports.transfer = (data) => {
    return query('INSERT INTO transfer SET ?', data)
}

exports.getTransactionHistory = (id, offset, limit) => {
    if (offset || limit) {
        return query(`SELECT transfer.*, users.id, users.firstName, users.lastName, users.image FROM transfer INNER JOIN users ON transfer.receiverId = users.id WHERE senderId = ? LIMIT ${limit} OFFSET ${offset}`, id)
    } else {
        return query('SELECT transfer.*, users.id, users.firstName, users.lastName, users.image FROM transfer INNER JOIN users ON transfer.receiverId = users.id WHERE senderId = ?', id)
    }
    
}

exports.deleteTransactionHistory = (id) => {
    return query('DELETE FROM transfer WHERE id = ?', id)
}

exports.countTransactionHistory = () => {
    return query('SELECT COUNT(*) AS totalData FROM transfer')
}