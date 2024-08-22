const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async() => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Database Connected: ${conn.connection.host}`.green.inverse)
}

module.exports = connectDB