const Blog = require('../models/Book')
const asyncHandler = require('../utils/asyncHandler')

exports.getBooks = asyncHandler(async (req, res, next) => {
    const blogs = await Blog.find()
    res.status(200).json({
        success: true,
        count: blogs.length,
        blogs
    })
})

exports.getBook = asyncHandler(async (req, res, next) => {

    const blog = await Blog.findById(req.params.id)

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: `Resource not found with the id: ${req.params.id}`
        })
    }

    res.status(200).json({
        success: true,
        blog
    })
})


exports.createBook = asyncHandler(async (req, res, next) => {
    const blog = await Blog.create(req.body);
    res.status(200).json({
        success: true,
        blog
    })
})

exports.updateBook = asyncHandler(async (req, res, next) => {

    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        blog
    })
})

exports.deleteBook = asyncHandler(async (req, res, next) => {
    const blog = await Blog.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "Blog post was deleted",
        blog
    })
})





