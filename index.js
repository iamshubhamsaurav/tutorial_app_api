const express = require('express')
const colors = require('colors')
const morgan = require('morgan')


const app = express()
app.use(morgan('dev'))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Listening to server on port: ${PORT}`.yellow)
})