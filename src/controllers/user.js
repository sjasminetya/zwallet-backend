const {reject, response} = require('../helpers/helpers')
const {register, update, checkEmail, getUserById, getFriends, getAllUser} = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {v4: uuidv4} = require('uuid')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

exports.login = async (req, res) => {
    const {email, password} = req.body

    const get = await checkEmail(email)
    try {
        const user = get[0]
        if (user !== undefined && user.length !== 0) {
            console.log(user.isActive)
            if (user.isActive === 0) return reject(res, null, 401, {error: 'Please confirm your email to login!'})

            bcrypt.compare(password, user.password, function (err, resCheck) {
                if (!resCheck) return reject(res, null, 401, {error: 'Login failed, wrong password'})
                delete user.password
                delete user.pin

                jwt.sign({id: user.id, email: user.email}, process.env.SECRET_KEY, {expiresIn: '24h'}, function (err, token) {
                    user.token = token
                    return response(res, user, 200, null)
                })
            })
        } else {
            return reject(res, null, 404, {error: 'Email and password cannot be empty'})
        }
    } catch (error) {
        console.log(error)
    }
}

exports.register = async (req, res) => {
    const {username, phoneNumber, email, password} = req.body
    const id = uuidv4()

    const resultCheck = await checkEmail(email)
    if (resultCheck.length > 0) return reject(res, null, 400, {error: 'Email already exists'})

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const data = {
                id,
                username,
                firstName: 'first name',
                lastName: 'last name',
                email,
                password: hash,
                pin: 000000,
                phoneNumber,
                saldo: 0,
                isActive: 0,
                expense: 0,
                income: 0,
                image: `${process.env.BASE_URL}/upload/avatar.jpg`,
                updatedAt: new Date(),
                createdAt: new Date()
            }

            await register(data)
            try {
                jwt.sign({ id: data.id }, process.env.SECRET_KEY, { expiresIn: '24h' }, function (err, emailToken) {
                    const url = `${process.env.BASE_URL}/v2/users/confirmation/${data.id}/${emailToken}`
                    delete data.password
                    delete data.pin
                    console.log(data.email)
          
                    transporter.sendMail({
                      to: data.email,
                      subject: 'Team zwallet, confirmation email',
                      html: `<!DOCTYPE html>
                      <html lang="en">
                      <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>Document</title>
                          <style>
                                .container {
                                    color: #000;
                                }
                                button {
                                    width: 200px;
                                    height: 70px;
                                    background-color: #6379F4;
                                    border-radius: 10px;
                                    border: none;
                                    color: #ffffff !important;
                                }
                                button a {
                                    text-decoration: none;
                                    color: #fff !important;
                                }
                                button:hover {
                                    outline: none;
                                }
                          </style>
                      </head>
                      <body>
                          <div class="container">
                              <div class="text-email">
                                <p>You recently register into Zwallet App. Please click this link to activation your account</p>
                                <button><a href="${url}">Activation your account</a></button>
                                <p>Thanks,<br>Zwallet Team</p>
                                <p>P.S. We also love hearing from you and helping you with any issues yo have. Please reply to this email if you want to ask a question or just say hi.</p>
                              </div>
                          </div>
                      </body>
                      </html>`
                    })

                return response(res, {message: 'Please check your email for activation account'}, 200, null)
                })
            } catch (error) {
                console.log(error)
            }
        })
    })
}

exports.confirmationEmail = async (req, res) => {
    try {
        jwt.verify(req.params.token, process.env.SECRET_KEY)
        const isActive = 0
        const data = {}
        if (isActive) {data.isActive = isActive}
        const id = req.params.id
        await update({isActive: 1}, id)
        return res.redirect(`${process.env.URL_LOGIN}`)
    } catch (error) {
        console.log(error)
    }
}

exports.update = async (req, res) => {
    const id = req.params.id
    const { username, firstName, lastName, email, password, pin, phoneNumber, saldo, expense } = req.body
    let image = null
    if (req.file) {
        image = `${process.env.BASE_URL}/upload/${req.file.filename}`
    }
    const data = {}

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            if (username) { data.username = username }
    
            if (firstName) { data.firstName = firstName }

            if (lastName) { data.lastName = lastName }
            
            if (email) { data.email = email }
            
            if (password) { data.password = hash }
            
            if (pin) { data.pin = pin }
            
            if (saldo) { data.saldo = saldo }

            if (expense) { data.expense = expense }
            
            if (phoneNumber) { data.phoneNumber = phoneNumber }
            
            if (image) { data.image = image }

            const result = await update(data, id)
            try {
                if (result.length === 0) {
                    return reject(res, null, 400, {error: 'cant update data'})
                }
                response(res, {message: 'data successfull update'}, 200, null)
            } catch (error) {
                console.log(error)
            }
        })
    })
}

