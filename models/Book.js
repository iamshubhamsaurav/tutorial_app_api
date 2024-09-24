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
    // genre: {
        // type: String,
    //     required: [true, "Please provide a genre for the book"]
    // },
    status: {
        type: String,
        enum: ["draft", "review", "public"],
        default: "draft",
        required: [true, "Please provide a status"]
    },
    allowDownload: {
        type: Boolean,
        default: false
    },
    coverImage: {
        public_id: {
            type: String,
            required: [true, "Please provide a publuc id of cover image"]
        },
        secure_url: {
            type: String,
            required: [true, "Please Add secure_url"]
        }
    },
}, {
    timestamps: true
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book