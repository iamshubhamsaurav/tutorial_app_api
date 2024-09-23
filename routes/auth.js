const express = require('express')

const router = express.Router()

const authController = require('../controllers/auth')

router.post('/signup', authController.signup)
router.get('/login/:email/:password', authController.login)
router.get('/login/', authController.login)

module.exports = router