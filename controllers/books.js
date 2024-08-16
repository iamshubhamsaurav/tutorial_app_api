const Blog = require('../models/Book')

exports.getBooks = async(req, res, next) => {
    try {
        const blogs = await Blog.find()
        res.status(200).json({
            success: true,
            count: blogs.length,
            blogs
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }   
}

exports.getBook = async(req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if(!blog) {
            return res.status(404).json({
                success: false,
                message: `Resource not found with the id: ${req.params.id}`
            })
        }

        res.status(200).json({
            success: true,
            blog
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }   
}


exports.createBook = async(req, res, next) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(200).json({
            success: true,
            blog
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
}

exports.updateBook = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            blog
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
}

exports.deleteBook = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: "Blog post was deleted",
            blog
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
}