exports.getUserById = async (req, res) => {
    const id = req.params.id
    const result = await getUserById(id)
    try {
        if (result.length === 0) {
            return reject(res, null, 400, {error: 'id not found'})
        }
        for(let key in result){
            if(result.hasOwnProperty(key)) {
              delete result[key].password
              delete result[key].pin
              delete result[key].isActive
              delete result[key].createdAt
              delete result[key].updatedAt
            }
        }
        return response(res, result, 200, null)
    } catch (error) {
        console.log(error)
    }
}

exports.getFriends = async (req, res) => {
    const id = req.params.id
    const result = await getFriends(id)
    try {
        if (result.length === 0) {
            return reject(res, null, 400, {error: 'id not found'})
        }
        for(let key in result){
            if(result.hasOwnProperty(key)) {
              delete result[key].password
              delete result[key].pin
              delete result[key].isActive
              delete result[key].createdAt
              delete result[key].updatedAt
            }
        }
        return response(res, result, 200, null)
    } catch (error) {
        console.log(error)
    }
}

exports.getAllUser = async (req, res) => {
    const name = req.query.name
    const phoneNumber = req.query.phoneNumber
    const result = await getAllUser(name, phoneNumber)
    try {
        if (result.length === 0) {
            return reject(res, null, 400, {error: 'cant get user'})
        }
        for(let key in result){
            if(result.hasOwnProperty(key)) {
              delete result[key].password
              delete result[key].pin
              delete result[key].isActive
              delete result[key].createdAt
              delete result[key].updatedAt
            }
        }
        return response(res, result, 200, null)
    } catch (error) {
        console.log(error)
    }
}

exports.sendEmailResetPassword = async (req, res) => {
    const email = req.body.email
    const result = await checkEmail(email)
    try {
        const data = result[0]
        if (!data) {
            return reject(res, null, 400, {error: 'email not found'})
        }
        jwt.sign({ id: data.id }, process.env.SECRET_KEY, { expiresIn: '24h' }, function (err, emailToken) {
            const url = `${process.env.BASE_URL}/v2/users/reset-password/${data.id}/${emailToken}`
            delete data.password
            delete data.pin
            console.log(data.email)
  
            transporter.sendMail({
              to: data.email,
              subject: 'Team zwallet, reset password',
              html: `<!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
                  <style>
                    .container {
                        color: #000;
                    }
                    button {
                        width: 200px;
                        height: 70px;
                        background-color: #6379F4;
                        border-radius: 10px;
                        border: none;
                        color: #ffffff !important;
                    }
                    button a {
                        text-decoration: none;
                        color: #fff !important;
                    }
                    button:hover {
                        outline: none;
                    }
                  </style>
              </head>
              <body>
                  <div class="container">
                      <div class="text-email">
                        <p>You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the button to complete the process:</p>
                        <button><a href="${url}">Reset password</a></button>
                        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
                        <p>Thanks,<br>Zwallet Team</p>
                        <p>P.S. We also love hearing from you and helping you with any issues yo have. Please reply to this email if you want to ask a question or just say hi.</p>
                      </div>
                  </div>
              </body>
              </html>`
            })

        return response(res, {message: `An email has been sent to ${data.email}`}, 200, null)
        })
    } catch (error) {
        console.log(error)
    }
}

exports.redirectResetPassword = async (req, res) => {
    try {
        jwt.verify(req.params.token, process.env.SECRET_KEY)
        return res.redirect(`${process.env.URL_RESET_PASSWORD}/${req.params.id}`)
    } catch (error) {
        console.log(error)
    }
}

exports.resetPassword = async (req, res) => {
    const password = req.body.password
    const id = req.params.id
    const data = {}

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            
            if (password) { data.password = hash }

            const result = await update(data, id)
            try {
                if (result.length === 0) {
                    return reject(res, null, 400, {error: 'cant update password'})
                }
                response(res, {message: 'password successfull update'}, 200, null)
            } catch (error) {
                console.log(error)
            }
        })
    })
}