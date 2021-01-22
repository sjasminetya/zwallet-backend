require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routerMain = require('./src/routers/index')

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/upload', express.static('./uploads'))
app.use('/v2', routerMain)

app.use((req, res, next) => {
    const err = new Error('URL Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(500)
    res.send({
        error: {
            status: 500,
            message: err.message
        }
    })
})

app.listen(port, () => console.log(`Server running in port ${process.env.PORT}`))