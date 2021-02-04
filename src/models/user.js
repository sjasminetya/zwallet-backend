const {query} = require('../helpers/query')

exports.register = (data) => {
    return query('INSERT INTO users SET ?', data)
}

exports.update = (data, id) => {
    return query('UPDATE users SET ? WHERE id = ?', [data, id])
}

exports.checkEmail = (email) => {
    return query('SELECT * FROM users WHERE email = ?', email)
}

exports.getUserById = (id) => {
    return query('SELECT * FROM users WHERE id = ?', id)
}

exports.getFriends = (id) => {
    return query('SELECT * FROM users WHERE id != ? ORDER BY firstName', id)
}

exports.getAllUser = (name, phoneNumber) => {
    if (name) {
        return query('SELECT * FROM users WHERE firstName LIKE ?', `%${name}%`)
    } else if (phoneNumber){
        return query('SELECT * FROM users WHERE phoneNumber LIKE ?', `%${phoneNumber}%`)
    } else {
        return query('SELECT * FROM users')
    }
}

exports.getSaldoById = (id) => {
    return query('SELECT saldo FROM users WHERE id = ?', id)
}

exports.getPinById = (id) => {
    return query('SELECT pin FROM users WHERE id = ?', id)
}

exports.getExpenseById = (id) => {
    return query('SELECT expense FROM users WHERE id = ?', id)
}

exports.getIncomeById = (id) => {
    return query('SELECT income FROM users WHERE id = ?', id)
}

exports.updateSaldoUser = (saldo, id) => {
    return query('UPDATE users SET saldo = ? WHERE id = ?', [saldo, id])
}

exports.updateExpenseSender = (expense, id) => {
    return query('UPDATE users SET expense = ? WHERE id = ?', [expense, id])
}

exports.updateIncome = (expense, id) => {
    return query('UPDATE users SET income = ? WHERE id = ?', [expense, id])
}