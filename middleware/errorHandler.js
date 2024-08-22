const errorHandler = (error, req, res, next) => {
    res.status(500).json({
        success: false,
        message: error.message,
        error
    })
}


module.exports = errorHandler