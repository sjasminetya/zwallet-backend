const {query} = require('../helpers/query')

exports.topup = (data) => {
    return query('INSERT INTO topup SET ?', data)
}