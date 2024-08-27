const express = require('express')

const {
    getUsers,
    getUser
} = require('../controllers/users')

const router = express.Router()

router
    .route('/')
    .get(getUsers)

router.route('/:id')
    .get(getUser)

module.exports = router