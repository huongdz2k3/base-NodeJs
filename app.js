const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const configViewEngine = require('./src/configs/Viewengine')
// initialize router
const userRoute = require('./src/router/userRoute')
const petRoute = require('./src/router/petRoute')
app.use(helmet()) // security
app.use(morgan('dev'))

// Body parser , reading data from body into req.body
app.use(express.json())

// Upload img
// configViewEngine(app)
// Router hander
app.use('/api/user', userRoute)
app.use('/api/pet', petRoute)
module.exports = app