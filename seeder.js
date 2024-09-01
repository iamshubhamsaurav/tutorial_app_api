const fs = require('fs')
const Book = require('./models/Book')

const mongoose = require('mongoose')
const colors = require('colors')

const dotenv = require('dotenv')

dotenv.config({path: "./config/config.env"})

const connectDB = async() => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Database Connected: ${conn.connection.host}`.green.inverse)
}

connectDB()

const booksData = fs.readFileSync("./_data/books.json", {encoding: "utf-8"})

const books = JSON.parse(booksData)

const importData = async () => {
    try {
        await Book.create(books)
        console.log("Book data imported")
    } catch (error) {
        console.log("Failed to import Books")
    }
}

const destroyData = async () => {
    try {
        await Book.deleteMany()
        console.log("Destroyed all data")
    } catch (error) {
        console.log("Failed to destroy data")
    }
}

const showData = async () => {
    try {
        const books = await Book.find()
        console.log(books)
    } catch (error) {
        console.log("Unable to fetch data")
    }
}


if(process.argv[2] === '-i') {
    importData()
    // process.exit(0)    
} else if (process.argv[2] === '-d') {
    destroyData()
    // process.exit(0)
} else if (process.argv[2] == '-s') {
    showData()
    // process.exit(0)
}


