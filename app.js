const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
// initialize router

app.use(helmet()) // security
app.use(morgan('dev'))

// Body parser , reading data from body into req.body
app.use(express.json())

// Router hander

module.exports = app