const mongoose = require('mongoose')

const chapterSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        trim: true
    },
    body: {
        type: String,
        minLength: [true, "Please provide the body"]
    },
    coverImage: String,
    status: {
        type: String,
        enum: ["draft", "review", "public"],
        default: "draft",
        required: [true, "Please provide a status"]
    },
    bookId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: [true, "Please provide a bookId for the chapter"]
    }
},{
    timestamps: true
})

const Chapter = mongoose.model('Chapter', chapterSchema)

module.exports = Chapter