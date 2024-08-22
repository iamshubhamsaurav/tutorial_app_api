const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for the book"]
    },
    description: {
        type: String,
        required: [true, "Please provide the description for the book"]
    },
    genre: {
        type: String,
        required: [true, "Please provide a genre for the book"]
    },
    status: {
        type: String,
        enum: ["draft", "review", "public"],
        default: "draft",
        required: [true, "Please provide a status"]
    },
    allowDownload: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book