const express = require('express')

const router = express.Router({ mergeParams: true })

const {
    getChapters,
    createChapter,
    getChapter,
    updateChapter,
    deleteChapter
} = require('../controllers/chapters')

router.route('/')
        .get(getChapters)
        .post(createChapter)


router.route('/:id')
        .get(getChapter)
        .put(updateChapter)
        .delete(deleteChapter)

module.exports = router