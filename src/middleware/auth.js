const jwt = require('jsonwebtoken')
const {reject} = require('../helpers/helpers')

exports.verifyAccess = (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return reject(res, null, 401, {error: 'server need token'})
    }

    let token = authorization.split(' ')
    token = token[1]

    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return reject(res, null, 401, {error: 'invalid token'})
            } else if (err.name === 'TokenExpiredError') {
                return reject(res, null, 401, {error: 'token expired'})
            }
        }
        req.id = decoded.id
        next()
    })
}