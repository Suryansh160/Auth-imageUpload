const express = require('express')
const authMiddleware = require('../middleware/auth-middleware')
const adminMiddleware = require('../middleware/admin-middleware')
const multerMiddleware = require('../middleware/upload-middleware')
const { uploadImageController } = require('../controllers/image-controller')

const router = express.Router()

// upload the image
router.post(
  '/upload',
  authMiddleware,
  adminMiddleware,
  multerMiddleware.single('image'),
  uploadImageController
)

// get all images

module.exports = router
