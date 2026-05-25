const express = require('express')
const { loginUser, registerUser } = require('../controllers/auth-controller')
const router = express.Router()

// all routes of auth are here
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router
