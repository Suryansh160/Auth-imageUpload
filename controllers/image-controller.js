const Image = require('../models/image.js')
const { uploadToCloudinary } = require('../helpers/cloudinary-helper')
const fs = require('fs')

const uploadImageController = async (req, res) => {
  try {
    // check if file is missing in req object
    if (!req.file) {
      return res.status(400).json({
        success: true,
        message: 'File is required'
      })
    }

    // upload to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path)

    // now store the credentials(url ,public id, uploaded user's id) to DB

    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId
    })

    await newlyUploadedImage.save()

    // delete the file from local storage
    fs.unlinkSync(req.file.path)

    res.status(201).json({
      success: true,
      message: 'Image Uploaded successfully',
      image: newlyUploadedImage
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: 'Something went wrong'
    })
  }
}

const fetchImagesController = async (req, res) => {
  try {
    const images = await Image.find({})

    if (images) {
      res.status(200).json({
        success: true,
        data: images
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: 'Something went wrong'
    })
  }
}

module.exports = { uploadImageController,fetchImagesController }
