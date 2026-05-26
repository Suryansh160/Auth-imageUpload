const express = require('express')
const authMiddleware = require('../middleware/auth-middleware')
const adminMiddleware = require('../middleware/admin-middleware')

const router = express.Router()

// upload the image
router.post('/upload',authMiddleware,adminMiddleware)

// get all images

module.exports = router
