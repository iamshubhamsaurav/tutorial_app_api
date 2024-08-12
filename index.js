const express = require('express')
const colors = require('colors')
const morgan = require('morgan')


const app = express()
app.use(morgan('dev'))


app.all("*", (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Resource Not Found"
    })
})


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Listening to server on port: ${PORT}`.yellow)
})