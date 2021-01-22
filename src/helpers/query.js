const connection  = require('../config/db')

exports.query = (...arg) => {
    return new Promise((resolve, reject) => {
        connection.query(...arg, (error, results) => {
            if (!error) {
                resolve(results)
            } else {
                reject(error)
            }
        })
    })
}