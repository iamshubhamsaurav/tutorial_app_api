const Chapter = require('../models/Chapter')
const Book = require('../models/Book')
const asyncHandler = require('../utils/asyncHandler')

exports.getChapters = asyncHandler(async (req, res, next) => {

    let chapters;

    if(req.params.bookId) {
        const book = await Book.findById(req.params.bookId)
        if(!book) {
            return next(new Error(`Book not found with the id of ${req.params.bookId}`))
        }
        chapters = await Chapter.find({bookId: book._id})
    } else {
        chapters = await Chapter.find()
    }

    res.status(200).json({
        success: true,
        count: chapters.length,
        chapters
    })
})

exports.createChapter = asyncHandler(async (req, res, next) => {

    const book = await Book.findById(req.params.bookId)
    if (!book) {
        return next(new Error("Book not found"))
    }
    req.body.bookId = book._id

    const chapter = await Chapter.create(req.body)

    res.status(201).json({
        success: true,
        chapter
    })
})


exports.getChapter = asyncHandler(async (req, res, next) => {
    const chapter = await Chapter.findById(req.params.id)

    if (!chapter) {
        return next(new Error(`Chapter not found with the id of ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        chapter
    })

})

exports.updateChapter = asyncHandler(async (req, res, next) => {
    let chapter = await Chapter.findById(req.params.id)

    if (!chapter) {
        return next(new Error(`Chapter not found with the id of ${req.params.id}`))
    }

    chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message: "Chapter Updated!",
        chapter
    })

})

exports.deleteChapter = asyncHandler(async (req, res, next) => {
    let chapter = await Chapter.findById(req.params.id)

    if (!chapter) {
        return next(new Error(`Chapter not found with the id of ${req.params.id}`))
    }

    chapter = await Chapter.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "Chapter Deleted",
        chapter
    })
})