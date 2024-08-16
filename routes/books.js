const express = require('express')

const router = express.Router()

const {
    getBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
} = require('../controllers/books')

router.route('/')
        .get(getBooks)
        .post(createBook)

router.route('/:id')
        .get(getBook)
        .put(updateBook)
        .delete(deleteBook)

module.exports = router