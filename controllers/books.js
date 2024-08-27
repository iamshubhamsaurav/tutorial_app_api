const Book = require('../models/Book')
const Chapter = require('../models/Chapter')
const asyncHandler = require('../utils/asyncHandler')
const AppError = require('../utils/AppError')

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


// exports.createBook = asyncHandler(async (req, res, next) => {
//     const book = await Book.create(req.body);
//     res.status(200).json({
//         success: true,
//         book
//     })
// })

exports.createBook = async(req, res, next) => {
    try {
        const book = await Book.create(req.body)
        res.status(200).json({success: true, book})
    } catch (error) {
        console.log("Book error");
        
        next(error)
    }
}

exports.updateBook = asyncHandler(async (req, res, next) => {

    let book = await Book.findById(req.params.id)

    if(!book) {
        return next(new AppError(`Book not found with the id: ${req.params.id}`, 404))
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





