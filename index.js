const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')

const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})

connectDB()

const app = express()

const bookRouter = require('./routes/books')
const chapterRouter = require('./routes/chapters')
const errorHandler = require('./middleware/errorHandler')

app.use(express.json({}))

app.use(morgan('dev'))

app.use('/api/v1/books', bookRouter)
app.use('/api/v1/chapters', chapterRouter)

app.all("*", (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Resource Not Found"
    })
})

app.use(errorHandler)


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Listening to server on port: ${PORT}`.yellow)
})