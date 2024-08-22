const Book = require('../models/Book')
const Chapter = require('../models/Chapter')
const asyncHandler = require('../utils/asyncHandler')

exports.getBooks = asyncHandler(async (req, res, next) => {
    const books = await Book.find()
    res.status(200).json({
        success: true,
        count: books.length,
        books
    })
})

exports.getBook = asyncHandler(async (req, res, next) => {

    const book = await Book.findById(req.params.id)

    if (!book) {
        return res.status(404).json({
            success: false,
            message: `Book not found with the id: ${req.params.id}`
        })
    }

    res.status(200).json({
        success: true,
        book
    })
})


exports.createBook = asyncHandler(async (req, res, next) => {
    const book = await Book.create(req.body);
    res.status(200).json({
        success: true,
        book
    })
})

exports.updateBook = asyncHandler(async (req, res, next) => {

    let book = await Book.findById(req.params.id)

    if(!book) {
        return next(new Error(`Book not found with the id: ${req.params.id}`))
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        book
    })
})

exports.deleteBook = asyncHandler(async (req, res, next) => {
    
    let book = await Book.findById(req.params.id)

    if(!book) {
        return next(new Error(`Book not found with the id: ${req.params.id}`))
    }

    await Chapter.deleteMany({bookId: book._id})
    
    book = await Book.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "Book was deleted",
        book
    })
})





