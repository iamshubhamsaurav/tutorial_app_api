const Book = require('../models/Book')
const Chapter = require('../models/Chapter')
const asyncHandler = require('../utils/asyncHandler')
const AppError = require('../utils/AppError')
const cloudinary = require('cloudinary').v2

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
        return next(new AppError(`Book not found with the id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        book
    })
})

exports.createBook = asyncHandler(async (req, res, next) => {
    // uploading the image
     if(req.files != null) {
        let file = req.files.coverImage
        if(file) {
            let res = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "tutorial_app/books"
            })
            req.body.coverImage = {
                public_id: res.public_id,
                secure_url: res.secure_url
            }
            
        }
    }

    const book = await Book.create(req.body);
    res.status(200).json({
        success: true,
        book
    })
})


exports.updateBook = asyncHandler(async (req, res, next) => {

    let book = await Book.findById(req.params.id)

    if(!book) {
        return next(new AppError(`Book not found with the id: ${req.params.id}`, 404))
    }

    // uploading the image
    if(req.files != null) {
        let file = req.files.coverImage
        if(file) {
            let res = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "tutorial_app/books"
            })
            req.body.coverImage = {
                public_id: res.public_id,
                secure_url: res.secure_url
            }
            
        }
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
        return next(new AppError(`Book not found with the id: ${req.params.id}`, 404))
    }

    await Chapter.deleteMany({bookId: book._id})
    
    book = await Book.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "Book was deleted",
        book
    })
})





