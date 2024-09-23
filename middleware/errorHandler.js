const errorHandler = (error, req, res, next) => {
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
        success: false,
        message: error.message,
        error
    })
}

module.exports = errorHandler