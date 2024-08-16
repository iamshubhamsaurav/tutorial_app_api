const mongoose = require('moongoose')

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
},{
    timestamps: true
})

const Chapter = mongoose.model()

module.exports = Chapter