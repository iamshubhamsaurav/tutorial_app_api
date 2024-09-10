const fs = require('fs')
const Book = require('./models/Book')
const Chapter = require('./models/Chapter')

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
const chaptersData = fs.readFileSync("./_data/chapters.json", {encoding: "utf-8"})

const books = JSON.parse(booksData)
const chapters = JSON.parse(chaptersData)

const importData = async () => {
    try {
        await Book.create(books)
        await Chapter.create(chapters)
        console.log("Data imported".green.underline.bold)
    } catch (error) {
        console.log("Failed to import Books".red.underline.bold)
    }
    process.exit(0)
}

const destroyData = async () => {
    try {
        await Book.deleteMany()
        await Chapter.deleteMany()
        console.log("Destroyed all data".red.underline.bold)
    } catch (error) {
        console.log("Failed to destroy data".green.underline.bold)
    }
    process.exit(0)
}

const showData = async () => {
    try {
        const books = await Book.find()
        console.log('Books Data'.yellow.bold)
        console.log(books)

        const chapters = await Chapter.find()
        console.log('Chapters Data'.yellow.bold)
        console.log(chapters)

    } catch (error) {
        console.log("Unable to fetch data".red.underline.bold)
    }
    process.exit(0)
}


if(process.argv[2] === '-i') {
    importData()   
} else if (process.argv[2] === '-d') {
    destroyData()
} else if (process.argv[2] == '-s') {
    showData()
}


