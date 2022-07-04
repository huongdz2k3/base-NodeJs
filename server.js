const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app')
require('dotenv').config();
const DB = process.env.DATABASE

// connect Database

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})